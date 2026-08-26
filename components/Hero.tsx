'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import EqualizerBackground from './EqualizerBackground';
import HeroPhoto from './HeroPhoto';

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    // Deferred to the next animation frame — see About.tsx for why.
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.6 })
          .from(
            '.hero-line',
            { opacity: 0, y: 28, duration: 0.8, stagger: 0.12 },
            '-=0.3',
          )
          .from('.hero-sub', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
          .from(
            '.hero-links a',
            { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 },
            '-=0.3',
          );
      }, rootRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className='group/hero relative flex min-h-[92vh] flex-col justify-center overflow-hidden border-b border-line px-6 pt-20 md:px-12'
    >
      <EqualizerBackground />
      <HeroPhoto />

      <div className='relative z-10 order-1 max-w-3xl md:order-none'>
        <p className='hero-eyebrow mb-5 font-mono text-xs uppercase tracking-widest2 text-gold'>
          Ed Keric — Web / AI / Music
        </p>

        <h1 className='text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl'>
          <span className='hero-line block'>Code that behaves</span>
          <span className='hero-line block'>like it was composed,</span>
          <span className='hero-line block text-gold'>not just written.</span>
        </h1>

        <p className='hero-sub mt-6 max-w-xl text-base text-ink-dim md:text-lg'>
          Turning ideas into modern web applications, experiments and AI-powered
          digital products.
        </p>

        <div className='hero-links mt-9 flex flex-wrap gap-6 font-mono text-sm'>
          <a
            href='#experiments'
            className='border-b border-gold pb-1 text-gold transition-colors hover:text-ink'
          >
            View experiments
          </a>
          <a
            href='mailto:ed.keric@gmail.com'
            className='border-b border-transparent pb-1 text-ink-dim transition-colors hover:border-ink-dim hover:text-ink'
          >
            Email
          </a>
          <a
            href='https://github.com/edkeric'
            target='_blank'
            rel='noreferrer'
            className='border-b border-transparent pb-1 text-ink-dim transition-colors hover:border-ink-dim hover:text-ink'
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
