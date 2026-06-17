import { ArrowRight } from "lucide-react";
import newsOutreach from "@/assets/news-outreach.jpg";
import newsHonored from "@/assets/news-honored.jpg";
import newsSub from "@/assets/news-subcouncil.jpg";

const news = [
  { img: newsOutreach, date: "28 FEB 2026", t: "Metro Council Outreach Reaches 500 Families", d: "The annual medical outreach programme provided free consultations, medications, and health screenings to communities in Kuje and Gwagwalada." },
  { img: newsHonored, date: "14 FEB 2026", t: "Knights Honoured at National Convention", d: "Five members of the Metro Council received distinguished service awards at the KSM National Convention held in Lagos." },
  { img: newsSub, date: "02 FEB 2026", t: "New Sub-Council Inaugurated in Lugbe", d: "The Order continues to expand its reach with the inauguration of a new sub-council serving Catholic faithful in the Lugbe corridor." },
];

function NewsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl">News & Updates</h2>
          <p className="mt-4 text-muted-foreground">Stay informed about the latest from the Metro Council.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n) => (
            <article key={n.t} className="bg-background border border-border p-5">
              <div className="text-xs text-muted-foreground tracking-wider mb-2">{n.date}</div>
              <h3 className="font-serif text-xl mb-4 leading-snug">{n.t}</h3>
              <div className="aspect-[4/3] overflow-hidden mb-4">
                <img src={n.img.src} alt={n.t} loading="lazy" width={800} height={600} className="h-full w-full object-cover" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{n.d}</p>
              <a href="#" className="flex items-center gap-2">Learn More <ArrowRight /></a>
            </article>
          ))}
        </div>
        <div className="text-center mt-14">
          <a href="#" className="bg-forest text-white px-6 py-3 rounded font-semibold hover:bg-green-800 transition inline-flex items-center">Read Our News and Updates <span className="ml-2"><ArrowRight /></span></a>
        </div>
      </div>
    </section>
  );
}

//const NewsSection = () => {
//   const news = [
//     {
//       date: '1st november 2025',
//       title: 'winning of the holy cup',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
//     },
//     {
//       date: '1st november 2025',
//       title: 'winning of the holy cup',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
//     },
//     {
//       date: '1st november 2025',
//       title: 'winning of the holy cup',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
//     }
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-12">News & updates</h2>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {news.map((item, idx) => (
//             <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
//               <div className="h-48  bg-gradient-to-br from-gray-300 to-gray-400"></div>
//               <div className="p-6">
//                 <p className="text-green-700 text-sm font-semibold mb-2">{item.date}</p>
//                 <h3 className="font-bold text-lg mb-3">{item.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4">{item.description}</p>
//                 <button className="text-green-700 font-semibold hover:text-green-800 transition">
//                   READ ALL
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
//};

export default NewsSection;

