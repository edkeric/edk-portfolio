export default function Footer({ showLinks = true }: { showLinks?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className='flex flex-col items-start justify-between gap-6 px-6 py-16 font-mono text-sm text-ink-dim md:flex-row md:items-center md:px-12'>
      <p>© {year} Ed Keric</p>

      {showLinks && (
        <div className='flex flex-wrap gap-6'>
          <a
            href='mailto:ed.keric@gmail.com'
            className='transition-colors hover:text-gold'
          >
            Email
          </a>
          <a
            href='https://github.com/edkeric'
            target='_blank'
            rel='noreferrer'
            className='transition-colors hover:text-gold'
          >
            GitHub
          </a>
          <a
            href='https://instagram.com/your-handle'
            target='_blank'
            rel='noreferrer'
            className='transition-colors hover:text-gold'
          >
            Instagram
          </a>
        </div>
      )}
    </footer>
  );
}
