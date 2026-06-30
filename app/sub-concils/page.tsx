// type SubConcilProps = {
//     gkname: string;
//     year: number;
//     description: string;
//     email: string;
// }

// const SubConcil = ({gkname, year, description, email}: SubConcilProps) => {
//     return(
//         <div className="border-b border-gray-200 py-6">
//         <div className="grid grid-cols-[30%_65%] gap-[5%]  px-10 max-w-[1200px] items-center mx-auto justify-between">
//             <div className="relative">
//             <div className="bg-gray-300 rounded-lg overflow-hidden w-full max-h-[250px] aspect-square">
//               <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
//             </div>
//             <div className="absolute -bottom-4 -right-4 bg-green-700 text-white p-2 rounded-lg shadow-lg">
//               <p className="font-bold text-lg">{gkname}</p>
//               <p className="text-sm text-green-100"> Grand Knight</p>
//             </div>
//           </div>
//             <div className="px-5">
//                 <div className="flex items-center mb-4 justify-between">
//                     <h1 className="text-xl font-bold">St Rita Sub Concil</h1>
//                     <p className="text-[16px] font-semibold"> Year of inuagration: {year}</p>
//                 </div>
//                 <div>
//                     <p className="text-[14px]">
//                         {description}
//                     </p>
//                 </div>
//                 <div >
//                     <h2 className="font-serif text-5xl text-foreground mb-6">email: {email}</h2>
//                 </div>
//             </div>
//         </div>
//         </div>
//     )
// }

// const SubConcils = () => {
//     return (
//         <main className="py-8">
//             <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">Sub Concils</h1>
//             <p className="text-black text-center text-[16px] font-semibold mb-6">Here are the sub concils of the KSM metro</p>
//             <SubConcil
//              gkname="Sir Cyril Ole" 
//              year={2018} 
//              description="Lorem ipsum dolor sit amet, consectetur
//               adipiscing elit, sed do eiusmod tempor incididunt ut l
//               abore et dolore magna aliqua. Ut enim ad minim veniam, q
//               uis nostrud exercitation ullamco laboris nisi ut aliquip 
//               ex ea commodo consequat." 
//               email="strita@ksm.org" 
//               />
//               <SubConcil
//              gkname="Sir Cyril Ole"
//              year={2018} 
//              description="Lorem ipsum dolor sit amet, consectetur
//               adipiscing elit, sed do eiusmod tempor incididunt ut l
//               abore et dolore magna aliqua. Ut enim ad minim veniam, q
//               uis nostrud exercitation ullamco laboris nisi ut aliquip 
//               ex ea commodo consequat." 
//               email="strita@ksm.org" 
//               />
//               <SubConcil
//              gkname="Sir Cyril Ole" 
//              year={2018} 
//              description="Lorem ipsum dolor sit amet, consectetur
//               adipiscing elit, sed do eiusmod tempor incididunt ut l
//               abore et dolore magna aliqua. Ut enim ad minim veniam, q
//               uis nostrud exercitation ullamco laboris nisi ut aliquip 
//               ex ea commodo consequat." 
//               email="strita@ksm.org" 
//               />
//               <SubConcil
//              gkname="Sir Cyril Ole" 
//              year={2018} 
//              description="Lorem ipsum dolor sit amet, consectetur
//               adipiscing elit, sed do eiusmod tempor incididunt ut l
//               abore et dolore magna aliqua. Ut enim ad minim veniam, q
//               uis nostrud exercitation ullamco laboris nisi ut aliquip 
//               ex ea commodo consequat." 
//               email="strita@ksm.org" 
//               />
//         </main>
//     )
// }

// export default SubConcils

"use client";

import React, { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import ProfileCard from "@/components/ProfileCard";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";

const placeholders = [leader1.src, leader2.src, leader3.src];

const regions = ["ALL", "CENTRAL", "NORTH", "SOUTH", "EAST"] as const;
type Region = (typeof regions)[number];

const subCouncils = [
    {
        name: "St. Mulumba Sub-Council No. 1",
        location: "Abuja, FCT",
        region: "CENTRAL",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
    {
        name: "Blessed Iwene Tansi Sub-Council",
        location: "Abuja, FCT",
        region: "CENTRAL",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
    {
        name: "Our Lady of Fatima Sub-Council",
        location: "National, Abuja",
        region: "CENTRAL",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
    {
        name: "St. Charles Lwanga Sub-Council",
        location: "Lagos, Lagos",
        region: "SOUTH",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
    {
        name: "Holy Rosary Sub-Council",
        location: "Kano, Kano",
        region: "NORTH",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
    {
        name: "St. Theresa Sub-Council",
        location: "Enugu, Enugu",
        region: "EAST",
        desc: "The founding chapter of the Order in the FCT. St. Mulumba No. 1 has been the cornerstone of Catholic fraternal service in Abuja for over two decades.",
    },
];

const stats = [
    { value: "12", label: "Sub-Councils" },
    { value: "450+", label: "Active Members" },
    { value: "40+", label: "Years of Service" },
    { value: "200+", label: "Community Projects" },
    { value: "30+", label: "Charity Initiatives" },
    { value: "15+", label: "Youth Programmes" },
];

export default function SubCouncils() {
    const [activeRegion, setActiveRegion] = useState<Region>("ALL");

    const filtered = subCouncils.filter(
        (sc) => activeRegion === "ALL" || sc.region === activeRegion
    );

    return (
        <div className="w-full">
            {/* Hero */}
            <WhoWeAreHero
                title="Sub-Councils"
                description="United by faith, strengthened through brotherhood, and committed to serving our communities."
            />
            {/* A Brotherhood Across Communities */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            The Brotherhood
                        </p>
                        <h2 className="font-serif text-5xl text-foreground mb-6">
                            A Brotherhood<br />Across<br />Communities
                        </h2>
                        <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-snug italic">
                            "Each Sub-Council is a living expression of the Order's mission — a place where Catholic men are formed, supported, and sent forth to serve."
                        </blockquote>
                    </div>

                    {/* Right */}
                    <div className="space-y-5 text-foreground/75 leading-relaxed text-base pt-2">
                        <p>
                            A Sub-Council is the foundational unit of the Knights of St. Mulumba. It is the local chapter where members gather regularly for spiritual formation, fellowship, service, and fraternal support. Each Sub-Council is led by elected officers and operates under the guidance of the Metro Council.
                        </p>
                        <p>
                            Sub-Councils serve as the heartbeat of the Order. They organise community service initiatives, support parishes, provide mentorship for young Catholic men, and serve as a source of spiritual and personal growth for their members.
                        </p>
                        <p>
                            Together, the Sub-Councils of the Metro Council Abuja form a network of brotherhood that spans communities, parishes, and generations — united by a common faith and a shared commitment to service.
                        </p>
                        <div className="flex items-center gap-6 pt-2 text-sm font-medium text-foreground/60">
                            <span>Est. 1983</span>
                            <span className="w-px h-4 bg-border" />
                            <span>FCT • Abuja • Metro-Council</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Collective Impact */}
            <section className="py-14 bg-secondary/30 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-serif text-5xl text-foreground mb-6 text-center">
                        Our Collective Impact
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                        {stats.map((stat) => (
                            <div key={stat.label} className="space-y-1" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                                <div className="font-serif text-4xl text-primary">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Full Brotherhood Directory */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-serif text-5xl text-foreground mb-6">
                        The Full List Of<br /> OUR Sub-Councils
                    </h2>

                    {/* Filter Dropdown */}
                    <div className="mb-10 w-32 relative">
                        <label htmlFor="region-filter" className="sr-only">Filter by Region</label>
                        <select
                            id="region-filter"
                            value={activeRegion}
                            onChange={(e) => setActiveRegion(e.target.value as Region)}

                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region === "ALL" ? "All" : region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((sc, i) => (
                            <ProfileCard
                                key={i}
                                testIdPrefix={`subcouncil-${i}`}
                                imageSrc={placeholders[i % 3]}
                                roleNode={
                                    <>
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{sc.location}</span>
                                    </>
                                }
                                name={sc.name}
                                description={sc.desc}
                                buttonText="View Profile"
                                buttonIcon={<ChevronRight className="w-4 h-4" />}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
