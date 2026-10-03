import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { charityProgramBySlugQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';

interface Initiative {
  title?: string;
  description?: string;
}

interface ImpactImage {
  title?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
}

interface CharityProgramDetail {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  hero?: {
    asset?: {
      url?: string;
    };
  };
  overview: string[];
  initiatives?: Initiative[];
  impactNote?: string;
  impactImages?: ImpactImage[];
}



export default async function CharitySlugPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const p = await client.fetch<CharityProgramDetail>(charityProgramBySlugQuery, { slug });
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
                        {p.hero?.asset?.url && (
                            <Image
                                src={p.hero.asset.url}
                                alt={p.title}
                                fill
                                loading="lazy"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        )}
                    </div>
                </div>
            </section>
            <br />

            {/* Overview */}
            <section className="bg-cream pb-20">
                <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[200px_1fr] gap-10">
                    <h3 className="font-serif text-3xl">Overview</h3>
                    <div className="space-y-5 text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                        {p.overview.map((para: string, i: number) => <p key={i}>{para}</p>)}
                    </div>
                </div>
            </section>

            {/* Core Initiatives */}
            {p.initiatives && p.initiatives.length > 0 && (
                <section className="bg-cream pb-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <h3 className="font-serif text-3xl md:text-4xl text-center mb-3">Core Initiatives</h3>
                        <p className="text-xs text-muted-foreground text-center mb-10">The specific works through which this ministry takes shape.</p>
                        <div className="grid md:grid-cols-2 gap-5  border border-[#EAEAEA]">
                            {p.initiatives.filter((it): it is Initiative => it !== null).map((it: Initiative, i: number) => (
                                <div key={i} className="bg-cream p-7">
                                    <p className="text-xs text-muted-foreground mb-3">{String(i + 1).padStart(2, "0")}</p>
                                    <h4 className="font-serif text-lg mb-3 leading-snug">{it.title || 'Untitled Initiative'}</h4>
                                    <p className="text-sm text-foreground/75 leading-relaxed">{it.description || ''}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Our Impact */}
            {p.impactImages && p.impactImages.length > 0 && (
                <section className="bg-cream pb-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <h3 className="font-serif text-3xl md:text-4xl text-center mb-3">Our Impact</h3>
                        <p className="text-xs text-muted-foreground text-center mb-10">{p.impactNote || ''}</p>
                        <div className="grid md:grid-cols-3 gap-5">
                            {p.impactImages
                                .filter((item): item is ImpactImage => item !== null && !!item.image?.asset?.url)
                                .map((item: ImpactImage, i: number) => (
                                <div key={i} className="relative aspect-[4/3] overflow-hidden group">
                                    <Image
                                        src={item.image?.asset?.url || ''}
                                        alt={item.title || 'Impact image'}
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white font-serif text-lg">{item.title || ''}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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

