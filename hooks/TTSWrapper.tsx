"use client";
import { useTTS } from "@/components/providers/TTSProvider";
import React, { useRef, useState } from "react";

interface TTSWrapperProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

const TTSWrapper: React.FC<TTSWrapperProps> = ({
  text,
  className,
  children,
}) => {
  const { isEnabled } = useTTS();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedText, setHighlightedText] = useState(text);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!isEnabled) return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onboundary = (event) => {
      if (event.charIndex !== undefined) {
        // Find the next word boundaries after charIndex
        const start = event.charIndex;
        const remainingText = text.slice(start);
        const match = remainingText.match(/\b\S+\b/);
        if (!match) return;

        const word = match[0];
        const wordStart = start;
        const wordEnd = start + word.length;

        // Highlight only the current word
        const highlighted =
          text.slice(0, wordStart) +
          `<mark style="background-color: yellow; color: black;">` +
          text.slice(wordStart, wordEnd) +
          `</mark>` +
          text.slice(wordEnd);

        setHighlightedText(highlighted);
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

  return (
    <div onMouseEnter={speak} onMouseLeave={stop} className={className}>
      {!isSpeaking && !isEnabled ? (
        children
      ) : (
        <p
          className={className}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      )}
    </div>
  );
};

export default TTSWrapper;
