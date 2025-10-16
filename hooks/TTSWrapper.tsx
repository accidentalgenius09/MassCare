"use client";
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedText, setHighlightedText] = useState(text);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onboundary = (event) => {
      if (event.charIndex !== undefined) {
        const currentWordMatch = text.slice(event.charIndex).match(/\b\S+\b/);
        const currentWord = currentWordMatch ? currentWordMatch[0] : "";
        const highlighted = text.replace(
          new RegExp(`\\b(${currentWord})\\b`, "i"),
          `<mark style="background-color: yellow; color: black;">$1</mark>`
        );
        setHighlightedText(highlighted);
      }
    };

    utterance.onstart = () => setIsSpeaking(true);
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
      {!isSpeaking ? (
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
