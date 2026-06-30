import { notFound } from 'next/navigation';
import programs from '@/lib/programs';
import Link from 'next/link';



export default async function CharitySlugPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const p = programs.find((p) => p.slug === slug);
    if (!p) {
        notFound();
    }

    return (
        <div>
            {/* Section title + Hero image */}
            <section className="bg-cream pt-16 pb-12">
                <div className="max-w-5xl mx-auto px-6 ">
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
                </div>
            </section>
            <br />

            {/* Overview */}
            <section className="bg-cream pb-20">
                <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[200px_1fr] gap-10">
                    <h3 className="font-serif text-3xl">Overview</h3>
                    <div className="space-y-5 text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                        {p.overview.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                </div>
            </section>

            {/* Core Initiatives */}
            <section className="bg-cream pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h3 className="font-serif text-3xl md:text-4xl text-center mb-3">Core Initiatives</h3>
                    <p className="text-xs text-muted-foreground text-center mb-10">The specific works through which this ministry takes shape.</p>
                    <div className="grid md:grid-cols-2 gap-5  border border-[#EAEAEA]">
                        {p.initiatives.map((it, i) => (
                            <div key={it.t} className="bg-cream p-7">
                                <p className="text-xs text-muted-foreground mb-3">{String(i + 1).padStart(2, "0")}</p>
                                <h4 className="font-serif text-lg mb-3 leading-snug">{it.t}</h4>
                                <p className="text-sm text-foreground/75 leading-relaxed">{it.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Impact */}
            <section className="bg-cream pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="font-serif text-3xl md:text-4xl text-center mb-3">Our Impact</h3>
                    <p className="text-xs text-muted-foreground text-center mb-10">{p.impactNote}</p>
                    <div className="grid md:grid-cols-3 gap-5">
                        {p.impactImages.map((i) => (
                            <div key={i.t} className="relative aspect-[4/3] overflow-hidden group">
                                <img src={i.src.src} alt={i.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white font-serif text-lg">{i.t}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Back */}
            <section className="bg-cream pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    <Link href="/charity" className="text-forest text-sm hover:opacity-70 inline-flex items-center gap-2">
                        ← Back to Charity & Outreach
                    </Link>
                </div>
            </section>
        </div>
    );
}

