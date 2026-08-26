'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'ed.keric@gmail.com',
    href: 'mailto:ed.keric@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/edkeric',
    href: 'https://github.com/edkeric',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/edkeric',
    href: 'https://www.linkedin.com/in/edkeric/',
  },
];

export default function ContactLinks() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    // Deferred to the next animation frame — see About.tsx for why.
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.from('.contact-link', {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            // 85% rather than the usual 80% — this content is often already in the
            // viewport on load (arriving via the navbar), so the check needs to catch
            // that case too, not just a genuine scroll-into-view further down the page.
            start: 'top 85%',
            once: true,
          },
        });
      }, rootRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className='grid gap-4 sm:grid-cols-3'>
      {CONTACT_LINKS.map((link) => {
        const isExternal = link.href.startsWith('http');
        return (
          <a
            key={link.label}
            href={link.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            className='contact-link group rounded-md border border-line bg-surface p-6 transition-colors hover:border-gold/60'
          >
            <p className='mb-2 font-mono text-xs uppercase tracking-widest2 text-gold'>
              {link.label}
            </p>
            <p className='text-ink-dim transition-colors group-hover:text-ink'>
              {link.value}
            </p>
          </a>
        );
      })}
    </div>
  );
}
