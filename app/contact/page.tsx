import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Waveform from '@/components/Waveform';
import ContactLinks from '@/components/ContactLinks';

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

        <ContactLinks />
      </section>

      <Footer />
    </main>
  );
}
