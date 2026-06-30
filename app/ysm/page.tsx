
import { Cross, Star, HandHeart, Users } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import InterestForm from "@/components/forms/InterestForm";

export default function YSM() {
    return (
        <div className="w-full">
            {/* Hero */}
            <WhoWeAreHero
                title="Youths of Saint Mulumba"
                description="Forming the next generation of Catholic leaders"
            />

            {/* About */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">

                    <div>
                        <h2 className="font-serif text-5xl text-foreground mb-6">About YSM</h2>
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
                                The Youths of Saint Mulumba (YSM) serves as the vibrant youth wing of the Knights of St. Mulumba. We are dedicated to nurturing young Catholic men and women aged 15-35 in the vital pillars of faith, leadership, and community service.
                            </p>
                            <p>
                                Through dynamic programs, spiritual retreats, and collaborative projects, YSM empowers the next generation to boldly live out their Catholic faith in a modern world, providing them with a strong foundation of values, supportive mentorship, and lasting friendships.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Objectives */}
            <section className="py-16 bg-card px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Mission & Objectives</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                        {[
                            { title: "Faith Formation", icon: Cross, desc: "Deepening the faith of young Catholics through prayer and sacraments" },
                            { title: "Character Development", icon: Star, desc: "Building strong moral character and Catholic values" },
                            { title: "Deep Service", icon: HandHeart, desc: "Engaging in meaningful community service and outreach" },
                            { title: "Brotherhood", icon: Users, desc: "Fostering bonds of fraternity among Catholic youth" },
                        ].map((card, i) => (
                            <div key={i} className="">
                                <div className="text-forest text-3xl mb-4">
                                    <card.icon />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground leading-tight">{card.title}</h3>
                                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-background p-8 rounded-lg border-l-4 border-l-primary shadow-sm">
                            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Youth Development Programs</h3>
                            <p className="text-foreground/80 mb-4">
                                Our comprehensive programs are designed to support holistic youth development including spiritual, academic, and social growth.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-foreground/70 ml-4">
                                <li>Spiritual Retreats</li>
                                <li>Academic Scholarships</li>
                                <li>Mentorship Programs</li>
                                <li>Social Development</li>
                            </ul>
                        </div>
                        <div className="bg-background p-8 rounded-lg border-l-4 border-l-primary shadow-sm">
                            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Leadership Formation</h3>
                            <p className="text-foreground/80 mb-4">
                                We prepare young Catholics to be leaders in their communities, parishes, and professions.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-foreground/70 ml-4">
                                <li>Leadership Workshops</li>
                                <li>Public Speaking Training</li>
                                <li>Community Projects</li>
                                <li>Career Mentorship</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <InterestForm
                title="Register To Join The Youths OF ST. MULUMBA (YSM)"
                subtitle="Join the Youths of Saint Mulumba today"
                buttonText="Submit Interest"
                showParish={false}
                showAgeGroup={true}
            />
        </div>
    );
}
