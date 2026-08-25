import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Waveform from '@/components/Waveform';

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

export default function ContactPage() {
  return (
    <main id='top'>
      <Navbar />

      <section className='mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-32 md:px-12'>
        <p className='mb-3 font-mono text-xs uppercase tracking-widest2 text-gold'>
          Get in touch
        </p>
        <h1 className='mb-10 max-w-xl text-3xl text-ink md:text-4xl'>
          Let&apos;s talk.
        </h1>

        <Waveform barCount={48} className='mb-12 h-8' />

        <div className='grid gap-4 sm:grid-cols-3'>
          {CONTACT_LINKS.map((link) => {
            const isExternal = link.href.startsWith('http');
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className='group rounded-md border border-line bg-surface p-6 transition-colors hover:border-gold/60'
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
      </section>

      <Footer />
    </main>
  );
}
