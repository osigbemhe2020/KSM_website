// import Title from "@/components/AboutmeComponents/title";
// import ImageCont from "@/components/AboutmeComponents/image-cont";    

// const Content = ({heading}: {heading: string}) => {
//     return(
//         <div>
//             <h2 className="font-serif text-5xl text-foreground mb-6">{heading}</h2>

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
      
//       <Title title='St. Mulumba'/>

//       {/* Main Content */}
//       <section className="w-full px-6 py-12">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Image Placeholder */}
//           <ImageCont caption='Picture of st mulumba'/>
//           <div>
//             <Content heading='About St. Mulumba'/>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

import type { Metadata } from "next";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import portrait from "@/assets/mulumba-portrait.jpg";

export const metadata: Metadata = {
  title: "About St. Mulumba — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "The Ugandan Martyr whose courage and faith inspire the identity of the Knights of St. Mulumba brotherhood.",
  openGraph: {
    title: "About St. Mulumba",
    description: "The Ugandan Martyr whose courage and faith inspire this brotherhood.",
  },
  alternates: {
    canonical: "/st.mulumba",
  },
};

function Life() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <img src={portrait.src} alt="St. Matthias Mulumba — Martyr of Uganda" loading="lazy" width={896} height={1280} className="w-full h-auto object-cover" />
          <p className="text-xs tracking-[0.2em] text-muted-foreground mt-4 uppercase">St. Matthias Mulumba — Martyr of Uganda</p>
        </div>
        <div>
          <h2 className="font-serif text-5xl text-foreground mb-6">The Life of<br />St. Matthias Mulumba</h2>
          <div className="space-y-5 text-sm leading-relaxed text-foreground/80">
            <p>St. Matthias Mulumba Kalemba (also known as Matthias Kalemba) was one of the Uganda Martyrs, a group of Catholic and Anglican converts who were executed between 1885 and 1887 on the orders of Mwanga II, the Kabaka (King) of Buganda.</p>
            <p>Matthias Mulumba was a chief and judge in the royal court. He was among the earliest converts to Catholicism in Uganda, baptised by the White Fathers missionaries. His faith was deep and unwavering, and he paid the price of that fidelity in defence of ancient Christians and witness to the Gospel.</p>
            <p>When King Mwanga II launched a violent persecution against Christians, Matthias refused to renounce his faith. He was arrested, brutally tortured, and clamoured a slow, agonizing death. On May 30, 1886, his death was particularly grievous — he was dismembered and left to die alone — yet he bore his suffering with extraordinary faith and forgiveness.</p>
            <p>He was beatified by Pope Benedict XV in 1920 and canonized by Pope Paul VI on October 18, 1964, along with 21 other Uganda Martyrs. Their feast day is celebrated on June 3rd.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="bg-forest text-cream py-20 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-serif italic text-3xl md:text-4xl leading-snug">
          “A faith worth living is a faith worth dying for.”
        </p>
        <p className="text-xs tracking-[0.3em] mt-6 opacity-80">— THE UGANDA MARTYRS</p>
      </div>
    </section>
  );
}

function Legacy() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        <div>
          <h3 className="font-serif text-3xl text-foreground mb-5">Significance to the Order</h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            The Knights of St. Mulumba take their name and inspiration from this courageous martyr. His life embodies the core values of the Order — unwavering faith, sacrificial service, and courage in the face of adversity. The Order encourages every Knight to aspire to a life of faith who deals with integrity, serves with compassion, and stands firm in his convictions regardless of the cost.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-3xl text-foreground mb-5">His Lasting Legacy</h3>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex gap-3"><span className="text-forest mt-1">◆</span>Model of courageous faith under persecution</li>
            <li className="flex gap-3"><span className="text-forest mt-1">◆</span>Patron and spiritual guide of the Order</li>
            <li className="flex gap-3"><span className="text-forest mt-1">◆</span>Canonized saint of the universal Catholic Church</li>
            <li className="flex gap-3"><span className="text-forest mt-1">◆</span>Symbol of African Christianity's deep roots</li>
            <li className="flex gap-3"><span className="text-forest mt-1">◆</span>Inspiration for charitable service and sacrifice</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function AboutMulumbaPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="About St. Mulumba"
        description="The Ugandan Martyr whose courage and faith inspire the identity of this brotherhood."
      />
      <Life />
      <Quote />
      <Legacy />
    </main>
  );
}
