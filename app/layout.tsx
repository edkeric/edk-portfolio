import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import BackToTop from '@/components/BackToTop';
import './globals.css';

/**
 * FONTS — this is the one place to change them.
 *
 * - `display` is used for headlines (h1/h2/h3, set in globals.css).
 * - `body` is the default running text.
 * - `mono` is used for labels, tags, and nav links (the "developer" accent).
 *
 * To swap a typeface: change the import above and the function call below.
 * Any font from https://fonts.google.com/ works the same way, e.g.:
 *   import { Playfair_Display } from "next/font/google";
 *   const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
 */
const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ed Keric — Web Developer',
  description:
    'Web developer and musician based in Berlin. Projects, code, and contact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
