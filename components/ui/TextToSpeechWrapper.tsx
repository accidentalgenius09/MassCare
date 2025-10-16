'use client';

import { ReactNode, useRef } from 'react';
import { useTTS } from '@/components/providers/TTSProvider';

interface TextToSpeechWrapperProps {
  children: ReactNode;
  text: string;
  className?: string;
}

const TextToSpeechWrapper = ({ children, text, className = '' }: TextToSpeechWrapperProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { speakIfEnabled, stopSpeech } = useTTS();

  const handleMouseEnter = () => {
    if (elementRef.current && text.trim()) {
      speakIfEnabled(text, elementRef.current);
    }
  };

  const handleMouseLeave = () => {
    stopSpeech();
  };

  const renderHighlightedText = () => children;

  return (
    <div
      ref={elementRef}
      className={`cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderHighlightedText()}
    </div>
  );
};

export default TextToSpeechWrapper;
