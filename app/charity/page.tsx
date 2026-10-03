
import { client } from '@/sanity/lib/client';
import { charityProgramsQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';

interface CharityProgram {
  _id: string;
  slug: { current: string };
  sectionTitle: string;
  tagline: string;
  hero?: {
    asset?: {
      url: string;
    };
  };
}

function Programs({ programs }: { programs: CharityProgram[] }) {
 
  return (
    <section className="bg-cream "
      style={{ marginTop: "60px", marginBottom: "40px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Our Programs</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((p: CharityProgram) => (
            <Link href={`/charity/${p.slug.current}`} key={p._id} className="block">
              <div className="border border-border bg-background p-7 hover:shadow-lg transition-shadow">
                <h3 className="font-serif text-xl mb-3">{p.sectionTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
                <span className="mt-4 inline-block text-forest text-sm hover:opacity-70">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact({ programs }: { programs: CharityProgram[] }) {
  const impactImages = programs
    .filter((p) => p.hero?.asset?.url)
    .slice(0, 3);

  return (
    <section className="bg-cream pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-serif text-5xl text-foreground mb-6">Our Impact in Action</h2>
          <p className="mt-3 text-muted-foreground max-w-md">Moments of service, solidarity, and compassion across the Abuja metropolis.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {impactImages.map((item: CharityProgram) => (
            <div key={item._id} className="relative aspect-[4/3] overflow-hidden group">
              <Image
                src={item.hero?.asset?.url || ''}
                alt={item.sectionTitle}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-serif text-lg">{item.sectionTitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function CharityPage() {
  const programs = await client.fetch<CharityProgram[]>(charityProgramsQuery);

  return (
    <div>
      <Programs programs={programs} />
      <Impact programs={programs} />
    </div>
  );
}
