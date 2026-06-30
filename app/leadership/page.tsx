
// const Profile = () => {
//     return (
//         <div className="mb-10">
//             <div className="relative">
//             <div className="bg-gray-300 max-w-[500px] rounded-lg overflow-hidden h-80">
//               <div className="w-full  h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
//             </div>
//             <div className="absolute -bottom-4 -right-2 bg-green-700 text-white p-4 rounded-lg shadow-lg">
//               <p className="font-bold text-lg">Sir Johnson Jimoh</p>
//               <p className="text-sm text-green-100">Metro Grand Knight</p>
//             </div>
//           </div>
//         </div>
//     )
// }

// const Leadership = () => {
//     return (
//         <main className="py-10 px-6">
//             <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Our Leadership</h2>
//             <p className="text-[16px] p-4 text-center font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
//                 <Profile/>
//                 <Profile/>
//                 <Profile/>
//                 <Profile/>
//                 <Profile/>
//                 <Profile/>
//             </div>
//         </main>
//     )
// }

// export default Leadership

import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import ProfileCard from "@/components/ProfileCard";
import Link from 'next/link'



const grandKnight = {
  img: leader1,
  rolePill: "WORTHY METROPOLITAN GRAND KNIGHT",
  name: "Sir Kt. Anthony O. Okechere",
  served: "Serving since 17 October 2022",
  bio: "A servant-leader on the way, with quiet candor and steady ministry, the Worthy Metropolitan Grand Knight guides our Council in faith, fellowship, and works of mercy.",
};

const stewards = [
  { img: leader2, role: "WORTHY METROPOLITAN DEPUTY GRAND KNIGHT", name: "Sir Kt. Emmanuel C. Okafor", served: "Serving since 2022", bio: "A trusted second-in-command, coordinating Council programs and supporting the Worthy Metropolitan Grand Knight in pastoral duty." },
  { img: leader3, role: "METROPOLITAN CHANCELLOR", name: "Sir Kt. Peter Joseph A. Adekunle", served: "Serving since 2022", bio: "Keeper of records and continuity, ensuring the formation, formation and minutes of the Council are duly preserved." },
  { img: leader1, role: "METROPOLITAN TREASURER", name: "Sir Kt. Peter N. Eze", served: "Serving since 2022", bio: "Steward of the Council's finances; oversees dues, projects and accountability with prudence and transparency." },
  { img: leader2, role: "METROPOLITAN FINANCIAL SECRETARY", name: "Sir Kt. Michael O. Adeyemi", served: "Serving since 2022", bio: "Maintains member records and remittances, working closely with the Treasurer to ensure orderly stewardship." },
];

function GrandKnight() {
  return (
    <section className="bg-cream pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">LEADERSHIP SPOTLIGHT</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Metropolitan Grand Knight</h2>
        <Link href={`/leadership/slugplaceholder`}>
          <article className="border border-border bg-cream/60 p-5 text-left max-w-sm mx-auto">
            <div className="aspect-square bg-muted overflow-hidden mb-5">
              <img src={grandKnight.img.src} alt={grandKnight.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
            <p className="text-[9px] tracking-[0.25em] text-muted-foreground mb-2">{grandKnight.rolePill}</p>
            <h3 className="font-serif text-xl text-foreground leading-tight mb-1">{grandKnight.name}</h3>
            <p className="text-[11px] tracking-wide text-muted-foreground mb-3">{grandKnight.served}</p>
            <p className="text-xs text-foreground/70 leading-relaxed mb-5">{grandKnight.bio}</p>
            <button className="text-[10px] tracking-[0.2em] px-4 py-2 border border-border hover:border-forest hover:text-forest transition-colors">
              VIEW FULL PROFILE
            </button>
          </article>
        </Link>
      </div>
    </section>
  );
}

function Stewards() {
  return (
    <section className="bg-cream pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">THE COUNCIL OFFICERS</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">Stewards of the Order</h2>
        <p className="text-sm text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Each officer brings particular gifts to the service of the Council, supporting the Worthy Metropolitan Grand Knight in shepherding our brotherhood.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stewards.map((s) => (
            <Link key={s.name} href={`/leadership/slugplaceholder`}>
              <ProfileCard
                key={s.name}
                imageSrc={s.img.src}
                roleNode={s.role}
                name={s.name}
                subtitle={s.served}
                description={s.bio}
                buttonText="VIEW FULL PROFILE"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
const pillars = [
  { icon: "✚", title: "Faith", body: "Anchored in the Catholic tradition, our governance begins and ends in prayer." },
  { icon: "⚖", title: "Integrity", body: "Decisions weighed in honesty, transparency and reverence for the Order." },
  { icon: "♣", title: "Brotherhood", body: "A communion of men united in service, formation and mutual support." },
  { icon: "❦", title: "Accountability", body: "Stewardship that honours the trust of the Church and our members." },
];

function Pillars() {
  return (
    <section className="bg-cream pb-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">LEADERSHIP SPOTLIGHT</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">The Pillars of Our Council</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {pillars.map((p) => (
            <div key={p.title}>
              <div className="text-forest text-3xl mb-4" aria-hidden>{p.icon}</div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-cream">
      <WhoWeAreHero
        title="Leadership"
        description="A clear hierarchy built on service, accountability, and shared purpose."
      />
      <GrandKnight />
      <Stewards />
      <Pillars />
    </main>
  );
}
