import Waveform from './Waveform';
import ContactLinks from './ContactLinks';

export default function ContactSection() {
  return (
    <section
      id='contact'
      className='scroll-mt-20 border-b border-line px-6 py-24 md:px-12'
    >
      <p className='mb-3 font-mono text-xs uppercase tracking-widest2 text-gold'>
        Get in touch
      </p>
      <h2 className='mb-10 max-w-xl text-3xl text-ink md:text-4xl'>
        Let&apos;s talk.
      </h2>

      <Waveform barCount={48} className='mb-12 h-8' />

      <ContactLinks />
    </section>
  );
}
