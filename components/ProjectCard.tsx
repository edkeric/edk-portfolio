import Image from 'next/image';

export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  demo?: string;
  repo?: string;
  preview?: string;
  placeholder?: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { name, description, tags, demo, repo, preview, placeholder } = project;

  const links = [
    demo && { label: 'Live demo', href: demo },
    repo && { label: 'View code', href: repo },
  ].filter(Boolean) as { label: string; href: string }[];

  const flippable = links.length > 0 && !placeholder;

  return (
    <div className="project-card group h-[300px] [perspective:1200px]">
      <div
        className={`relative h-full w-full rounded-md transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
          flippable ? 'group-hover:[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 flex h-full flex-col justify-between rounded-md border p-6 [backface-visibility:hidden] ${
            placeholder
              ? "border-dashed border-line/70 text-ink-dim"
              : "border-line bg-surface"
          }`}
        >
          <div>
            <p className="mb-3 font-mono text-xs text-ink-dim">
              /projects/{project.slug}
            </p>
            <h3 className="mb-2 text-xl text-ink">{name}</h3>
            <p className="line-clamp-4 text-sm leading-relaxed text-ink-dim">
              {description}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-gold">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-gold/30 bg-gold-soft px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {flippable && (
            <span className="absolute right-6 top-6 font-mono text-[11px] text-ink-dim transition-colors group-hover:text-gold">
              hover ↻
            </span>
          )}
        </div>

        {/* Back face — only rendered when there's something to link to */}
        {flippable && preview && (
          <div className="absolute inset-0 overflow-hidden rounded-md border border-gold/40 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image
              src={preview}
              alt={`${name} preview`}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 flex gap-5 bg-gradient-to-t from-bg via-bg/85 to-transparent px-6 pb-4 pt-10 font-mono text-sm">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink transition-colors hover:text-gold"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {flippable && !preview && (
          <div className="absolute inset-0 flex h-full flex-col items-start justify-center gap-4 rounded-md border border-gold/40 bg-surface p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="font-mono text-xs uppercase tracking-widest2 text-gold">
              {name}
            </p>
            <div className="flex flex-col gap-3 font-mono text-sm">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink transition-colors hover:text-gold"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
