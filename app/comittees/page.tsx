import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { StaticImageData } from "next/image";
import img1 from "@/assets/impact-1.jpg";
import img2 from "@/assets/impact-2.jpg";
import img3 from "@/assets/impact-3.jpg";
import img4 from "@/assets/project-cathedral.jpg";

// export const Route = createFileRoute("/committees")({
//   head: () => ({
//     meta: [
//       { title: "Committees — Knights of St. Mulumba, Metro Council Abuja" },
//       { name: "description", content: "A close-knit hub of service, accountability, and shared purpose." },
//       { property: "og:title", content: "Committees — Knights of St. Mulumba" },
//       { property: "og:description", content: "A close-knit hub of service, accountability, and shared purpose." },
//     ],
//     links: [{ rel: "canonical", href: "/committees" }],
//   }),
//   component: CommitteesPage,
// });




type Committee = {
  ministry: string;
  title: string;
  purpose: string;
  responsibilities: string[];
  recentActivity: string[];
  leadership: { chair: string; secretary: string };
  image: StaticImageData;
};

const committees: Committee[] = [
  {
    ministry: "MINISTRY I",
    title: "Faith\nFormation Committee",
    purpose: "Supports the spiritual growth and Catholic formation of every knight — anchoring the Order in prayer, sacrament, and sound doctrine.",
    responsibilities: ["Annual retreats and recollections", "Catholic faith education"],
    recentActivity: ["Daily and weekly prayer programmes", "Liturgical support at Council Masses", "Lenten retreat at Holy Cross Cathedral drew over 240 Knights this past season."],
    leadership: { chair: "Sir Kt. Joseph Akpede KSM", secretary: "Sir Kt. Cyprian Eze KSM" },
    image: img1,
  },
  {
    ministry: "MINISTRY II",
    title: "Community\nOutreach Committee",
    purpose: "Coordinates the Order's charitable activities and welfare programmes — extending Christ's compassion to communities across the FCT.",
    responsibilities: ["Food and relief drives", "Community welfare interventions", "Medical outreach missions", "Volunteer coordination"],
    recentActivity: ["Christmas Charity Drive served 1,800 households across six rural communities."],
    leadership: { chair: "Sir Kt. Bernard Eze KSM", secretary: "Sir Kt. Andrew Musa KSM" },
    image: img2,
  },
  {
    ministry: "MINISTRY III",
    title: "Membership &\nRecruitment Committee",
    purpose: "Oversees recruitment, vetting, and formation of new knights joining the Order — guarding the integrity of the brotherhood.",
    responsibilities: ["Membership vetting", "Formation of new knights", "Records and continuity", "Annual investiture"],
    recentActivity: ["Inducted 42 new knights at the 2025 investiture ceremony."],
    leadership: { chair: "Sir Kt. Michael Adeyemi KSM", secretary: "Sir Kt. Peter Okafor KSM" },
    image: img3,
  },
  {
    ministry: "MINISTRY IV",
    title: "Projects &\nInfrastructure Committee",
    purpose: "Plans, executes, and reviews capital projects on behalf of the Council and parish — stewarding resources with prudence.",
    responsibilities: ["Capital project planning", "Site engineering oversight", "Procurement and finance liaison", "Project reviews"],
    recentActivity: ["Completed parish hall renovation at St. Mulumba Catholic Church, Garki."],
    leadership: { chair: "Sir Kt. Anthony Okechere KSM", secretary: "Sir Kt. Emmanuel Nnamdi KSM" },
    image: img4,
  },
];

function CommitteeCard({ c, reverse }: { c: Committee; reverse: boolean }) {
  return (
    <article className="border border-border bg-cream mt-10">
      <div className={`grid md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="aspect-[4/3] md:aspect-auto bg-muted overflow-hidden">
          <img src={c.image.src} alt={c.title.replace("\n", " ")} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-10">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight whitespace-pre-line">{c.title}</h3>

          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">PURPOSE</p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-6">{c.purpose}</p>

          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">RESPONSIBILITIES</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/80 mb-6">
            {c.responsibilities.map((r) => (
              <li key={r} className="flex items-start gap-2"><span className="text-forest">›</span><span>{r}</span></li>
            ))}
          </ul>

          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">LEADERSHIP</p>
          <p className="text-xs text-foreground/80 mb-1">Chair · {c.leadership.chair}</p>
          <p className="text-xs text-foreground/80 mb-6">Secretary · {c.leadership.secretary}</p>

          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">RECENT ACTIVITY</p>
          <ul className="space-y-1 text-xs text-foreground/70 leading-relaxed">
            {c.recentActivity.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Grid() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {committees.map((c, i) => (
          <CommitteeCard key={c.title} c={c} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}



export default function CommitteesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Our Committees"
        description="Each committee is a ministry within the Order — entrusted with a specific calling, measured not by activity but by the fruit it bears in the lives of the faithful."
      />
      <br />
      <br />
      <Grid />
    </main>
  );
}
