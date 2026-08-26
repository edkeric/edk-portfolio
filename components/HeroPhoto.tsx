import Image from 'next/image';

/**
 * PHOTO GOES HERE.
 *
 * 1. Put an image file inside public/photos/ — e.g. public/photos/hero.jpg
 * 2. Delete the placeholder <div> below.
 * 3. Uncomment the <Image> block and point `src` at your file
 *    (always starts with "/", never "public/" — Next.js serves everything
 *    inside `public/` from the site root).
 *
 * The opacity/blur/grayscale classes are what make it "slightly appear on
 * hover" — they only take effect once a real image is in the <Image> tag,
 * so leave them as-is when you swap it in.
 */
export default function HeroPhoto() {
  return (
    <div className='relative z-10 order-2 mx-auto mt-16 h-[220px] w-full max-w-[260px] pointer-events-none md:absolute md:right-2 md:top-[calc(50%+56px)] md:order-none md:mx-0 md:mt-0 md:h-[420px] md:w-[340px] md:max-w-none md:-translate-y-1/2 lg:right-28'>
      <div
        className='relative h-full w-full overflow-hidden rounded-md border border-line
          transition-all duration-700 ease-out
          md:opacity-0 md:blur-sm md:grayscale md:scale-95
          md:group-hover/hero:opacity-90 md:group-hover/hero:blur-none
          md:group-hover/hero:grayscale-0 md:group-hover/hero:scale-100'
      >
        {/* Placeholder — remove this div once you add a real photo */}

        {
          <Image
            src='/photos/hero.jpg'
            alt='Ed Keric'
            fill
            className='object-cover'
            sizes='(min-width: 768px) 340px, 320px'
          />
        }
      </div>
    </div>
  );
}
