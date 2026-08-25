'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Two rings spin in opposite directions at different speeds — a
 * gears-within-gears effect. The "ED" label sits on a SEPARATE element
 * that isn't animated, so it stays upright and legible — like a record
 * spinning under a label that doesn't move with it.
 */
export default function NavLogo() {
  const outerRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !outerRingRef.current || !innerRingRef.current) {
      return;
    }

    const outerTween = gsap.to(outerRingRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    const innerTween = gsap.to(innerRingRef.current, {
      rotate: -360,
      duration: 7,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    return () => {
      outerTween.kill();
      innerTween.kill();
    };
  }, []);

  return (
    <a
      href='/#top'
      aria-label='Back to home'
      className='relative flex h-11 w-11 items-center justify-center'
    >
      <svg
        viewBox='0 0 36 36'
        className='absolute inset-0 h-full w-full'
        aria-hidden='true'
      >
        <g ref={outerRingRef}>
          <circle
            cx='18'
            cy='18'
            r='16.5'
            fill='none'
            stroke='#4E546E'
            strokeWidth='1.5'
          />
          {/* One gold notch so the rotation is actually visible, not just implied */}
          <circle cx='18' cy='1.5' r='1.5' fill='#C9A227' />
        </g>

        <circle
          cx='18'
          cy='18'
          r='12'
          fill='none'
          stroke='#4E546E'
          strokeWidth='1'
        />

        {/* Independent inner ring — spins the opposite way, faster */}
        <g ref={innerRingRef}>
          <circle
            cx='18'
            cy='18'
            r='9'
            fill='none'
            stroke='#4E546E'
            strokeWidth='1'
            strokeDasharray='2 3'
          />
          <circle cx='18' cy='9' r='1' fill='#C9A227' />
        </g>
      </svg>

      <span className='relative font-mono text-[11px] text-ink'>ED</span>
    </a>
  );
}
