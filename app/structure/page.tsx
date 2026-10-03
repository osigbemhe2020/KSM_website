import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { client } from "@/sanity/lib/client";
import { orgTiersQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Organizational Structure — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "A clear hierarchy built on service, accountability, and shared purpose — the organizational structure of the Knights of St. Mulumba.",
  openGraph: {
    title: "Organizational Structure — Knights of St. Mulumba",
    description: "A clear hierarchy built on service, accountability, and shared purpose.",
  },
  alternates: {
    canonical: "/structure",
  },
};

interface OrgTier {
  _id: string;
  tier: string;
  order: number;
  title: string;
  body?: string;
  roles?: string[];
}

async function Tiers() {
  const tiers = await client.fetch<OrgTier[]>(orgTiersQuery);

  return (
    <section className="bg-cream py-20">
      <div className="max-w-3xl mx-auto md:mx-10 lg:mx-35 space-y-6">
        {tiers.map((t) => (
          <article key={t._id} className="border border-gray-300 bg-cream p-7">
            <div className="inline-block bg-forest text-cream text-[10px] tracking-[0.25em] px-2.5 py-1 mb-5">{t.tier}</div>
            <h2 className="font-serif text-5xl text-foreground mb-6">{t.title}</h2>
            <p className="text-sm leading-relaxed text-foreground/80 mb-6">{t.body || ''}</p>
            {t.roles && t.roles.length > 0 && (
              <>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Key Roles</p>
                <div className="flex flex-wrap gap-2">
                  {t.roles.map((r) => (
                    <span key={r} className="border border-border text-xs px-3 py-1.5 text-foreground/80">{r}</span>
                  ))}
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function StructurePage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Organizational Structure"
        description="A clear hierarchy built on service, accountability, and shared purpose."
      />
      <Tiers />
    </main>
  );
}
