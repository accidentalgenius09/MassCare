"use client";

import { useEffect, useState } from "react";
import { SeasonalBackground } from "nextjs-seasonal-plugin";

export default function DeferredSeasonalBackground({ zIndex }: { zIndex?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer loading until after initial paint to avoid blocking render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return <SeasonalBackground zIndex={zIndex} />;
}
