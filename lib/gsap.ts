"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once, and only in the browser — Next.js renders
// this file on the server too, and GSAP's DOM plugins throw there.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger measures trigger positions against the DOM as it exists the
  // moment each section mounts — before the display font (next/font, swapped
  // in async) or the hero/about images finish loading. Either can reflow the
  // page afterward, leaving every trigger below that point stale: a scroll-in
  // animation that fires too early, too late, or not at all depending on how
  // far off the recorded position ends up. Refreshing once both have settled
  // recalculates everything against the final layout.
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
