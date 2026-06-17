import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import cathedral from "@/assets/vision-cathedral.jpg";
import outreach from "@/assets/vision-outreach.jpg"

function Vision() {
  return (
    <section className="bg-cream pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img src={cathedral.src} alt="Knights gathered in cathedral" loading="lazy" width={1280} height={896} className="w-full h-[300px] md:h-[360px] object-cover" />
          <img src={outreach.src} alt="Community outreach distribution" loading="lazy" width={1280} height={896} className="w-full h-[300px] md:h-[360px] object-cover" />
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="font-serif text-5xl text-foreground mb-6">Vision</h2>
          <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-snug italic">
            “To be the foremost Catholic fraternal organization in Nigeria — a beacon of faith, charity, and brotherhood that transforms lives and communities for the glory of God.”
          </p>
        </div>
      </div>
    </section>
  );
}

const pillars = [
  { icon: "♥", title: "Charity", sub: "& Compassion", body: "To extend God's love through organized charitable works, welfare programs, and compassionate outreach to the vulnerable and marginalized." },
  { icon: "⚐", title: "Brotherhood", sub: "& Unity", body: "To foster deep fraternal bonds among Catholic men, providing a supportive community built on mutual respect, accountability, and shared faith." },
  { icon: "✦", title: "Faith", sub: "Formation", body: "To deepen members' spiritual lives through prayer, retreats, study of Church teachings, and active participation in the sacramental life of the Church." },
  { icon: "✜", title: "Community", sub: "Development", body: "To initiate and sustain projects that create lasting impact — from educational scholarships to healthcare outreach and infrastructure development." },
];

function Mission() {
  return (
    <section className="bg-cream pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-5xl text-foreground text-center mb-16">Our Mission</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map((p) => (
            <div key={p.title}>
              <div className="text-forest text-3xl mb-4" aria-hidden>{p.icon}</div>
              <h3 className="font-serif text-2xl text-foreground leading-tight">
                {p.title}<br />{p.sub}
              </h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero title="Our Mission" description="To be the foremost Catholic fraternal organization in Nigeria — a beacon of faith, charity, and brotherhood that transforms lives and communities for the glory of God." />
      <Vision />
      <Mission />
    </main>
  );
}

export default VisionPage;

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
      
//       <Title title='Our Mission'/>

//       {/* Main Content */}
//       <section className="w-full px-6 py-12">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Image Placeholder */}
//           <ImageCont caption='Picture of the church'/>
//           <div>
//             <Content heading='Our Mission'/>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }
