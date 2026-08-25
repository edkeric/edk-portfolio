"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The site's one "signature" element (see design notes in README).
 * A row of bars like an audio equalizer, animating at slightly different
 * speeds so it never looks perfectly mechanical. Sits behind the hero
 * headline at low opacity — atmosphere, not decoration.
 *
 * Customize:
 * - BAR_COUNT: more bars = denser, busier background
 * - Change the `stroke`/fill color below to restyle away from gold
 */
const BAR_COUNT = 28;

export default function EqualizerBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bars = containerRef.current?.querySelectorAll(".eq-bar");
    if (!bars || bars.length === 0) return;

    if (prefersReducedMotion) {
      // Static, gentle arrangement instead of animating — respects the
      // user's OS-level preference rather than ignoring it.
      gsap.set(bars, { scaleY: 0.4 });
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    bars.forEach((bar) => {
      const tween = gsap.to(bar, {
        scaleY: () => gsap.utils.random(0.15, 1),
        duration: () => gsap.utils.random(0.6, 1.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
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
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-end justify-center gap-[3px] overflow-hidden opacity-[0.16]"
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className="eq-bar w-2 rounded-t-sm bg-gold"
          style={{
            height: "70%",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}
