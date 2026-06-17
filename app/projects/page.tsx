// import Link  from "next/link";
// import { ArrowRight } from "lucide-react";

// type ProjectProps = {
//     title: string;
//     description: string;
// }

//  const ProjectCard = ({title,description}: ProjectProps) => {
//   return (
//     <div  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
//        <div className="h-48 relative bg-gradient-to-br from-gray-300 to-gray-400">
//          <div className="absolute top-4 right-4">
//           <span className="inline-block bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
//             category
//           </span>
//          </div>
//        </div>
//         <div className="p-6">
//                 <h3 className="font-bold text-lg mb-2">{title}</h3>
//                 <p className="text-gray-600 text-sm">{description}</p>
//         </div>
//         <Link href="/details" className=" p-0 ml-4 mb-4 h-auto flex items-center font-semibold">
//           <span>Learn More </span>
//           <ArrowRight className="ml-2 h-4 w-4" />
//         </Link>
//      </div>
//   )
// }


// const ProjectPage = () => {
//   return (
//     <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl text-center font-bold text-black mb-2">Our Projects</h2>
//         <p className="text-center text-black font-semibold mb-8">Our projects are a reflection of our commitment to God and His Church. We believe that through our projects, we can make a positive impact on the lives of those around us.</p>
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mb-8">
//         <ProjectCard title="Project 1" description="Description of project 1" />
//         <ProjectCard title="Project 2" description="Description of project 2" />
//         <ProjectCard title="Project 3" description="Description of project 3" />
//         <ProjectCard title="Project 4" description="Description of project 4" />
//         <ProjectCard title="Project 5" description="Description of project 5" />
//         <ProjectCard title="Project 6" description="Description of project 6" />
//      </div>
//      <div className="bg-green-700 text-white p-8 rounded-lg text-center">
//           <h3 className="text-2xl font-bold mb-4">Support our projects</h3>
//           <p className="mb-6 max-w-2xl mx-auto">
//             your donations will help us continue our projects which is part of our service to God and His Church.
//           </p>
//           <button className="bg-white text-green-700 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
//             Donate
//           </button>
//         </div>
//     </div>
//   )
// }


// export default ProjectPage

import { StaticImageData } from "next/image";
import Link from "next/link";
import pHall from "@/assets/project-hall.jpg";
import pClinic from "@/assets/project-clinic.jpg";
import pScholarship from "@/assets/project-scholarship.jpg";
import pBorehole from "@/assets/project-borehole.jpg";
import pSkills from "@/assets/project-skills.jpg";
import pCathedral from "@/assets/project-cathedral.jpg";

// export const Route = createFileRoute("/projects-infrastructure")({
//   head: () => ({
//     meta: [
//       { title: "Projects & Infrastructure — Knights of St. Mulumba, Metro Council Abuja" },
//       { name: "description", content: "Building lasting impact through meaningful development initiatives across the Abuja metropolis." },
//       { property: "og:title", content: "Projects & Infrastructure — Knights of St. Mulumba" },
//       { property: "og:description", content: "Development initiatives across the Abuja metropolis." },
//     ],
//     links: [{ rel: "canonical", href: "/projects-infrastructure" }],
//   }),
//   component: ProjectsPage,
// });




type Status = "COMPLETED" | "ONGOING" | "UPCOMING";
const projects: { img: StaticImageData; slug: string; t: string; d: string; s: Status }[] = [
  { img: pHall, slug: "st-joseph-parish-hall-renovation", t: "St. Joseph Parish Hall Renovation", d: "Complete renovation and expansion of the parish hall to serve as a multi-purpose facility for church and community events.", s: "COMPLETED" },
  { img: pClinic, slug: "community-health-centre-gwagwalada", t: "Community Health Centre, Gwagwalada", d: "Construction of a primary health centre providing free and subsidized healthcare services to underserved communities.", s: "ONGOING" },
  { img: pScholarship, slug: "scholarship-endowment-fund-facility", t: "Scholarship Endowment Fund Facility", d: "Establishment of a dedicated facility to manage and administer the Order's scholarship programs for indigent students.", s: "ONGOING" },
  { img: pBorehole, slug: "water-borehole-project-kuje", t: "Water Borehole Project, Kuje", d: "Drilling and installation of a community borehole providing clean, safe drinking water to a rural community in Kuje.", s: "COMPLETED" },
  { img: pSkills, slug: "youth-skills-acquisition-centre", t: "Youth Skills Acquisition Centre", d: "A vocational training facility equipping young people with marketable skills in trades, technology, and entrepreneurship.", s: "UPCOMING" },
  { img: pCathedral, slug: "cathedral-beautification-project", t: "Cathedral Beautification Project", d: "Ongoing support for the beautification and structural enhancement of the Pro-Cathedral grounds and surrounding facilities.", s: "ONGOING" },
];

function StatusPill({ s }: { s: Status }) {
  const cls = s === "COMPLETED" ? "bg-forest text-white" : "border border-border text-foreground/70";
  return <span className={`inline-block text-[10px] tracking-[0.18em] px-3 py-1 ${cls}`}>{s}</span>;
}

function Grid() {
  return (
    <section className="bg-cream "
      style={{ marginTop: "60px", marginBottom: "40px" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <Link href={`/projects/${p.slug}`} key={p.t}>
              <article className="border border-border bg-cream flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.img.src} alt={p.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-lg mb-2 leading-snug">{p.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{p.d}</p>
                  <StatusPill s={p.s} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Grid />
    </main>
  );
}
