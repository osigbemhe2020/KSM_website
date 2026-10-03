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
import { client } from "@/sanity/lib/client";
import { staticPageBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";

export default async function JoinUs() {
  const pageData = await client.fetch(staticPageBySlugQuery, { slug: 'how-to-join' });

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
        title={pageData?.title || "Join Us"}
        description={pageData?.description || "Experience God's Love through purposeful and spiritually enriched lives"}
      />
      {/* Intro */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto ">
        <div className="text-center">
          <h2 className="font-serif text-5xl text-foreground mb-6">
            Join a Brotherhood of Faith, Service, and Leadership
          </h2>
          <div className="space-y-4">
            {pageData?.body ? (
              <PortableText value={pageData.body} />
            ) : (
              <p className="font-serif text-[16px]  text-foreground/90 leading-snug">
                The Knights of St. Mulumba is a premier Catholic fraternal organization for men committed to living out their faith through active service and unwavering leadership. We are bound together by a shared devotion to the Church and a mutual desire to support one another in our spiritual journeys.
              </p>
            )}
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

      {/* Eligibility Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl text-foreground mb-6">
          Eligibility Requirements
        </h2>
        <div className="bg-forest/5 border border-forest/20 rounded-lg p-8">
          <div className="space-y-6">
            {[
              { icon: Cross, title: "Practicing Catholic", desc: "Must be a baptized, confirmed Catholic man in good standing with regular sacramental participation." },
              { icon: Heart, title: "Sacramental Marriage", desc: "If married, must be validly married in accordance with Catholic Church rites (Holy Matrimony). His spouse joins the LSM." },
              { icon: Shield, title: "Moral Character", desc: "Must possess high moral standing, completely free from secret cults or anti-Catholic organizations." },
              { icon: Church, title: "Parish Recommendation", desc: "Must be an active parishioner (e.g., active in CMO) and recommended by his Parish Priest." },
              { icon: Star, title: "Financial Stability", desc: "Must be gainfully employed or practicing a recognized profession with capability to meet dues and charitable pledges." },
            ].map((req, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0">
                  <req.icon className="w-6 h-6 text-forest" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-1">{req.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path to Membership */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl text-foreground mb-6">
          Step-by-Step Pathway to Knighthood
        </h2>
        <div className="space-y-8">
          {[
            { num: "01", title: "Sponsorship", desc: "Nomination by two active Knights in good standing from a local Sub-Council." },
            { num: "02", title: "Application", desc: "Submission of baptismal certificate, marriage certificate, and confidential Parish Priest clearance." },
            { num: "03", title: "Interview", desc: "Formal screening by the Sub-Council Membership Committee involving both candidate and spouse." },
            { num: "04", title: "Secret Balloting", desc: "Approval by existing members through Sub-Council secret balloting." },
            { num: "05", title: "Postulancy", desc: "Probationary formation period on Catholic doctrine and KSM statutes." },
            { num: "06", title: "Investiture", desc: "Formal initiation into the 1st Degree of Knighthood (husband as Knight, wife as LSM)." },
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
