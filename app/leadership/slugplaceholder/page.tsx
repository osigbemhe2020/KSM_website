import React from "react";

import { ChevronRight, ArrowLeft } from "lucide-react";
import { leaders } from "@/lib/leaders";
import Link from "next/link";

export default function LeaderDetail() {
    const slug = "anthony-okonkwo";
    const leader = leaders.find((l) => l.id === slug);
    const others = leaders.filter((l) => l.id !== slug).slice(0, 3);


    if (!leader) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">Leader not found</h2>
                <Link href="/leadership" className="text-primary hover:underline text-sm flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back to Leadership
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Hero */}

            {/* Featured — dark green */}
            <section className="bg-primary py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
                    <div className="bg-white/10 border border-white/20 h-72 lg:h-96 rounded-lg flex items-center justify-center text-white/40 text-sm">
                        Photo
                    </div>
                    <div className="text-primary-foreground">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-3">
                            {leader.role}
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2 leading-tight">{leader.name}</h2>
                        <p className="text-sm text-primary-foreground/60 italic mb-5">{leader.serving}</p>
                        <p className="text-primary-foreground/80 text-base leading-relaxed max-w-md">{leader.tagline}</p>
                    </div>
                </div>
            </section>

            {/* Bio */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/leadership"
                        data-testid="link-back-leadership"
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Leadership
                    </Link>
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Biography</p>
                            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                                A Life of Faith<br />and Service.
                            </h2>
                        </div>
                        <div className="space-y-4 text-foreground/70 text-sm leading-relaxed">
                            {leader.bio.split("\n\n").map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsibilities + Gifts */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                            Office & Duties
                        </p>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Key Responsibilities</h3>
                        <ul className="space-y-3">
                            {leader.responsibilities.map((r, i) => (
                                <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                            Areas of Focus
                        </p>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Particular Gifts</h3>
                        <div className="flex flex-wrap gap-3">
                            {leader.gifts.map((g) => (
                                <span
                                    key={g}
                                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded border border-primary/20"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Other Officers */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        More From Council
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-10">
                        Meet Other Officers
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {others.map((l, i) => (
                            <div
                                key={l.id}
                                data-testid={`card-other-officer-${i}`}
                                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                            >
                                <div className="bg-muted h-52 flex items-center justify-center text-muted-foreground text-sm border-b border-border">
                                    Photo
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                                        {l.role}
                                    </p>
                                    <h3 className="font-serif text-lg font-bold text-foreground mb-1 leading-snug">{l.name}</h3>
                                    <p className="text-xs italic text-muted-foreground mb-3">{l.serving}</p>
                                    <p className="text-sm text-foreground/65 leading-relaxed flex-1">{l.tagline}</p>
                                    <Link
                                        href={`/leadership/${l.id}`}
                                        data-testid={`button-read-bio-other-${i}`}
                                        className="mt-4 self-start px-5 py-2 border border-border text-xs font-semibold text-foreground rounded hover:bg-muted transition-colors"
                                    >
                                        Read Full Biography
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}
