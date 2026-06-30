import { Cross, Star, HandHeart, Users } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import ProfileCard from "@/components/ProfileCard";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";

export default function LSM() {
    return (
        <div className="w-full">
            {/* Hero */}
            <WhoWeAreHero
                title="Ladies of St. Mulumba"
                description="Women of Faith, Purpose, and Commitment"
            />

            {/* About */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">

                    <div>
                        <h2 className="font-serif text-5xl text-foreground mb-6">About LSM</h2>
                        <div
                            style={{
                                position: 'relative',
                                width: '60%',
                                aspectRatio: '16 / 7',
                                overflow: 'hidden',
                                border: '1px solid var(--border, #e5e7eb)',
                                background: 'var(--background, #fff)',
                            }}
                        >
                            <img
                                src="@/assets/hero-image3.jpg"
                                alt=""
                                loading="lazy"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        </div>
                        <div className="space-y-4 mt-8 text-foreground/80 leading-relaxed">
                            <p>
                                The Ladies of St. Mulumba (LSM) serves as the esteemed women's auxiliary of the Knights of St. Mulumba. We are a sisterhood dedicated to supporting women in living out their Catholic faith profoundly through dedicated service, fellowship, and spiritual growth.
                            </p>
                            <p>
                                Our members are actively engaged in parish life, philanthropic endeavors, and family ministries. Together, we uplift one another, enrich our communities, and bear witness to the transformative power of women grounded in faith.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History & Mission */}
            <section className="py-16 bg-card px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="">
                        <h2 className="font-serif text-3xl text-foreground mb-6">History</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            Founded as a companion organization to the Knights of St. Mulumba, the LSM was established to provide Catholic women with a structured, purposeful organization for faith and service. Over the decades, we have grown into a formidable force for charity, spiritual renewal, and community support across numerous parishes.
                        </p>
                    </div>
                    <div className="">
                        <h2 className="font-serif text-3xl text-foreground mb-6">Mission</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            The mission of the LSM is to form women of deep faith, strong character, and generous service to Church and community. We strive to be beacons of hope, nurturing families, advocating for the vulnerable, and fostering a deep love for the Gospel in all our endeavors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs & Activities */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Programs & Activities</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { title: "Mentor Development", desc: "Training programs to equip LSM members to mentor younger women in faith and life skills." },
                        { title: "Family Apostolate", desc: "Programs supporting Catholic family values and strengthening the domestic church." },
                        { title: "Charity Outreach", desc: "Coordinated charitable activities serving the poor, sick, and marginalized in our communities." },
                        { title: "Vocational Empowerment", desc: "Supporting women in discerning and living out their God-given vocations." },
                    ].map((prog, i) => (
                        <div key={i} className="p-8 rounded-xl shadow-sm border border-border/40 flex flex-col items-start gap-4">
                            <div>
                                <h3 className="font-serif text-2xl font-semibold text-primary mb-6">{prog.title}</h3>
                                <p className="text-foreground/70">{prog.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leadership Structure */}
            <section className="py-16 bg-card px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Leadership Structure</h2>

                    <div className="grid sm:grid-cols-3 gap-8 mb-12">
                        {[
                            { name: "Lady Normarose O., LSM", role: "National President", img: leader1 },
                            { name: "Lady Margaret N., LSM", role: "Secretary General", img: leader2 },
                            { name: "Lady Cecelia E., LSM", role: "Treasurer", img: leader3 },
                        ].map((leader, i) => (
                            <ProfileCard
                                key={i}
                                imageSrc={leader.img.src}
                                roleNode={leader.role}
                                name={leader.name}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
