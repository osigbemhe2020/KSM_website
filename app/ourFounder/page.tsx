import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { client } from "@/sanity/lib/client";
import { founderQuery } from "@/sanity/lib/queries";
import Image from "next/image";

interface Founder {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  heroImage?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
  portrait?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
  portraitCaption?: string;
  founderIntro: string;
  founderBio: string[];
  chapters: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  visionQuote: string;
  visionAttribution: string;
  momentImages?: Array<{
    asset?: {
      url?: string;
      altText?: string;
    };
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<Founder>(founderQuery);

  return {
    title: `${data?.title || "Our Founder"} — Knights of St. Mulumba, Metro Council Abuja`,
    description: data?.description || "Reverend Father Abraham Ojefua, the founder of Knights of St. Mulumba, Metro Council Abuja",
    openGraph: {
      title: data?.title || "Our Founder",
      description: data?.description || "Reverend Father Abraham Ojefua, the founder of Knights of St. Mulumba, Metro Council Abuja",
    },
    alternates: {
      canonical: "/founders",
    },
  };
}

function FounderTable({ data }: { data: Founder }) {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          {data.portrait?.asset?.url ? (
            <>
              <div className="aspect-[7/8] bg-muted border border-border overflow-hidden">
                <Image
                  src={data.portrait.asset.url}
                  alt={data.portrait.asset.altText || "Reverend Father Ojefua"}
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mt-4">{data.portraitCaption || "REV.FR. OJEFUA"}</p>
            </>
          ) : (
            <div className="aspect-[7/8] bg-muted border border-border flex items-center justify-center">
              <p className="text-muted-foreground">No portrait image uploaded</p>
            </div>
          )}
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">OUR FOUNDER</p>
          <h2 className="font-serif text-5xl text-foreground mb-6">Rev Fr. Abraham Ojefua</h2>
          <p className="text-sm text-foreground/80 leading-relaxed mb-8">
            {data.founderIntro}
          </p>
          <div className="border-t border-border">
            <div className="space-y-5 text-sm leading-relaxed text-foreground/80">
              {data.founderBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story({ data }: { data: Founder }) {
  return (
    <section className="bg-cream pb-20">
      <div className="max-w-2xl mx-auto px-6 space-y-12">
        {data.chapters.map((c) => (
          <article key={c.title}>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">{c.label}</p>
            <h3 className="font-serif text-3xl text-foreground mb-4 leading-tight">{c.title}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{c.body}</p>
          </article>
        ))}
        <p className="text-xs text-center text-muted-foreground italic pt-4">A vision lit by faith, carried forward by brotherhood.</p>
      </div>
    </section>
  );
}

function Vision({ data }: { data: Founder }) {
  return (
    <section className="bg-forest text-cream py-20 mb-10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] opacity-70 mb-4">{data.visionAttribution}</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Vision That Started It All.</h2>
        <p className="font-serif italic text-lg md:text-xl leading-relaxed opacity-90">
          &ldquo;{data.visionQuote}&rdquo;
        </p>
      </div>
    </section>
  );
}



export default async function FoundersPage() {
  const data = await client.fetch<Founder>(founderQuery);

  if (!data) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Content not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Our Founder"
        description="Reverend Father Abraham Ojefua, the founder of Knights of St. Mulumba, Metro Council Abuja"
      />
      <FounderTable data={data} />
      <Vision data={data} />

      <Story data={data} />


    </main>
  );
}
