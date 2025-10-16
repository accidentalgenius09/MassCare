'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type AccessibilityContextValue = {
  fontIncrementPx: number; // 0..10
  stepFontSize: () => void; // +2 until 10, then reset to 0
  resetFontSize: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontIncrementPx, setFontIncrementPx] = useState(0);
  const baseFontPxRef = useRef<number | null>(null);

  // Capture the base font-size on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const computed = window.getComputedStyle(document.documentElement).fontSize;
    const base = parseFloat(computed || '16');
    baseFontPxRef.current = isFinite(base) && base > 0 ? base : 16;
  }, []);

  // Apply the increment to the root html font size
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const base = baseFontPxRef.current ?? 16;
    const target = base + fontIncrementPx;
    // When increment is 0, clear inline style to respect user/browser defaults
    if (fontIncrementPx === 0) {
      document.documentElement.style.fontSize = '';
      return;
    }
    document.documentElement.style.fontSize = `${target}px`;
  }, [fontIncrementPx]);

  const stepFontSize = useCallback(() => {
    setFontIncrementPx((prev) => {
      const next = prev + 2;
      if (next > 8) return 0;
      return next;
    });
  }, []);

  const resetFontSize = useCallback(() => {
    setFontIncrementPx(0);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ fontIncrementPx, stepFontSize, resetFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};


