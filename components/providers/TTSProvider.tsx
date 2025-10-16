'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

type TTSContextValue = ReturnType<typeof useTextToSpeech> & {
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  speakIfEnabled: (text: string, element: HTMLElement) => void;
};

const TTSContext = createContext<TTSContextValue | null>(null);

export function TTSProvider({ children }: { children: ReactNode }) {
  const tts = useTextToSpeech();
  const [isEnabled, setEnabled] = useState(false);

  const value: TTSContextValue = useMemo(() => ({
    ...tts,
    isEnabled,
    setEnabled,
    speakIfEnabled: (text: string, element: HTMLElement) => {
      if (!isEnabled) return;
      tts.speakText(text, element);
    },
  }), [tts, isEnabled]);

  return <TTSContext.Provider value={value}>{children}</TTSContext.Provider>;
}

export function useTTS() {
  const ctx = useContext(TTSContext);
  if (!ctx) throw new Error('useTTS must be used within TTSProvider');
  return ctx;
}


