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

//       <Title title='How to Join'/>

//       {/* Main Content */}
//       <section className="w-full px-6 py-12">
//         <div className="max-w-4xl mx-auto">

//           {/* Image Placeholder */}
//           <ImageCont caption='Members of the knight of st mulumba '/>
//           <div>
//             <Content heading='How to Join'/>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

import { Cross, Users, Star, Heart, Globe, BookOpen, Shield, Church } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import InterestForm from "@/components/forms/InterestForm";


export default function JoinUs() {
  const cards = [
    { title: "Spiritual Growth", icon: Cross, desc: "Deepen your faith through regular prayer, sacraments, and spiritual retreats" },
    { title: "Brotherhood & Networking", icon: Users, desc: "Build lasting friendships with like-minded Catholic men" },
    { title: "Leadership Development", icon: Star, desc: "Develop skills to lead in your parish and community" },
    { title: "Family Support", icon: Heart, desc: "Programs that strengthen and support your family life" },
    { title: "Community Opportunities", icon: Globe, desc: "Engage in community service and outreach programs" },
    { title: "Educational Initiatives", icon: BookOpen, desc: "Access to educational resources and scholarships" },
    { title: "Welfare Services", icon: Shield, desc: "Mutual aid and support for members and their families" },
    { title: "Faith Formation", icon: Church, desc: "Regular faith formation programs and retreats" },
  ];

  return (
    <div className="w-full">
      {/* Hero */}

      <WhoWeAreHero
        title="Join Us"
        description="Experience God's Love through purposeful and spiritually enriched lives"
      />
      {/* Intro */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto ">
        <div className="text-center">
          <h2 className="font-serif text-5xl text-foreground mb-6">
            Join a Brotherhood of Faith, Service, and Leadership
          </h2>
          <div className="space-y-4">
            <p className="font-serif text-[16px]  text-foreground/90 leading-snug">
              The Knights of St. Mulumba is a premier Catholic fraternal organization for men committed to living out their faith through active service and unwavering leadership. We are bound together by a shared devotion to the Church and a mutual desire to support one another in our spiritual journeys.
            </p>

          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-secondary/30 px-4 sm:px-6 lg:px-8">
        <div className="">
          <h2 className="font-serif text-5xl text-foreground mb-6">
            Why Join the Knights of St. Mulumba?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <div key={i} className="p-6 rounded-lg shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                <card.icon className="w-8 h-8 text-forest mb-10" />
                <h3 className="font-serif text-xl font-bold text-forest mb-2">{card.title}</h3>
                <p className="text-sm text-foreground/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path to Membership */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl text-foreground mb-6">
          The Path to Membership
        </h2>
        <div className="space-y-8">
          {[
            { num: "01", title: "Submit Your Interest", desc: "Complete the expression of interest form below" },
            { num: "02", title: "Initial Contact", desc: "Our membership coordinator will contact you within 5 business days" },
            { num: "03", title: "Attend Local Info Council", desc: "Visit your local Knights council to learn more about our mission" },
            { num: "04", title: "Membership Assessment", desc: "Complete a brief assessment with the membership committee" },
            { num: "05", title: "Formation & Initiation", desc: "Complete the formation program and be formally initiated" },
          ].map((step, i, arr) => (
            <div key={i} className="flex gap-6 relative">
              {i !== arr.length - 1 && (
                <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-forest"></div>
              )}
              <div className="text-forest font-serif font-bold text-4xl shrink-0 w-12">{step.num}</div>
              <div className="pt-2">
                <h3 className="font-serif text-xl font-bold text-forest mb-1">{step.title}</h3>
                <p className="text-forest/70">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <InterestForm 
        title="Express Your Interest"
        subtitle="Take the first step towards becoming a Knight of St. Mulumba"
        buttonText="Join the Brotherhood"
        showParish={true}
        showAgeGroup={false}
      />
    </div>
  );
}
