import { client } from '@/sanity/lib/client';
import { committeesQuery } from '@/sanity/lib/queries';
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import Image from "next/image";

interface Committee {
  _id: string;
  ministry?: string;
  title: string;
  purpose?: string;
  responsibilities?: string[];
  recentActivity?: string[];
  leadership?: {
    chair?: string;
    secretary?: string;
  };
  image?: {
    asset?: {
      url?: string;
    };
  };
}

function CommitteeCard({ c, reverse }: { c: Committee; reverse: boolean }) {
  return (
    <article className="border border-border bg-cream mt-10">
      <div className={`grid md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="aspect-[4/3] md:aspect-auto bg-muted overflow-hidden relative">
          {c.image?.asset?.url && (
            <Image src={c.image.asset.url} alt={c.title} fill loading="lazy" className="object-cover" />
          )}
        </div>
        <div className="p-8 md:p-10">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight whitespace-pre-line">{c.title}</h3>

          {c.purpose && (
            <>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">PURPOSE</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">{c.purpose}</p>
            </>
          )}

          {c.responsibilities && c.responsibilities.length > 0 && (
            <>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">RESPONSIBILITIES</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/80 mb-6">
                {c.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2"><span className="text-forest">›</span><span>{r}</span></li>
                ))}
              </ul>
            </>
          )}

          {c.leadership && (
            <>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">LEADERSHIP</p>
              <p className="text-xs text-foreground/80 mb-1">Chair · {c.leadership.chair || 'TBD'}</p>
              <p className="text-xs text-foreground/80 mb-6">Secretary · {c.leadership.secretary || 'TBD'}</p>
            </>
          )}

          {c.recentActivity && c.recentActivity.length > 0 && (
            <>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">RECENT ACTIVITY</p>
              <ul className="space-y-1 text-xs text-foreground/70 leading-relaxed">
                {c.recentActivity.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function Grid({ committees }: { committees: Committee[] }) {
  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {committees.map((c, i) => (
          <CommitteeCard key={c._id} c={c} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

export default async function CommitteesPage() {
  const committees = await client.fetch<Committee[]>(committeesQuery);

  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Our Committees"
        description="Each committee is a ministry within the Order — entrusted with a specific calling, measured not by activity but by the fruit it bears in the lives of the faithful."
      />
      <br />
      <br />
      <Grid committees={committees} />
    </main>
  );
}
