'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TextToSpeechOptions, HighlightedText, TTSState } from '@/types';

export const useTextToSpeech = () => {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    currentWord: '',
    currentSentence: '',
  });

  const [highlightedTexts, setHighlightedTexts] = useState<HighlightedText[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentElementRef = useRef<HTMLElement | null>(null);

  const splitIntoSentences = (text: string): string[] => {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  };

  const splitIntoWords = (sentence: string): string[] => {
    return sentence.trim().split(/\s+/).filter(word => word.length > 0);
  };

  const createHighlightedTexts = (words: string[], currentWordIndex: number): HighlightedText[] => {
    return words.map((word, index) => ({
      text: word,
      isHighlighted: index === currentWordIndex,
      isLastWord: index === words.length - 1,
    }));
  };

  const speakText = useCallback((text: string, element: HTMLElement, options: TextToSpeechOptions = {}) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const sentences = splitIntoSentences(text);
    currentElementRef.current = element;

    let currentSentenceIndex = 0;

    const speakSentence = () => {
      if (currentSentenceIndex >= sentences.length) {
        setState(prev => ({ ...prev, isPlaying: false, currentWord: '', currentSentence: '' }));
        setHighlightedTexts([]);
        return;
      }

      const sentence = sentences[currentSentenceIndex];
      const words = splitIntoWords(sentence);

      setState(prev => ({ 
        ...prev, 
        currentSentence: sentence,
        currentWord: words[0] || '',
        isPlaying: true 
      }));

      // We are not highlighting words anymore
      setHighlightedTexts([]);

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.voice = options.voice || null;

      speechRef.current = utterance;

      // No per-word boundary handling; rely on native speech only

      utterance.onend = () => {
        currentSentenceIndex++;
        setTimeout(speakSentence, 300); // Small pause between sentences
      };

      utterance.onerror = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentWord: '', currentSentence: '' }));
        setHighlightedTexts([]);
      };

      speechSynthesis.speak(utterance);
    };

    speakSentence();
  }, []);

  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, currentWord: '', currentSentence: '' }));
    setHighlightedTexts([]);
    currentElementRef.current = null;
  }, []);

  const pauseSpeech = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setState(prev => ({ ...prev, isPaused: true }));
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setState(prev => ({ ...prev, isPaused: false }));
    }
  }, []);

  const toggleSpeech = useCallback(() => {
    if (state.isPlaying) {
      if (state.isPaused) {
        resumeSpeech();
      } else {
        pauseSpeech();
      }
    }
  }, [state.isPlaying, state.isPaused, pauseSpeech, resumeSpeech]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return {
    state,
    highlightedTexts,
    speakText,
    stopSpeech,
    pauseSpeech,
    resumeSpeech,
    toggleSpeech,
    // Expose active element so consumers can know which wrapper is being read
    activeElement: currentElementRef.current,
  };
};
