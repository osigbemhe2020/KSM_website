import { notFound } from 'next/navigation';
import projects from '@/lib/projects';
import Link from 'next/link';

type Status = "COMPLETED" | "ONGOING" | "UPCOMING";

type Milestone = { date: string; title: string; note: string };

type Project = {
  slug: string;
  title: string;
  hero: string;
  status: Status;
  overview: string[];
  objectives: string[];
  milestones: Milestone[];
};


function StatusPill({ s }: { s: Status }) {
  const cls = s === "COMPLETED" ? "bg-forest text-white" : "border border-border text-foreground/70";
  return <span className={`inline-block text-[10px] tracking-[0.18em] px-3 py-1 ${cls}`}>{s}</span>;
}

export default async function CharitySlugPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const p = projects.find((p) => p.slug === slug);
  if (!p) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-cream">
      {/* Project Title + Image */}
      <section className="bg-cream pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-10">
            <h2 className="font-serif text-5xl text-foreground mb-6 text-center">{p.title}</h2>
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 7',
              overflow: 'hidden',
              border: '1px solid var(--border, #e5e7eb)',
              background: 'var(--background, #fff)',
            }}
          >
            <img
              src={p.hero.src}
              alt={p.title}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
          <div className="mt-5  flex justify-end"><StatusPill s={p.status} /></div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-cream pb-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[220px_1fr] gap-10">
          <h3 className="font-serif text-3xl">Project Overview</h3>
          <div className="space-y-5 text-sm md:text-[15px] text-foreground/80 leading-relaxed">
            {p.overview.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-cream pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="font-serif text-3xl md:text-4xl text-center mb-10">Objectives</h3>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {p.objectives.map((o, i) => (
              <div key={i} className="bg-cream p-7">
                <p className="text-sm mb-3">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-xl font-semibold text-gray-900 leading-relaxed">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      {/* Milestones */}
      <section className="bg-cream pb-24 ">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="font-serif text-3xl md:text-4xl text-center mb-12">Project Milestones</h3>
          <ol style={{ position: 'relative', marginLeft: '12px', paddingLeft: 0 }}>
            {p.milestones.map((m, i) => (
              <li
                key={m.title}
                style={{
                  position: 'relative',
                  paddingLeft: '32px',
                  marginBottom: i === p.milestones.length - 1 ? 0 : '40px',
                  borderLeft: i === p.milestones.length - 1 ? 'none' : '1px solid var(--border, #ddd)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '6px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--forest, #2f5233)',
                    border: '3px solid var(--cream, #f7f3ea)',
                  }}
                />
                <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'var(--muted-foreground, #888)', marginBottom: '8px' }}>
                  {m.date.toUpperCase()}
                </p>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{m.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--foreground, #333)', opacity: 0.75, lineHeight: 1.6 }}>{m.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Back */}
      <section className="bg-cream pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/projects" className="text-forest text-sm hover:opacity-70 inline-flex items-center gap-2">
            ← Back to Projects & Infrastructure
          </Link>
        </div>
      </section>
    </main>
  );
}
