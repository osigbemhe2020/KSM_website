import { client } from '@/sanity/lib/client';
import { leadersQuery, pillarsQuery } from '@/sanity/lib/queries';
import ProfileCard from "@/components/ProfileCard";
import Link from "next/link";
import Image from "next/image";

interface Leader {
  _id: string;
  slug: { current: string };
  name: string;
  role: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  served?: string;
  shortBio?: string;
}

interface Pillar {
  _id: string;
  title: string;
  icon?: string;
  description?: string;
  context?: string;
}

function GrandKnight({ grandKnight }: { grandKnight: Leader }) {
  return (
    <section className="bg-cream pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">LEADERSHIP SPOTLIGHT</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Metropolitan Grand Knight</h2>
        <Link href={`/leadership/${grandKnight.slug.current}`}>
          <article className="border border-border bg-cream/60 p-5 text-left max-w-sm mx-auto">
            <div className="aspect-square bg-muted overflow-hidden mb-5 relative">
              {grandKnight.image?.asset?.url && (
                <Image
                  src={grandKnight.image.asset.url}
                  alt={grandKnight.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              )}
            </div>
            <p className="text-[9px] tracking-[0.25em] text-muted-foreground mb-2">{grandKnight.role}</p>
            <h3 className="font-serif text-xl text-foreground leading-tight mb-1">{grandKnight.name}</h3>
            <p className="text-[11px] tracking-wide text-muted-foreground mb-3">{grandKnight.served || ''}</p>
            <p className="text-xs text-foreground/70 leading-relaxed mb-5">{grandKnight.shortBio || ''}</p>
            <button className="text-[10px] tracking-[0.2em] px-4 py-2 border border-border hover:border-forest hover:text-forest transition-colors">
              VIEW FULL PROFILE
            </button>
          </article>
        </Link>
      </div>
    </section>
  );
}

function Stewards({ stewards }: { stewards: Leader[] }) {
  if (stewards.length === 0) return null;

  return (
    <section className="bg-cream pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">THE COUNCIL OFFICERS</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">Stewards of the Order</h2>
        <p className="text-sm text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Each officer brings particular gifts to the service of the Council, supporting the Worthy Metropolitan Grand Knight in
          shepherding our brotherhood.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stewards.map((s) => (
            <Link key={s._id} href={`/leadership/${s.slug.current}`}>
              <ProfileCard
                imageSrc={s.image?.asset?.url || ''}
                roleNode={s.role}
                name={s.name}
                subtitle={s.served || ''}
                description={s.shortBio || ''}
                buttonText="VIEW FULL PROFILE"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

async function Pillars() {
  const allPillars = await client.fetch<Pillar[]>(pillarsQuery);
  const pillars = allPillars.filter((p) => p.context === 'mission' || p.context === 'both');

  if (!pillars.length) return null;

  return (
    <section className="bg-cream pb-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">LEADERSHIP SPOTLIGHT</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Pillars of Our Council</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {pillars.map((p) => (
            <div key={p._id}>
              <div className="text-forest text-3xl mb-4" aria-hidden>
                {p.icon}
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function LeadershipPage() {
  const leaders = await client.fetch<Leader[]>(leadersQuery);

  // First leader is the Grand Knight; the rest are stewards
  const grandKnight = leaders[0];
  const stewards = leaders.slice(1);

  return (
    <main>
      {grandKnight && <GrandKnight grandKnight={grandKnight} />}
      <Stewards stewards={stewards} />
      <Pillars />
    </main>
  );
}
