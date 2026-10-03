import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import sketchImg from "@/assets/cathedral-sketch.png";
import outreachImg from "@/assets/vision-outreach.jpg";
import cathedralImg from "@/assets/vision-cathedral.jpg";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export const metadata: Metadata = {
  title: "Our Values — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "The cherished values of the Knights of St. Mulumba — order and discipline, ecumenism, compassion, trust in God, justice, and exemplary Catholic living.",
  alternates: {
    canonical: "/our-values",
  },
  openGraph: {
    title: "Our Values — Knights of St. Mulumba",
    description:
      "The cherished values that guide every Knight in faith, charity, and brotherhood.",
  },
};

const values = [
  {
    numeral: "01",
    title: "Order & Discipline",
    lead: "Working towards a high sense of order and discipline within the society.",
    body: "A Knight is a man of structure — in his conduct, his commitments, and his word. Order and discipline are the quiet strength behind every good work the Order undertakes, ensuring that charity is delivered with dignity and purpose.",
  },
  {
    numeral: "02",
    title: "Ecumenical Co-operation",
    lead: "Co-operating with other Christian denominations and persons of goodwill, without compromising Catholic doctrines and principles.",
    body: "The Order reaches out in friendship and collaboration with all who work for the good of humanity, while remaining firmly rooted in and faithful to the teachings of the Catholic Church.",
  },
  {
    numeral: "03",
    title: "Compassion for the Poor",
    lead: "Being sensitive to the needs of the poor and giving succor to the destitute, the disadvantaged and the oppressed in the society.",
    body: "Charity is the first law of the Order. Every Knight keeps his eyes and heart open to the suffering around him — responding not from abundance, but from love.",
  },
  {
    numeral: "04",
    title: "Trust in God",
    lead: "Trusting in God always rather than in man or material possessions.",
    body: "Prosperity and position pass away; God remains. The Knight places his confidence in divine providence above wealth, influence, or worldly security.",
  },
  {
    numeral: "05",
    title: "Working for Justice",
    lead: "Working for justice always and everywhere, for the benefit of mankind.",
    body: "Justice is not seasonal and it is not selective. The Knight defends what is right — in the family, the workplace, the community, and the nation — wherever human dignity is at stake.",
  },
  {
    numeral: "06",
    title: "Exemplary Catholic Life",
    lead: "Living an exemplary Catholic life, defending the Catholic faith and loving one's neighbour as oneself.",
    body: "Above all, a Knight's life must preach what his lips profess — a visible witness of faith, defended with courage, and charity extended to every neighbour as to Christ himself.",
  },
];

function ValuesList() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-[11px] tracking-[0.3em] text-forest mb-4">THE CHERISHED VALUES OF KSM</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">What Every Knight Holds Dear</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Drawn from the constitutions of the Order, these cherished values shape the character of every Knight of St. Mulumba — from the newest member to the Grand Knight himself.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {values.map((v) => (
            <article key={v.numeral} className="relative grid md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-12 border-t border-forest/15 first:border-t-0">
              <div className="font-serif text-5xl md:text-6xl text-gold leading-none select-none">{v.numeral}</div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl mb-3">{v.title}</h3>
                <p className="font-serif text-lg md:text-xl italic text-foreground/90 leading-snug mb-4">{v.lead}</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{v.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function ValuesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Our Values"
        description="The cherished principles every Knight lives by — at home, in the parish, and in society."
      />
      <ValuesList />

    </main>
  );
}
