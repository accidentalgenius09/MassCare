"use client";
import { useTTS } from "@/components/providers/TTSProvider";
import React, { isValidElement, useRef, useState } from "react";

interface TTSWrapperProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

// Helper function to check if text contains HTML tags
const containsHTML = (text: string): boolean => {
  return /<[^>]+>/g.test(text);
};

// Helper function to strip HTML tags for TTS
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();
};

// Helper function to remove existing mark tags from HTML
const removeMarkTags = (html: string): string => {
  return html.replace(/<mark[^>]*>|<\/mark>/gi, '');
};

// Helper function to find and highlight word in HTML
const highlightWordInHTML = (originalHtml: string, plainText: string, wordStart: number, wordEnd: number): string => {
  const word = plainText.slice(wordStart, wordEnd);
  if (!word) return originalHtml;
  
  // Always work from original HTML (remove any existing marks first)
  const cleanHtml = removeMarkTags(originalHtml);
  
  // Track plain text position as we iterate through clean HTML
  let plainTextIndex = 0;
  let htmlStart = -1;
  let htmlEnd = -1;
  let inTag = false;
  
  for (let i = 0; i < cleanHtml.length; i++) {
    const char = cleanHtml[i];
    
    if (char === '<') {
      inTag = true;
    } else if (char === '>') {
      inTag = false;
    } else if (!inTag) {
      // We're in text content
      if (plainTextIndex === wordStart) {
        htmlStart = i;
      }
      if (plainTextIndex === wordEnd - 1) {
        htmlEnd = i + 1;
        break;
      }
      plainTextIndex++;
    }
  }
  
  // If we couldn't find exact positions, try regex fallback
  if (htmlStart === -1 || htmlEnd === -1) {
    // Escape special regex characters in the word
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wordRegex = new RegExp(`(\\b${escapedWord}\\b)`, 'i');
    const match = cleanHtml.match(wordRegex);
    
    if (match && match.index !== undefined) {
      htmlStart = match.index;
      htmlEnd = match.index + match[0].length;
    } else {
      // Last resort: return original HTML
      return cleanHtml;
    }
  }
  
  // Check if we're inside a tag at the found positions
  let checkInTag = false;
  for (let i = 0; i < htmlStart; i++) {
    if (cleanHtml[i] === '<') checkInTag = true;
    if (cleanHtml[i] === '>') checkInTag = false;
  }
  
  if (checkInTag) {
    // Find the end of the current tag
    const tagEnd = cleanHtml.indexOf('>', htmlStart);
    if (tagEnd !== -1) {
      htmlStart = tagEnd + 1;
    }
  }
  
  // Insert highlight mark
  const highlighted =
    cleanHtml.slice(0, htmlStart) +
    `<mark style="background-color: yellow; color: black;">` +
    cleanHtml.slice(htmlStart, htmlEnd) +
    `</mark>` +
    cleanHtml.slice(htmlEnd);
  
  return highlighted;
};

const TTSWrapper: React.FC<TTSWrapperProps> = ({
  text,
  className,
  children,
}) => {
  const { isEnabled } = useTTS();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedText, setHighlightedText] = useState(text);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const originalTextRef = useRef<string>(text);
  const hasHTML = containsHTML(text);
  const plainText = hasHTML ? stripHtmlTags(text) : text;
  
  // Update original text ref when text prop changes
  React.useEffect(() => {
    originalTextRef.current = text;
  }, [text]);

  const speak = () => {
    if (!isEnabled) return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Use plain text (without HTML) for speech synthesis
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "en-US";

    utterance.onboundary = (event) => {
      if (event.charIndex !== undefined) {
        const start = event.charIndex;
        const remainingText = plainText.slice(start);
        const match = remainingText.match(/\b\S+\b/);
        if (!match) return;

        const word = match[0];
        const wordStart = start;
        const wordEnd = start + word.length;

        if (hasHTML) {
          // For HTML content, highlight the word in the HTML structure
          // Always use original text for position mapping to avoid position drift
          const highlighted = highlightWordInHTML(originalTextRef.current, plainText, wordStart, wordEnd);
          setHighlightedText(highlighted);
        } else {
          // For plain text, highlight normally
          const highlighted =
            text.slice(0, wordStart) +
            `<mark style="background-color: yellow; color: black;">` +
            text.slice(wordStart, wordEnd) +
            `</mark>` +
            text.slice(wordEnd);
          setHighlightedText(highlighted);
        }
      }
    };

    if (isEnabled) {
      utterance.onstart = () => setIsSpeaking(true);
    }
    utterance.onend = () => {
      setIsSpeaking(false);
      setHighlightedText(text);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setHighlightedText(text);
  };

  // If child is a valid element (e.g., h1/h2/p/span), clone it and attach handlers.
  if (isValidElement(children)) {
    const child: any = children;
    const mergedClassName = [child.props?.className, className]
      .filter(Boolean)
      .join(" ");

    const mergedHandlers = {
      onMouseEnter: (e: any) => {
        child.props?.onMouseEnter?.(e);
        speak();
      },
      onMouseLeave: (e: any) => {
        child.props?.onMouseLeave?.(e);
        stop();
      },
    };

    if (isSpeaking && isEnabled) {
      // Render the same tag with highlighted HTML to avoid wrapper/divs inside <p> etc.
      return React.cloneElement(child, {
        ...child.props,
        ...mergedHandlers,
        className: mergedClassName,
        dangerouslySetInnerHTML: { __html: highlightedText },
        children: undefined,
      });
    }

    // If text contains HTML and child doesn't already have dangerouslySetInnerHTML, use it
    if (hasHTML && !child.props?.dangerouslySetInnerHTML) {
      return React.cloneElement(child, {
        ...child.props,
        ...mergedHandlers,
        className: mergedClassName,
        dangerouslySetInnerHTML: { __html: text },
        children: undefined,
      });
    }

    return React.cloneElement(child, {
      ...child.props,
      ...mergedHandlers,
      className: mergedClassName,
    });
  }

  // Fallback for text nodes: use an inline wrapper to remain valid inside <p>
  return (
    <span onMouseEnter={speak} onMouseLeave={stop} className={className}>
      {isSpeaking && isEnabled ? (
        <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
      ) : hasHTML ? (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        children
      )}
    </span>
  );
};

export default TTSWrapper;
