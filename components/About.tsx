'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * PHOTO GOES HERE — same two steps as components/HeroPhoto.tsx:
 *
 * 1. Put an image file inside public/photos/ — e.g. public/photos/portrait.jpg
 * 2. Below, delete ONLY the inner placeholder <div> (the one with the
 *    "public/photos/portrait.jpg" text in it) and uncomment the <Image>
 *    block that sits right after it. Leave the OUTER <div> — the one with
 *    `about-fade relative aspect-[3/4] ...` — exactly where it is; that's
 *    what gives the photo its size and rounded border.
 */
export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-fade', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id='about'
      className='scroll-mt-20 grid gap-10 border-b border-line px-6 py-24 md:grid-cols-[280px_1fr] md:px-12'
    >
      {/* OUTER — keep this div, it just sizes and frames the photo */}
      <div className='about-fade relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-md border border-dashed border-line/70 bg-surface'>
        {/* INNER placeholder — delete this whole <div>...</div> block */}

        {
          <Image
            src='/photos/portrait.jpg'
            alt='Edoard Keric'
            fill
            className='object-cover'
            sizes='280px'
          />
        }
      </div>

      <div>
        <p className='about-fade mb-3 font-mono text-xs uppercase tracking-widest2 text-gold'>
          About
        </p>
        <h2 className='about-fade mb-6 max-w-xl text-3xl text-ink md:text-4xl'>
          Berlin-based, building on both sides of the stack.
        </h2>
        <p className='about-fade max-w-2xl text-base leading-relaxed text-ink-dim'>
          I've studied software development at App Akademie and previously at
          WBS Coding School, building different projects and digital experiences
          along the way — spanning both web and music. Before that — and
          alongside it — Musician, Producer and senior Merchandiser: probably
          why I care more than average about how something{' '}
          <span className='text-ink'>feels</span> to use, not just whether it
          works.
        </p>
      </div>
    </section>
  );
}
