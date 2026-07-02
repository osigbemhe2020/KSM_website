import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLeader, getOtherLeaders, type Leader } from "@/lib/leadership-data";

export interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const leader = getLeader(slug);
    if (!leader) return {};

    return {
        title: `${leader.name} — Knights of St. Mulumba`,
        description: leader.shortBio ?? "",
        alternates: {
            canonical: `/leadership/${leader.slug}`,
        },
        openGraph: {
            title: leader.name,
            description: leader.shortBio ?? "",
            type: "profile",
            url: `/leadership/${leader.slug}`,
        },
    };
}

function HeroCard({ leader }: { leader: Leader }) {
    return (
        <section className="bg-forest text-cream">
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 items-start">
                <div className="aspect-square bg-cream/10 overflow-hidden">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" width={800} height={800} />
                </div>
                <div className="pt-6">
                    <p className="text-[10px] tracking-[0.3em] text-cream/70 mb-3">{leader.role}</p>
                    <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-2">{leader.name}</h1>
                    <p className="text-xs tracking-wide text-cream/70 mb-6">{leader.served}</p>
                    <p className="text-sm text-cream/85 max-w-md leading-relaxed">{leader.shortBio}</p>
                </div>
            </div>
        </section>
    );
}

function Biography({ leader }: { leader: Leader }) {
    return (
        <section className="bg-cream py-20">
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[220px_1fr] gap-10">
                <div>
                    <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">BIOGRAPHY</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">{leader.bioHeading}</h2>
                </div>
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                    {leader.bio.map((p: string, i: number) => <p key={i}>{p}</p>)}
                </div>
            </div>
        </section>
    );
}

function ResponsibilitiesGifts({ leader }: { leader: Leader }) {
    return (
        <section className="bg-cream pb-20">
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                <div>
                    <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">OFFICE & DUTIES</p>
                    <h3 className="font-serif text-2xl text-foreground mb-6">Key Responsibilities</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                        {leader.responsibilities.map((r: string) => (
                            <li key={r} className="flex gap-3">
                                <span className="text-forest mt-1.5 h-1 w-1 rounded-full bg-forest shrink-0" aria-hidden />
                                <span>{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">AREAS OF FOCUS</p>
                    <h3 className="font-serif text-2xl text-foreground mb-6">Particular Gifts</h3>
                    <div className="flex flex-col items-start gap-3">
                        {leader.gifts.map((g: string) => (
                            <span key={g} className="border border-border px-4 py-2 text-sm text-foreground/80 bg-cream/60">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function OtherOfficers({ others }: { others: Leader[] }) {
    return (
        <section className="bg-cream pb-24">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">MORE FROM COUNCIL</p>
                <h2 className="font-serif text-3xl text-foreground mb-10">Meet Other Officers</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {others.map((o: Leader) => (
                        <article key={o.slug} className="border border-border bg-cream/60 p-4">
                            <div className="aspect-square bg-muted overflow-hidden mb-4">
                                <img src={o.image} alt={o.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[9px] tracking-[0.25em] text-muted-foreground mb-2">{o.role}</p>
                            <h3 className="font-serif text-lg text-foreground leading-tight mb-1">{o.name}</h3>
                            <p className="text-[11px] tracking-wide text-muted-foreground mb-3">{o.served}</p>
                            <p className="text-xs text-foreground/70 leading-relaxed mb-4">{o.shortBio}</p>
                            <Link
                                href={`/leadership/${o.slug}`}
                                className="inline-block text-[10px] tracking-[0.2em] px-3 py-2 border border-border hover:border-forest hover:text-forest transition-colors"
                            >
                                READ FULL BIOGRAPHY
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default async function LeaderDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const leader = getLeader(slug);

    if (!leader) {
        notFound();
    }

    const others = getOtherLeaders(slug);

    return (
        <main className="min-h-screen bg-cream">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <Link
                    href="/leadership"
                    className="text-forest text-sm hover:opacity-70 inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Leadership
                </Link>
            </div>
            <HeroCard leader={leader} />
            <Biography leader={leader} />
            <ResponsibilitiesGifts leader={leader} />
            <OtherOfficers others={others} />
        </main>
    );
}
