import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export const metadata: Metadata = {
  title: "Our History — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "A legacy of faith, service, and brotherhood spanning over seven decades — the history of the Knights of St. Mulumba in Nigeria.",
  openGraph: {
    title: "Our History — Knights of St. Mulumba",
    description: "Seven decades of faith, service, and brotherhood.",
  },
};

const timeline = [
  { year: "1953", title: "The Founding", body: "The Knights of St. Mulumba was founded in Nigeria, establishing a Catholic fraternal Order rooted in faith, charity, and patriotism. Inspired by the Uganda Martyrs, the founding fathers envisioned a brotherhood dedicated to serving the Church and nation." },
  { year: "1960s", title: "Growth & Expansion", body: "The Order expanded rapidly across Nigeria with new councils established in major cities. Membership grew as Catholic men rallied around the values of unity, fraternity, and service to humanity." },
  { year: "1970s", title: "Post-War Reconstruction", body: "After the Nigerian Civil War, the Knights played a crucial role in reconciliation and reconstruction efforts, providing relief materials, supporting displaced families, and rebuilding parish communities." },
  { year: "1980s", title: "Institutional Maturity", body: "The Order formalized its organizational structure, establishing Metro Councils and strengthening governance. The Abuja Metro Council was constituted to coordinate sub-councils in the Federal Capital Territory." },
  { year: "1990s", title: "National Influence", body: "The Knights became a leading voice in Catholic advocacy, education, and social development, partnering with the hierarchy of the Church to advance moral leadership in public life." },
  { year: "2000s", title: "Charity & Outreach", body: "Major charitable initiatives took shape — scholarships, medical missions, and support for vulnerable communities — extending the Order's witness across the nation." },
  { year: "2010s", title: "Modern Era", body: "Sub-councils proliferated across the FCT and beyond. Strategic partnerships, member welfare programmes, and youth formation became cornerstones of the Order's modern identity." },
  { year: "2020s", title: "Digital Transformation", body: "Embracing modern tools for communication, record-keeping, and member engagement while preserving the timeless values and traditions that define the Order." },
];

function Timeline() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="font-serif text-6xl md:text-7xl text-forest/90  mb-6">1953</div>
          <p className="font-serif text-xl md:text-2xl  italic max-w-md mx-auto leading-snug">
            "Founded on the principles of Charity, Unity, Fraternity, and Patriotism."
          </p>
        </div>
        <div className="relative pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-2 bottom-2 w-px bg-forest/30" />
          {timeline.map((t) => (
            <div key={t.year} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[26px] md:-left-[42px] top-1.5 h-3 w-3 rounded-full border-2 border-forest " />
              <div className="text-forest/90 font-serif text-lg mb-1">{t.year}</div>
              <h3 className="font-serif text-3xl mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{t.body}</p>
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
