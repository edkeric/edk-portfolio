'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const update = () => setVisible(window.scrollY > 150);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  const scrollToTop = () => {
    // On any page other than home, "back to top" means back to the
    // homepage — scrolling the current page to 0 would go nowhere useful
    // on a short page like Contact.
    if (!isHome) {
      router.push('/');
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      aria-label={isHome ? 'Back to top' : 'Back to home'}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-dim shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:text-gold md:right-12 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span aria-hidden='true' className='font-mono text-base'>
        ↑
      </span>
    </button>
  );
}
