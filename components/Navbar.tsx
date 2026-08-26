'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import NavLogo from './NavLogo';

const LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Experiments', href: '/#experiments' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const linksRowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  // gsap.quickTo gives a reusable, performant tween function instead of
  // creating a new tween on every mouse move — the standard GSAP pattern
  // for anything that follows the cursor or repeats rapidly.
  const xTo = useRef<gsap.QuickToFunc | null>(null);

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const row = linksRowRef.current;
    const dot = dotRef.current;
    if (!row || !dot) return;

    if (!xTo.current) {
      xTo.current = gsap.quickTo(dot, 'x', {
        duration: 0.45,
        ease: 'power3.out',
      });
    }

    const rowBox = row.getBoundingClientRect();
    const linkBox = e.currentTarget.getBoundingClientRect();
    const targetX =
      linkBox.left - rowBox.left + linkBox.width / 2 - dot.offsetWidth / 2;

    xTo.current(targetX);
    gsap.to(dot, { opacity: 1, duration: 0.25 });
  };

  const handleLeaveRow = () => {
    if (dotRef.current) {
      gsap.to(dotRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-12'>
        <NavLogo />

        <div
          ref={linksRowRef}
          onMouseLeave={handleLeaveRow}
          className='relative hidden items-center gap-8 font-mono text-sm text-ink-dim md:absolute md:left-1/2 md:flex md:-translate-x-1/2'
        >
          {/* The moving circle indicator — starts invisible, only shown
              once a link is hovered (see handleEnter/handleLeaveRow) */}
          <div
            ref={dotRef}
            aria-hidden='true'
            className='pointer-events-none absolute bottom-[-6px] left-0 h-1.5 w-1.5 rounded-full bg-gold opacity-0'
          />

          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={handleEnter}
              className='py-1 transition-colors hover:text-ink'
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile: skip the hover indicator entirely — there's no hover on
            touch, so just show plain links */}
        <div className='flex items-center gap-3 font-mono text-[11px] text-ink-dim min-[400px]:gap-4 min-[400px]:text-xs md:hidden'>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className='whitespace-nowrap hover:text-ink'
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
