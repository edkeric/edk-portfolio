'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * A compact horizontal waveform — same gold color and animation style as
 * EqualizerBackground, but bars grow from the center (not the bottom) and
 * the whole strip is short, so it reads as a waveform accent rather than
 * a full-height atmospheric background.
 */
export default function Waveform({
  barCount = 40,
  className = '',
}: {
  barCount?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const bars = containerRef.current?.querySelectorAll('.wave-bar');
    if (!bars || bars.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(bars, { scaleY: 0.4 });
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    bars.forEach((bar) => {
      const tween = gsap.to(bar, {
        scaleY: () => gsap.utils.random(0.2, 1),
        duration: () => gsap.utils.random(0.5, 1.4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: () => gsap.utils.random(0, 1),
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className={`pointer-events-none flex items-center justify-center gap-[3px] ${className}`}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className='wave-bar w-1 rounded-full bg-gold'
          style={{ height: '100%', transformOrigin: 'center' }}
        />
      ))}
    </div>
  );
}
