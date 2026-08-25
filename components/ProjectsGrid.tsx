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
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='experiments'
      ref={rootRef}
      className='scroll-mt-20 border-b border-line px-6 py-24 md:px-12'
    >
      <p className='mb-3 font-mono text-xs uppercase tracking-widest2 text-gold'>
        Just Some
      </p>
      <h2 className='mb-12 max-w-xl text-3xl text-ink md:text-4xl'>
        Experiments
      </h2>

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
