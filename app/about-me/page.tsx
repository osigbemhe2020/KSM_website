import type { Metadata } from "next";
import skyImg from "@/assets/history-sky.jpg";
import sketchImg from "@/assets/cathedral-sketch.png";
import legacy1 from "@/assets/legacy-1.jpg";
import legacy2 from "@/assets/legacy-2.jpg";
import legacy3 from "@/assets/legacy-3.jpg";

export const metadata: Metadata = {
  title: "Our History — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "A legacy of faith, service, and brotherhood spanning over seven decades — the history of the Knights of St. Mulumba in Nigeria.",
  openGraph: {
    title: "Our History — Knights of St. Mulumba",
    description: "Seven decades of faith, service, and brotherhood.",
  },
};



function HistoryHero() {
  return (
    <section className="relative h-[340px] w-full overflow-hidden">
      <img src={skyImg.src} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={768} />
      <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-cream/30" />
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">
        <h1 className="font-serif text-5xl md:text-7xl text-foreground text-right md:pr-10">Our History</h1>
        <p className="font-serif text-2xl md:text-3xl text-foreground/90 max-w-md leading-snug">
          A legacy of faith, service, and brotherhood spanning over seven decades.
        </p>
      </div>
    </section>
  );
}

const timeline = [
  { year: "1953", title: "The Founding", body: "The Knights of St. Mulumba was founded in Nigeria, establishing a Catholic fraternal Order rooted in faith, charity, and patriotism. Inspired by the Uganda Martyrs, the founding fathers envisioned a brotherhood dedicated to serving the Church and nation." },
  { year: "1960s", title: "Growth & Expansion", body: "The Order expanded rapidly across Nigeria with new councils established in major cities. Membership grew as Catholic men rallied around the values of unity, fraternity, and service to humanity." },
  { year: "1970s", title: "Post-War Reconstruction", body: "After the Nigerian Civil War, the Knights played a crucial role in reconciliation and reconstruction efforts, providing relief materials, supporting displaced families, and rebuilding parish communities." },
  { year: "1980s", title: "Institutional Maturity", body: "The Order formalized its organizational structure, establishing Metro Councils and strengthening governance. The Abuja Metro Council was constituted to coordinate sub-councils in the Federal Capital Territory." },
  { year: "1990s", title: "National Influence", body: "The Knights became a leading voice in Catholic advocacy, education, and social development, partnering with the hierarchy of the Church to advance moral leadership in public life." },
  { year: "2000s", title: "Charity & Outreach", body: "Major charitable initiatives took shape — scholarships, medical missions, and support for vulnerable communities — extending the Order's witness across the nation." },
  { year: "2010s", title: "Modern Era", body: "Sub-councils proliferated across the FCT and beyond. Strategic partnerships, member welfare programmes, and youth formation became cornerstones of the Order's modern identity." },
  { year: "2020s", title: "Digital Transformation", body: "Embracing modern tools for communication, record-keeping, and member engagement while preserving the timeless values and traditions that define the Order." },
];

function Timeline() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="font-serif text-6xl md:text-7xl text-forest mb-6">1953</div>
          <p className="font-serif text-xl md:text-2xl text-foreground italic max-w-md mx-auto leading-snug">
            "Founded on the principles of Charity, Unity, Fraternity, and Patriotism."
          </p>
        </div>
        <div className="relative pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-2 bottom-2 w-px bg-forest/30" />
          {timeline.map((t) => (
            <div key={t.year} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[26px] md:-left-[42px] top-1.5 h-3 w-3 rounded-full border-2 border-forest bg-cream" />
              <div className="text-forest font-serif text-lg mb-1">{t.year}</div>
              <h3 className="font-serif text-3xl mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Legacy() {
  return (
    <section className="bg-forest text-white">
      <div className="relative max-w-7xl mx-auto px-6 md:px-14 py-20 md:py-28 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-10">Become Part of a<br />Living Legacy.</h2>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[legacy1, legacy2, legacy3].map((src, i) => (
                <div key={i} className="aspect-[3/5] overflow-hidden">
                  <img src={src.src} alt="" loading="lazy" width={512} height={800} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-10">
            <p className="text-white/90 leading-relaxed mb-8 max-w-sm">
              Join a brotherhood rooted in faith, dedicated to service, and committed to building a stronger Church and nation.
            </p>
            <a href="#" className="btn-outline">Begin Your Journey</a>
          </div>
        </div>
        <img src={sketchImg.src} alt="" aria-hidden className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[110%] opacity-15 pointer-events-none" />
      </div>
    </section>
  );
}

export default function HistoryPage() {
  return (
    <main>
      <HistoryHero />
      <Timeline />
      <Legacy />
    </main>
  );
}

// import Title from "@/components/AboutmeComponents/title";
// import ImageCont from "@/components/AboutmeComponents/image-cont";    

// const Content = ({heading}: {heading: string}) => {
//     return(
//         <div>
//             <h2 className="text-3xl font-bold text-black mb-7">{heading}</h2>

//             <div className="space-y-4 text-base leading-relaxed text-black">
//               <p>
//                 The Order of the Knights of St. Mulumba (KSM) was established in Nigeria on June 14, 1953 by Late
//                 Reverend Father Abraham Njemeh Isidahome Ojefua, a Priest and Monk from Ifiiah Monastery in present day
//                 Delta state and modelled after the Sacred Order of Catholic Knighthood. It has a current membership of
//                 over 20,000 (both male and female)
//               </p>

//               <p>
//                 The vision of the organization was initiated on June 7, 1952 at the instance of the Holy father who had
//                 a mystic encounter in his prayer time, for the establishment of a catholic vibrant organization in
//                 Nigeria in 2004
//               </p>
//             </div>
//           </div>
//     )
// }
// export default function Home() {

//   return (
//     <main className="w-full py-10 bg-white">
      
//       <Title title='History'/>

//       {/* Main Content */}
//       <section className="w-full px-6 py-12">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Image Placeholder */}
//           <ImageCont caption='Picture of Father Ojefua'/>
//           <div>
//             <Content heading='History'/>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }
