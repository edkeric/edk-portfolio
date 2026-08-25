# Edoard Keric — Portfolio

Dark, animated landing page built with Next.js (App Router), Tailwind CSS,
and GSAP + ScrollTrigger for the motion.

## Design decisions (read this first)

- **Colors**: near-black navy background (`#0B0E14`) with a muted gold
  accent (`#C9A227`) — matches the dark navy/gold identity already on your
  invoices, so your brand stays consistent across everything you send out.
  Defined in `tailwind.config.ts`.
- **Type**: Fraunces (serif) for headlines, Inter for body text, JetBrains
  Mono for labels/tags/nav — the mono face is a small nod to being a
  developer, used sparingly so it reads as a detail, not a gimmick.
- **Signature element**: the animated equalizer bars behind the hero
  headline (`components/EqualizerBackground.tsx`). It's the one place the
  page "shows off" — everything else is deliberately calm so that one
  moment lands. It ties directly to you being a musician, not a generic
  particle effect.
- **Hero photo**: a portrait sits faint, blurred, and grayscale on the
  right side of the hero (`components/HeroPhoto.tsx`), and sharpens into
  full color when you hover anywhere over the hero section — a quieter
  reveal than just showing the photo outright. Pure CSS transitions (no
  GSAP needed for this one), triggered by Tailwind's `group-hover`.
- **Navbar**: a spinning vinyl-style logo mark on the left
  (`components/NavLogo.tsx` — the ring rotates forever, the "EK" label
  stays still and readable) and a small gold circle that slides between
  nav links on hover (`components/Navbar.tsx`), instead of a plain
  underline. The circle uses `gsap.quickTo`, GSAP's pattern for anything
  that needs to re-tween repeatedly and smoothly — worth understanding if
  you build more hover effects like this later.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Changes hot-reload.

To build for production (e.g. before deploying to Vercel):

```bash
npm run build
npm run start
```

**Note on fonts:** `next/font/google` fetches the fonts at build time from
Google's servers, so `npm run build` / `npm run dev` need normal internet
access. This is fine on your own machine — I couldn't fully verify the font
fetch in my sandboxed environment (no outbound access to fonts.googleapis.com),
but I stubbed the fonts out temporarily and confirmed the rest of the app
compiles and type-checks cleanly, so nothing else should surprise you.

## Deploying

Push this to a GitHub repo, then import it at https://vercel.com/new — it
detects Next.js automatically and needs zero config. Every push to `main`
redeploys.

## How to customize

### Change the font
Edit `app/layout.tsx`. Each face is loaded like this:

```ts
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", ... });
```

Swap `Fraunces` for any font from https://fonts.google.com/ — import it by
name from `next/font/google` and keep the same `variable`. Tailwind picks it
up automatically via `tailwind.config.ts` (`fontFamily.display` etc.), no
other file needs to change.

### Add photos
There are two separate steps here — moving the file, then editing the code.
It's easy to do one and forget the other.

**Step 1 — move the actual file onto disk.** The `public/` folder in this
project is just a normal folder on your computer once you unzip it. Anything
inside `public/` gets served at the site's root URL automatically — you
don't register it anywhere.

- **Finder (Mac) / Explorer (Windows):** open the `edoard-portfolio` folder
  you unzipped, go into `public/photos/`, and drag your image file in there.
- **Terminal, from inside the project folder:**
  ```bash
  cp ~/Downloads/your-photo.jpg public/photos/hero.jpg
  ```
  (adjust the first path to wherever the photo actually is)

At this point the file exists in the project but nothing points to it yet —
that's step 2.

**Step 2 — reference it in the code.**

- For the hero photo (top-right, hover to reveal): open
  `components/HeroPhoto.tsx`. Delete the placeholder `<div>...</div>` block,
  and uncomment the `<Image>` block right below it — it already points at
  `/photos/hero.jpg`, so if you named your file exactly that, it works with
  no further changes. If you named it something else, update the `src`.
- For the about-section photo: open `components/About.tsx`. There are two
  nested `<div>`s there — an **outer** one that just sizes and frames the
  photo (keep it), and an **inner** one containing the placeholder text
  (delete that whole inner block). Then uncomment the `<Image>` right after
  it, same as the hero photo. Both files have comments marking exactly
  which div is which.

A couple of things that trip people up the first time:
- The `src` path always starts with `/` and never includes `public` —
  `public/photos/hero.jpg` on disk becomes `/photos/hero.jpg` in code.
- `Image` with `fill` needs its parent to be `relative` with a defined size
  — both placeholders already are, so as long as you're replacing the `div`
  in place (not moving the `Image` somewhere else), this is already handled.
- Save the file and check the browser — `npm run dev` hot-reloads
  automatically, no restart needed.

### Add or edit projects
Open `components/ProjectsGrid.tsx` and edit the `PROJECTS` array. Each
object is one card:

```ts
{
  slug: "your-project",
  name: "Project Name",
  description: "One or two sentences on what it does.",
  tags: ["TypeScript", "Next.js"],
  link: "https://github.com/you/your-project",
}
```

Set `link` to a GitHub repo or a live deployed URL — link to something
real, since that's what actually gets clicked. Add as many objects as you
want; the grid reflows automatically (2 columns on tablet, 3 on desktop).

### Change the copy
- Hero headline and intro paragraph: `components/Hero.tsx`
- About section bio: `components/About.tsx`
- Contact links (email/GitHub/Instagram): `components/Hero.tsx`,
  `components/Navbar.tsx`, and `components/Footer.tsx` — search for
  `your-username` / `example.com` and replace with your real links.

## Project structure

```
app/
  layout.tsx      — fonts, page metadata, wraps everything
  page.tsx         — assembles the sections in order
  globals.css      — Tailwind + base styles, reduced-motion handling
components/
  Hero.tsx                 — headline + intro + the load-in animation
  HeroPhoto.tsx            — the hover-reveal portrait on the right
  EqualizerBackground.tsx  — the animated signature bars behind the hero
  Navbar.tsx               — sticky nav + the circular hover indicator
  NavLogo.tsx              — the spinning vinyl-style logo mark
  ProjectsGrid.tsx         — the PROJECTS array + scroll-reveal grid
  ProjectCard.tsx          — single card layout
  About.tsx                — bio + photo slot
  Footer.tsx               — contact links
lib/
  gsap.ts          — registers GSAP's ScrollTrigger plugin once, shared
                     import so you don't repeat this in every component
```

Everything animated respects `prefers-reduced-motion` — worth knowing when
you're explaining the project to someone, since it's an easy thing to
mention that shows you're thinking about accessibility, not just visuals.
