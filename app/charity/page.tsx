
import impact1 from "@/assets/impact-1.jpg";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";

// export const Route = createFileRoute("/charity-outreach")({
//   head: () => ({
//     meta: [
//       { title: "Charity & Outreach — Knights of St. Mulumba, Metro Council Abuja" },
//       { name: "description", content: "Extending God's love through compassionate service and structured community support across the Abuja metropolis." },
//       { property: "og:title", content: "Charity & Outreach — Knights of St. Mulumba" },
//       { property: "og:description", content: "Compassionate service and structured community support." },
//     ],
//     links: [{ rel: "canonical", href: "/charity-outreach" }],
//   }),
//   component: CharityPage,
// });



import programs from '@/lib/programs';
import Link from 'next/link';

function Programs() {
  return (
    <section className="bg-cream "
      style={{ marginTop: "60px", marginBottom: "40px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">Our Programs</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((p) => (
            <Link href={`/charity/${p.slug}`} key={p.slug} className="block">
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

function Impact() {
  const imgs = [
    { src: impact1, t: "Food & Welfare Outreach" },
    { src: impact2, t: "Liturgical Service" },
    { src: impact3, t: "Youth Formation" },
  ];
  return (
    <section className="bg-cream pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-serif text-4xl md:text-5xl">Our Impact in Action</h2>
          <p className="mt-3 text-muted-foreground max-w-md">Moments of service, solidarity, and compassion across the Abuja metropolis.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {imgs.map((i) => (
            <div key={i.t} className="relative aspect-[4/3] overflow-hidden group">
              <img src={i.src.src} alt={i.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-serif text-lg">{i.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CharityPage() {
  return (
    <div>
      <Programs />
      <Impact />
    </div>
  );
}
