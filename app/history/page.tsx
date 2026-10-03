import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { client } from "@/sanity/lib/client";
import { timelineItemsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our History — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "A legacy of faith, service, and brotherhood spanning over seven decades — the history of the Knights of St. Mulumba in Nigeria.",
  openGraph: {
    title: "Our History — Knights of St. Mulumba",
    description: "Seven decades of faith, service, and brotherhood.",
  },
};

interface TimelineItem {
  _id: string;
  year: string;
  title: string;
  body?: string;
  order: number;
}

async function Timeline() {
  const timeline = await client.fetch<TimelineItem[]>(timelineItemsQuery);

  return (
    <section className="bg-cream py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="font-serif text-6xl md:text-7xl text-forest/90  mb-6">1953</div>
          <p className="font-serif text-xl md:text-2xl  italic max-w-md mx-auto leading-snug">
            &ldquo;Founded on the principles of Charity, Unity, Fraternity, and Patriotism.&rdquo;
          </p>
        </div>
        <div className="relative pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-2 bottom-2 w-px bg-forest/30" />
          {timeline.map((t) => (
            <div key={t._id} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[26px] md:-left-[42px] top-1.5 h-3 w-3 rounded-full border-2 border-forest " />
              <div className="text-forest/90 font-serif text-lg mb-1">{t.year}</div>
              <h3 className="font-serif text-3xl mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{t.body || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HistoryPage() {
  return (
    <main>
      <WhoWeAreHero title="Our History" description="A legacy of faith, service, and brotherhood spanning over seven decades " />
      <Timeline />
    </main>
  );
}
