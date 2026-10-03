import { ArrowRight } from "lucide-react";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  hero?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
  isFeatured?: boolean;
};

const OurProjectsSection = async () => {
  const projects = await client.fetch<Project[]>(projectsQuery);
  
  // Filter for featured projects, or take first 3 if no featured flag exists
  const featuredProjects = projects
    .filter((p) => p.isFeatured)
    .slice(0, 3);
  
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl">Our Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Building lasting impact through purposeful, faith-driven initiatives.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {displayProjects.map((p) => (
            <article key={p._id}>
              <div className="aspect-[4/3] overflow-hidden mb-5 relative">
                {p.hero?.asset?.url && (
                  <Image
                    src={p.hero.asset.url}
                    alt={p.hero.asset.altText || p.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <h3 className="font-serif text-2xl mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <Link href={`/projects/${p.slug.current}`} className="flex items-center gap-2">Learn More <ArrowRight /></Link>
            </article>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button
            href="/projects"
            className="inline-flex px-6 rounded hover:bg-green-800 w-auto mt-0"
          >
            View Our Projects <span className="ml-2"><ArrowRight /></span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurProjectsSection;

// const OurProjectsSection = () => {
//   const projects = [
//     {
//       title: 'Youth empowerment',
//       description: 'Support free skills IT skills development'
//     },
//     {
//       title: 'Construction of st.Rita Parish',
//       description: 'contributing the biggest church in the whole lord of...'
//     }
//   ];

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Projects</h2>

//         <div className="grid md:grid-cols-2 gap-8 mb-8">
//           {projects.map((project, idx) => (
//             <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
//               <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
//               <div className="p-6">
//                 <h3 className="font-bold text-lg mb-2">{project.title}</h3>
//                 <p className="text-gray-600 text-sm">{project.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-green-700 text-white p-8 rounded-lg text-center">
//           <h3 className="text-2xl font-bold mb-4">Support our projects</h3>
//           <p className="mb-6 max-w-2xl mx-auto">
//             your donations will help us continue our projects which is part of our service to God and His Church.
//           </p>
//           <button className="bg-white text-green-700 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
//             Donate
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

