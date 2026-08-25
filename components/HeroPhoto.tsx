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
    <div className='pointer-events-none absolute right-6 top-[calc(50%+24px)] hidden h-[420px] w-[340px] -translate-y-1/2 md:block lg:right-16'>
      <div
        className='relative h-full w-full overflow-hidden rounded-md border border-line
          opacity-0 blur-sm grayscale scale-95
          transition-all duration-700 ease-out
          group-hover/hero:opacity-90 group-hover/hero:blur-none
          group-hover/hero:grayscale-0 group-hover/hero:scale-100'
      >
        {/* Placeholder — remove this div once you add a real photo */}

        {
          <Image
            src='/photos/hero.jpg'
            alt='Ed Keric'
            fill
            className='object-cover'
            sizes='240px'
          />
        }
      </div>
    </div>
  );
}
