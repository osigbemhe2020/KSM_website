import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

import portrait from "@/assets/founder-portrait.jpg";
import moment1 from "@/assets/founder-moment-1.jpg";
import moment2 from "@/assets/founder-moment-2.jpg";
import moment3 from "@/assets/founder-moment-3.jpg";



export const metadata: Metadata = {
  title: "Our Founder — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "Reverend Father Abraham Ojefua, the founder of Knights of St. Mulumba, Metro Council Abuja",
  openGraph: {
    title: "Our Founder",
    description: "Reverend Father Abraham Ojefua, the founder of Knights of St. Mulumba, Metro Council Abuja",
  },
  alternates: {
    canonical: "/founders",
  },
};


function FounderTable() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="aspect-[4/5] bg-muted border border-border overflow-hidden">
            <img src={portrait.src} alt="Sir Kt. Augustine I. Nnamdiwu" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground mt-4">REV.FR. OJEFUA</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">OUR FOUNDER</p>
          <h2 className="font-serif text-5xl text-foreground mb-6">Our Founder.</h2>
          <p className="text-sm text-foreground/80 leading-relaxed mb-8">
            The visionary whose faith, leadership, and commitment laid the foundation upon which this metropolitan council was built — a man of God and a servant of the Order.
          </p>
          <div className="border-t border-border">
            <div className="space-y-5 text-sm leading-relaxed text-foreground/80">
              <p>St. Matthias Mulumba Kalemba (also known as Matthias Kalemba) was one of the Uganda Martyrs, a group of Catholic and Anglican converts who were executed between 1885 and 1887 on the orders of Mwanga II, the Kabaka (King) of Buganda.</p>
              <p>Matthias Mulumba was a chief and judge in the royal court. He was among the earliest converts to Catholicism in Uganda, baptised by the White Fathers missionaries. His faith was deep and unwavering, and he paid the price of that fidelity in defence of ancient Christians and witness to the Gospel.</p>
              <p>When King Mwanga II launched a violent persecution against Christians, Matthias refused to renounce his faith. He was arrested, brutally tortured, and clamoured a slow, agonizing death. On May 30, 1886, his death was particularly grievous — he was dismembered and left to die alone — yet he bore his suffering with extraordinary faith and forgiveness.</p>
              <p>He was beatified by Pope Benedict XV in 1920 and canonized by Pope Paul VI on October 18, 1964, along with 21 other Uganda Martyrs. Their feast day is celebrated on June 3rd.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const chapters = [
  {
    label: "THE SPARK",
    title: "A Quiet Faith, A Resounding Call.",
    body: "Long before the Metro Council formally existed, a small circle of Catholic gentlemen gathered in prayer and quiet conversation about the role of laymen in the life of the Church. From those evenings, an idea took root — that faith, lived deliberately, demands fraternity and service.",
  },
  {
    label: "EARLY DAYS",
    title: "A Calling to Service",
    body: "What began as informal fellowship soon shaped itself into purpose. The founder gathered like-minded brothers, drew up the first statutes, and walked the corridors of the Church to seek the blessing of the bishops. Each step was offered as an act of obedience.",
  },
  {
    label: "FOUNDATION",
    title: "The Inspiration Behind the Order",
    body: "The witness of St. Matthias Mulumba — a young page who chose death rather than betray his faith — became the cornerstone of the new Order. His courage gave the brotherhood both a name and a measure to live by.",
  },
  {
    label: "FORMATION",
    title: "Trials and Defining Values",
    body: "The early years were not without difficulty. Yet through trial, the four pillars — charity, integrity, brotherhood, and unity in Christ — were tested and proven. What emerged was a council confident in its identity and its mission.",
  },
];

function Story() {
  return (
    <section className="bg-cream pb-20">
      <div className="max-w-2xl mx-auto px-6 space-y-12">
        {chapters.map((c) => (
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

function Vision() {
  return (
    <section className="bg-forest text-cream py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] opacity-70 mb-4">HIS VISION</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Vision That Started It All.</h2>
        <p className="font-serif italic text-lg md:text-xl leading-relaxed opacity-90">
          “To raise up Catholic gentlemen who, by the witness of faith and the labour of charity, shall be a light to the Church and a refuge to the poor — bound to one another in brotherhood, and to God in obedience — until the close of the age.”
        </p>
      </div>
    </section>
  );
}

function Moments() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-serif text-5xl text-foreground mb-6">Moments Preserved.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[moment1, moment2, moment3].map((src, i) => (
            <div key={i} className="aspect-[4/5] bg-muted border border-border overflow-hidden">
              <img src={src.src} alt="" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Our Founder"
        description="The man behind the mission."
      />
      <FounderTable />
      {/* <Story /> */}
      <Vision />
      <Moments />
    </main>
  );
}
