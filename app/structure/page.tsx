import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

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

const tiers = [
  {
    tier: "TIER 1",
    title: "Supreme Council",
    body: "The national governing body of the Knights of St. Mulumba in Nigeria, providing overall direction, policy, and spiritual leadership for the entire Order.",
    roles: ["Supreme Knight", "Deputy Supreme Knight", "Supreme Chancellor", "Supreme Secretary"],
  },
  {
    tier: "TIER 2",
    title: "Metro Council Abuja",
    body: "The coordinating body for all KSM sub-councils within the Federal Capital Territory. The Metro Council oversees regional activities, organises metropolitan events, and ensures alignment with the Supreme Council's directives.",
    roles: ["Metropolitan Grand Knight", "Deputy Grand Knight", "Metropolitan Chancellor", "Metropolitan Secretary"],
  },
  {
    tier: "TIER 3",
    title: "Metro Zones",
    body: "Zones are the operational units of the Metro Council. They are responsible for the day-to-day activities of the Metro Council.",
    roles: ["Zonal Leader", "Zonal Secretary", "Zonal Treasurer"],
  },
  {
    tier: "TIER 4",
    title: "Sub-Councils",
    body: "Parish-level councils where the day-to-day brotherhood and service takes place. Each sub-council operates within a specific parish community and is led by its own elected officers.",
    roles: ["Grand Knight", "Deputy Grand Knight", "Chancellor", "Financial Secretary"],
  },
  {
    tier: "TIER 5",
    title: "Sub-Concil Zones",
    body: "Zones are the operational units of the Sub Council. They are responsible for the day-to-day activities of the Metro Council.",
    roles: ["Zonal Leader", "Zonal Secretary", "Zonal Treasurer"],
  },
];

function Tiers() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-3xl mx-auto md:mx-10 lg:mx-35 space-y-6">
        {tiers.map((t) => (
          <article key={t.tier} className="border border-gray-300 bg-cream p-7">
            <div className="inline-block bg-forest text-cream text-[10px] tracking-[0.25em] px-2.5 py-1 mb-5">{t.tier}</div>
            <h2 className="font-serif text-5xl text-foreground mb-6">{t.title}</h2>
            <p className="text-sm leading-relaxed text-foreground/80 mb-6">{t.body}</p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Key Roles</p>
            <div className="flex flex-wrap gap-2">
              {t.roles.map((r) => (
                <span key={r} className="border border-border text-xs px-3 py-1.5 text-foreground/80">{r}</span>
              ))}
            </div>
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
