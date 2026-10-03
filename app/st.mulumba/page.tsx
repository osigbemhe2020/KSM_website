import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { client } from "@/sanity/lib/client";
import { stMulumbaQuery } from "@/sanity/lib/queries";
import Image from "next/image";

interface StMulumba {
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
  lifeTitle: string;
  lifeParagraphs: string[];
  quote: string;
  quoteAttribution: string;
  anthem?: string;
  anthemComposer?: string;
  significanceTitle: string;
  significanceText: string;
  legacyTitle: string;
  legacyPoints: string[];
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<StMulumba>(stMulumbaQuery);

  return {
    title: `${data?.title || "About St. Mulumba"} — Knights of St. Mulumba, Metro Council Abuja`,
    description: data?.description || "The Ugandan Martyr whose courage and faith inspire the identity of the Knights of St. Mulumba brotherhood.",
    openGraph: {
      title: data?.title || "About St. Mulumba",
      description: data?.description || "The Ugandan Martyr whose courage and faith inspire this brotherhood.",
    },
    alternates: {
      canonical: "/st.mulumba",
    },
  };
}

function Life({ data }: { data: StMulumba }) {
  return (
    <section className="bg-[#f6f2e9] py-16 md:py-24">
      <article className="mx-auto max-w-5xl px-6 text-foreground">
        <div className="flex items-center justify-between gap-4 border-y border-foreground/30 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-foreground/65">
          <span>Faith &amp; witness</span>
          <span>Patron saint of the Order</span>
        </div>
        <h2 className="max-w-4xl py-7 font-serif text-4xl leading-[1.04] md:py-9 md:text-6xl md:leading-[1.02]">
          {data.lifeTitle}
        </h2>

        <div className="font-serif text-[17px] leading-[1.85] md:text-lg">
          {data.portrait?.asset?.url && (
            <figure className="mb-5 md:float-left md:mb-5 md:mr-9 md:w-[46%]">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={data.portrait.asset.url}
                  alt={data.portrait.asset.altText || "St. Matthias Mulumba — Martyr of Uganda"}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 border-b border-foreground/25 pb-3 font-sans text-[10px] uppercase tracking-[0.18em] leading-relaxed text-foreground/65">
                {data.portraitCaption || "St. Matthias Mulumba — Martyr of Uganda"}
              </figcaption>
            </figure>
          )}
          <div className="space-y-5">
            {data.lifeParagraphs.map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-forest" : undefined}>{para}</p>
            ))}
          </div>
          <div className="clear-both pt-8" />
        </div>
        <div className="border-t border-foreground/30 pt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/55">
          The Uganda Martyrs · Matthias Kalemba Mulumba
        </div>
      </article>
    </section>
  );
}

function Quote({ data }: { data: StMulumba }) {
  return (
    <section className="bg-forest text-cream py-20 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-serif italic text-3xl md:text-4xl leading-snug">
          &ldquo;{data.quote}&rdquo;
        </p>
        <p className="text-xs tracking-[0.3em] mt-6 opacity-80">— {data.quoteAttribution}</p>
      </div>
    </section>
  );
}

function Anthem({ data }: { data: StMulumba }) {
  if (!data.anthem) return null;

  return (
    <section className="bg-cream py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl text-foreground mb-8">Mulumba Anthem</h2>
        <p className="font-serif italic text-lg leading-relaxed whitespace-pre-line">{data.anthem}</p>
        {data.anthemComposer && (
          <p className="text-xs tracking-[0.2em] text-muted-foreground mt-6 uppercase">Composed by {data.anthemComposer}</p>
        )}
      </div>
    </section>
  );
}

function Legacy({ data }: { data: StMulumba }) {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        <div>
          <h3 className="font-serif text-3xl text-foreground mb-5">{data.significanceTitle}</h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            {data.significanceText}
          </p>
        </div>
        <div>
          <h3 className="font-serif text-3xl text-foreground mb-5">{data.legacyTitle}</h3>
          <ul className="space-y-3 text-sm text-foreground/80">
            {data.legacyPoints.map((point, i) => (
              <li key={i} className="flex gap-3"><span className="text-forest mt-1">◆</span>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default async function AboutMulumbaPage() {
  const data = await client.fetch<StMulumba>(stMulumbaQuery);

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
        title='Our Patron Saint'
        description={data.description || ""}
      />
      <Life data={data} />
      <Quote data={data} />
      <Anthem data={data} />
      <Legacy data={data} />
    </main>
  );
}
