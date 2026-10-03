"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import ProfileCard from "@/components/ProfileCard";
import Pagination from "@/components/Pagination";
import { client } from "@/sanity/lib/client";
import { venturesQuery } from "@/sanity/lib/queries";

interface Venture {
  _id: string;
  slug: { current: string };
  name: string;
  category?: string;
  tagline?: string;
  industry?: string;
  areaOfOperation?: string;
  registered?: string;
  aboutShort?: string;
  aboutLong?: string;
  impactText?: string;
  leaders?: Array<{
    role?: string;
    name?: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const stats = [
    { value: "7", label: "Active Ventures" },
    { value: "40+", label: "Years of Operation" },
    { value: "12", label: "Communities Served" },
    { value: "200+", label: "Jobs Created" },
    { value: "50+", label: "Projects Supported" },
];

const PER_PAGE = 5;

export default function Investments() {
    const [page, setPage] = useState(1);
    const [ventures, setVentures] = useState<Venture[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVentures() {
            try {
                const fetchedVentures = await client.fetch<Venture[]>(venturesQuery);
                setVentures(fetchedVentures);
            } catch (error) {
                console.error("Failed to fetch ventures:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchVentures();
    }, []);

    const totalPages = Math.ceil(ventures.length / PER_PAGE);
    const start = (page - 1) * PER_PAGE;
    const visible = ventures.slice(start, start + PER_PAGE);

    if (loading) {
        return (
            <div className="w-full">
                <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-5xl text-foreground mb-6 text-center">
                            Our Investments Impact
                        </h2>
                        <p className="text-muted-foreground">Loading investments...</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Our Investment Impact */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-5xl text-foreground mb-6 text-center">
                        Our Investments Impact
                    </h2>

                    <div
                        className="investment-stats-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "24px",
                            textAlign: "center",
                        }}
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    ...(i === 4 ? { gridColumn: "2 / span 2" } : {}),
                                }}
                            >
                                <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "36px", color: "#2f4f3f" }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#6b6b6b", fontWeight: 500 }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Investment Portfolio */}
            <section className="pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                            Investment Portfolio
                        </h2>
                        <p className="text-foreground/60 text-sm max-w-lg leading-relaxed">
                            From great morning devotions to consequential acts of service, life inside the Order is marked by rhythm, reverence, and brotherhood.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {visible.map((v, i) => (
                            <Link
                                key={v._id}
                                href={`/investments/${v.slug.current}`}
                                data-testid={`card-venture-${start + i}`}
                            >
                                <ProfileCard
                                    imageSrc={''}
                                    name={v.name}
                                    subtitle={v.category || 'Investment'}
                                    description={v.tagline || v.aboutShort || ''}
                                />
                            </Link>

                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        totalItems={ventures.length}
                        itemsPerPage={PER_PAGE}
                        testIdPrefix="button"
                    />
                </div>
            </section>

            {/* Responsive overrides for the stats grid */}
            <style>{`
                @media (max-width: 1024px) {
                    .investment-stats-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                    .investment-stats-grid > :nth-child(5) {
                        grid-column: auto !important;
                    }
                }
                @media (max-width: 640px) {
                    .investment-stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .investment-stats-grid > :nth-child(5) {
                        grid-column: auto !important;
                    }
                }
            `}</style>
        </div>
    );
}