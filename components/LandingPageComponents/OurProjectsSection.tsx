import { ArrowRight } from "lucide-react";
import projFood from "@/assets/project-food.jpg";
import projSchool from "@/assets/project-school.jpg";
import projYouth from "@/assets/project-youth.jpg";

const projects = [
  { img: projFood, t: "FCT Food Relief Programme", d: "Providing essential food items to over 2,000 families across underserved communities in the Federal Capital Territory." },
  { img: projSchool, t: "St. Mulumba Model School", d: "Construction of a modern primary school facility to serve children in rural Abuja communities." },
  { img: projYouth, t: "Youth Mentorship Initiative", d: "A structured programme equipping young Catholics with leadership skills, career guidance, and spiritual formation." },
];

function OurProjectsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl">Our Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Building lasting impact through purposeful, faith-driven initiatives.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article key={p.t}>
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <img src={p.img.src} alt={p.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-serif text-2xl mb-3">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.d}</p>
              <a href="#" className="flex items-center gap-2">Learn More <ArrowRight /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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

export default OurProjectsSection;