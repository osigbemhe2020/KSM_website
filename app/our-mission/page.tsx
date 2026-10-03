import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import brothers from "@/assets/images/IMG_9945.jpg";
import sisters from "@/assets/images/IMG_9925.jpg"
import { client } from "@/sanity/lib/client";
import { pillarsQuery } from "@/sanity/lib/queries";

interface Pillar {
  _id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  description?: string;
  order?: number;
  context?: string;
}

function Vision() {
  return (
    <section className="bg-cream pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img src={brothers.src} alt="Knights gathered in cathedral" loading="lazy" width={1280} height={896} className="w-full h-[300px] md:h-[360px] object-cover" />
          <img src={sisters.src} alt="Community outreach distribution" loading="lazy" width={1280} height={896} className="w-full h-[300px] md:h-[360px] object-cover" />
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="font-serif text-5xl text-foreground mb-6">Vision</h2>
          <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-snug italic">
            "To be the foremost Catholic fraternal organization in Nigeria — a beacon of faith, charity, and brotherhood that transforms lives and communities for the glory of God."
          </p>
        </div>
      </div>
    </section>
  );
}

async function Mission() {
  const allPillars = await client.fetch<Pillar[]>(pillarsQuery);
  const pillars = allPillars.filter(p => p.context === 'mission' || p.context === 'both');

  return (
    <section className="bg-cream pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Our Mission</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map((p) => (
            <div key={p._id}>
              <div className="text-forest text-3xl mb-4" aria-hidden>{p.icon || '✦'}</div>
              <h3 className="font-serif text-2xl text-foreground leading-tight">
                {p.title}{p.subtitle && <><br />{p.subtitle}</>}
              </h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{p.description || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function VisionPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero title="Our Mission" description="To be the foremost Catholic fraternal organization in Nigeria — a beacon of faith, charity, and brotherhood that transforms lives and communities for the glory of God." />
      <Vision />
      <Mission />
    </main>
  );
}

export default VisionPage;
