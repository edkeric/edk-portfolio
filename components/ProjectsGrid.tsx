'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ProjectCard, { Project } from './ProjectCard';

/**
 * ADD YOUR PROJECTS HERE.
 * Each entry becomes one card. Set `link` to a GitHub repo or live demo URL.
 * Leave `placeholder: true` on the last card as a reminder slot, or delete
 * it once you've got a fourth project ready.
 */
const PROJECTS: Project[] = [
  {
    slug: 'mod-lab',
    name: 'ModuLab',
    description:
      'A proof of concept built on the Web Audio API in TypeScript, with no runtime dependencies. It plays: three synthesis engines, four effects, a sample-accurate sequencer, a music-theory layer, and a versioned save format.',
    tags: ['TypeScript', 'Web Audio API', 'Vite'],
    demo: 'https://mod-lab.vercel.app/',
    repo: 'https://github.com/edkeric/mod-lab',
    preview: '/projects/mod-lab.png',
  },
  {
    slug: 'mcp-quote-server',
    name: 'MCP Quote Server',
    description:
      'A Model Context Protocol server for collecting and serving quotes, with six tools, JSON persistence, and full error handling — built to plug straight into MCP-compatible clients.',
    tags: ['TypeScript', 'MCP', 'Node.js'],
    repo: 'https://github.com/edkeric/mcp-quote-server',
  },
  {
    slug: 'waveform',
    name: 'Waveform',
    description:
      'An audio-reactive canvas visualizer — drop in any audio file and it drives a live frequency-bar display straight off the Web Audio API\'s AnalyserNode, rendered at native pixel density.',
    tags: ['TypeScript', 'Next.js', 'Web Audio API', 'Canvas'],
    demo: 'https://audio-visualizer-eight-vert.vercel.app/',
    repo: 'https://github.com/edkeric/audio-visualizer',
    preview: '/projects/waveform.png',
  },
  {
    slug: 'stem-splitter',
    name: 'Stem Splitter',
    description:
      'Splits a song into drums, bass, vocals and other — entirely in the browser, no upload, no backend. Runs Meta\'s open-source Demucs model via ONNX Runtime and WebAssembly, straight on your device.',
    tags: ['TypeScript', 'Next.js', 'ONNX Runtime', 'WebAssembly'],
    demo: 'https://stem-splitter-two.vercel.app/',
    repo: 'https://github.com/edkeric/stem-splitter',
    preview: '/projects/stem-splitter.png',
  },
  {
    slug: 'healizer',
    name: 'Healizer',
    description:
      'Ambient sounds for meditation and yoga — rain, birdsong and forest ambience, plus a synthesized 432Hz drone. Mix and layer freely, each with its own volume, entirely in the browser.',
    tags: ['TypeScript', 'Next.js', 'Web Audio API'],
    demo: 'https://healizer.vercel.app/',
    repo: 'https://github.com/edkeric/healizer',
    preview: '/projects/healizer.png',
  },
  {
    slug: 'modulab-jam',
    name: 'ModuLab Jam',
    description:
      'A fork of ModuLab adding a real-time jam room — patterns, transport and tempo sync live across everyone in the same room over a PartyKit relay. Live demo coming once room deployment is back up.',
    tags: ['TypeScript', 'PartyKit', 'WebSockets', 'Web Audio API'],
    repo: 'https://github.com/edkeric/modulab-jam',
    preview: '/projects/modulab-jam.png',
  },
];

export default function ProjectsGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    // Deferred to the next animation frame — see About.tsx for why.
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.from('.project-card', {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }, rootRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id='experiments'
      ref={rootRef}
      className='scroll-mt-20 border-b border-line px-6 py-24 md:px-12'
    >
      <div className='mb-12 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='mb-3 font-mono text-xs uppercase tracking-widest2 text-gold'>
            Just Some
          </p>
          <h2 className='text-3xl text-ink md:text-4xl'>Experiments</h2>
        </div>

        <div className='flex items-center gap-2 pb-1 font-mono text-xs uppercase tracking-widest2 text-ink-dim'>
          <span>See more</span>
          <span aria-hidden='true' className='inline-block animate-nudge-x text-gold'>
            →
          </span>
        </div>
      </div>

      <div className='no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 [scroll-padding-inline:1.5rem] md:-mx-12 md:px-12 md:[scroll-padding-inline:3rem]'>
        {PROJECTS.map((project) => (
          <div key={project.slug} className='w-[280px] shrink-0 snap-start sm:w-80'>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
