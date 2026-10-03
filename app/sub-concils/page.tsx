"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { MapPin, ChevronRight } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import ProfileCard from "@/components/ProfileCard";
import { client } from "@/sanity/lib/client";
import { subCouncilsQuery } from "@/sanity/lib/queries";

const regions = ["ALL", "CENTRAL", "NORTH", "SOUTH", "EAST"] as const;
type Region = (typeof regions)[number];

interface SubCouncil {
  _id: string;
  name: string;
  region?: string;
  description?: string;
  city?: string;
  state?: string;
  area?: string;
  address?: string;
  phone?: string;
  email?: string;
  establishedYear?: number;
  grandKnight?: string;
}

const stats = [
    { value: "35+ ", label: "Sub-Councils", description: "Active subordinate councils spanning FCT and suffragan states." },
    { value: "3 ", label: "Diocesan Axes", description: "Encompassing Abuja Archdiocese, Benue Axis, Nasarawa Axis, and Kogi Axis." },
    { value: "3", label: "Fraternal Wings", description: "Synergistic apostolate of Knights, Ladies (LSM), and Youths (YSM)." },
    { value: "70+ ", label: "Years", description: "Legacy of Catholic service in Nigeria since June 14, 1953." },
];

export default function SubCouncils() {
    const [activeRegion, setActiveRegion] = useState<Region>("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [subCouncils, setSubCouncils] = useState<SubCouncil[]>([]);
    const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        async function fetchSubCouncils() {
            try {
                const fetchedCouncils = await client.fetch<SubCouncil[]>(subCouncilsQuery);
                setSubCouncils(fetchedCouncils);
            } catch (error) {
                console.error("Failed to fetch sub-councils:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubCouncils();
    }, []);

    const filtered = subCouncils.filter(
        (sc) => activeRegion === "ALL" || sc.region === activeRegion
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleRegionChange = (region: Region) => {
        setActiveRegion(region);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="w-full">
                <WhoWeAreHero
                    title="Sub-Councils"
                    description="United by faith, strengthened through brotherhood, and committed to serving our communities."
                />
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-muted-foreground">Loading sub-councils...</p>
                    </div>
                </section>
            </div>
        );
    }

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
                            A Brotherhood<br/>Across<br/>Communities
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((stat) => (
                            <div key={stat.label} className="space-y-2" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                                <div className="font-serif text-4xl text-primary">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</div>
                                <div className="text-xs text-muted-foreground leading-tight">{stat.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Full Brotherhood Directory */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-serif text-5xl text-foreground mb-6">
                        The Full List Of<br/> OUR Sub-Councils
                    </h2>

                    {/* Filter Dropdown */}
                    <div className="mb-10 w-32 relative">
                        <label htmlFor="region-filter" className="sr-only">Filter by Region</label>
                        <select
                            id="region-filter"
                            value={activeRegion}
                            onChange={(e) => handleRegionChange(e.target.value as Region)}

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
                        {paginated.map((sc, i) => (
                            <ProfileCard
                                key={sc._id}
                                testIdPrefix={`subcouncil-${(currentPage - 1) * ITEMS_PER_PAGE + i}`}
                                imageSrc={''}
                                roleNode={
                                    <>
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{sc.city ? `${sc.city}, ${sc.state}` : 'TBD'}</span>
                                    </>
                                }
                                name={sc.name}
                                description={sc.description || ''}
                                buttonText="View Profile"
                                buttonIcon={<ChevronRight className="w-4 h-4" />}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filtered.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        testIdPrefix="subcouncils-pagination"
                    />
                </div>
            </section>
        </div>
    );
}
