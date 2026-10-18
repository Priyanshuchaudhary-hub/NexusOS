import { useState, useEffect } from 'react';

/**
 * Custom hook to smoothly interpolate numbers for dashboard metrics
 * Avoids layout shift and respects reduced motion.
 */
export const useAnimatedCounter = (targetValue, duration = 800) => {
  const [displayValue, setDisplayValue] = useState(targetValue);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof targetValue !== 'number' || isNaN(targetValue)) {
      setDisplayValue(targetValue);
      return;
    }

    let start = displayValue;
    const end = targetValue;
    if (start === end) return;

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration]);

  return displayValue;
};
