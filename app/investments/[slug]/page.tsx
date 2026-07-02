import React from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { ventures } from "@/lib/ventures";

// ---------- shared style tokens ----------
const colors = {
    forest: "#2f4f3f",
    border: "#e3ddd0",
    muted: "#6b6b6b",
    mutedBg: "#eef0ec",
    foreground: "#1a1a1a",
    background: "#ffffff",
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        width: "100%",
    },
    headerSection: {
        paddingTop: "48px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        paddingRight: "24px",
    },
    headerInner: {
        maxWidth: "1280px",
        margin: "0 auto",
    },
    backLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "14px",
        color: colors.forest,
        textDecoration: "none",
        marginBottom: "24px",
    },

    aboutSection: {
        paddingTop: "48px",
        paddingBottom: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
    },
    aboutGrid: {
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "start",
    },
    aboutGridMobile: {
        gridTemplateColumns: "1fr",
    },
    imagePlaceholder: {
        backgroundColor: colors.mutedBg,
        borderRadius: "8px",
        height: "380px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.muted,
        fontSize: "14px",
        border: `1px solid ${colors.border}`,
    },
    kicker: {
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: colors.muted,
        marginBottom: "4px",
        marginTop: 0,
    },
    aboutHeading: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "22px",
        fontWeight: 700,
        color: colors.foreground,
        marginBottom: "20px",
        marginTop: 0,
    },
    paragraph: {
        fontSize: "14px",
        color: "rgba(26,26,26,0.7)",
        lineHeight: 1.7,
        marginBottom: "16px",
        marginTop: 0,
    },
    metaGrid: {
        marginTop: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        borderTop: `1px solid ${colors.border}`,
        paddingTop: "24px",
    },
    metaValue: {
        fontSize: "14px",
        fontWeight: 600,
        color: colors.foreground,
        margin: 0,
    },
    impactSection: {
        paddingTop: "64px",
        paddingBottom: "64px",
        paddingLeft: "24px",
        paddingRight: "24px",
        backgroundColor: "rgba(238,240,236,0.5)",
    },
    impactInner: {
        maxWidth: "1280px",
        margin: "0 auto",
    },
    impactHeading: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "34px",
        fontWeight: 700,
        color: colors.foreground,
        textAlign: "center",
        marginBottom: "48px",
        marginTop: 0,
        lineHeight: 1.25,
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
        marginBottom: "48px",
        textAlign: "center",
    },
    statsGridMobile: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    statValue: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "34px",
        fontWeight: 700,
        color: colors.forest,
        marginBottom: "4px",
    },
    statLabel: {
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: colors.muted,
        fontWeight: 500,
    },
    impactTextWrap: {
        maxWidth: "720px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    leadershipSection: {
        paddingTop: "64px",
        paddingBottom: "64px",
        paddingLeft: "24px",
        paddingRight: "24px",
    },
    leadershipInner: {
        maxWidth: "1280px",
        margin: "0 auto",
    },
    leadershipHeading: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "34px",
        fontWeight: 700,
        color: colors.foreground,
        textAlign: "center",
        marginBottom: "48px",
        marginTop: 0,
    },
    leadersGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "32px",
    },
    leadersGridMobile: {
        gridTemplateColumns: "1fr",
    },
    leaderCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
    leaderPhoto: {
        backgroundColor: colors.mutedBg,
        width: "100%",
        height: "220px",
        borderRadius: "8px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.muted,
        fontSize: "14px",
        border: `1px solid ${colors.border}`,
    },
    leaderRole: {
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: colors.muted,
        marginBottom: "4px",
    },
    leaderName: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "18px",
        fontWeight: 700,
        color: colors.foreground,
        margin: 0,
    },
    notFoundWrap: {
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "0 16px",
    },
    notFoundHeading: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "24px",
        fontWeight: 700,
        color: colors.foreground,
        margin: 0,
    },
    notFoundLink: {
        color: colors.forest,
        textDecoration: "none",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
};

export default async function InvestmentDetail({ params }: { params: { slug: string } }) {

    const { slug } = await params;

    const venture = ventures.find((v) => v.slug === slug);

    if (!venture) {
        return (
            <div style={styles.notFoundWrap}>
                <h2 style={styles.notFoundHeading}>Venture not found</h2>
                <Link href="/investments" style={styles.notFoundLink}>
                    <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Investments
                </Link>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            {/* Hero — same as Investments page */}


            {/* Back link + Company Name */}
            <section style={styles.headerSection}>
                <div style={styles.headerInner}>
                    <Link
                        href="/investments"
                        data-testid="link-back-investments"
                        style={styles.backLink}
                    >
                        <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Investments
                    </Link>
                    <h2 className="font-serif text-5xl text-foreground mb-6">
                        {venture.name}
                    </h2>
                    <p className="text-foreground/60 text-sm max-w-lg leading-relaxed">{venture.tagline}</p>
                </div>
            </section>

            {/* About + Image */}
            <section style={styles.aboutSection}>
                <div style={styles.aboutGrid} className="investment-detail-grid">
                    {/* Image placeholder */}
                    <div style={styles.imagePlaceholder}>
                        Image
                    </div>

                    {/* Details */}
                    <div>
                        <p style={styles.kicker}>
                            ABOUT US
                        </p>
                        <h3 style={styles.aboutHeading}>{venture.aboutShort}</h3>

                        {venture.aboutLong.split("\n\n").map((para, i) => (
                            <p key={i} className="text-foreground/60 text-sm max-w-lg leading-relaxed">{para}</p>
                        ))}

                        {/* Meta grid */}
                        <div style={styles.metaGrid}>
                            <div>
                                <p style={styles.kicker}>
                                    Industry
                                </p>
                                <p style={styles.metaValue}>{venture.industry}</p>
                            </div>
                            <div>
                                <p style={styles.kicker}>
                                    Area of Operation
                                </p>
                                <p style={styles.metaValue}>{venture.areaOfOperation}</p>
                            </div>
                            <div>
                                <p style={styles.kicker}>
                                    Registered
                                </p>
                                <p style={styles.metaValue}>{venture.registered}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact and Community Contribution */}
            <section style={styles.impactSection}>
                <div style={styles.impactInner}>
                    <h2 style={styles.impactHeading}>Impact and Community<br />Contribution</h2>

                    {/* Stats */}
                    <div style={styles.statsGrid} className="investment-detail-stats">
                        {venture.stats.map((s) => (
                            <div key={s.label} data-testid={`impact-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                                <div style={styles.statValue}>{s.value}</div>
                                <div style={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Impact text */}
                    <div style={styles.impactTextWrap}>
                        {venture.impactText.split("\n\n").map((para, i) => (
                            <p key={i} className="text-foreground/60 text-sm max-w-lg leading-relaxed">{para}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Leadership */}
            <section style={styles.leadershipSection}>
                <div style={styles.leadershipInner}>
                    <h2 style={styles.leadershipHeading}>
                        Company Leadership
                    </h2>
                    <div style={styles.leadersGrid} className="investment-detail-leaders">
                        {venture.leaders.map((leader, i) => (
                            <div key={i} data-testid={`card-leader-${i}`} style={styles.leaderCard}>
                                {/* Photo placeholder */}
                                <div style={styles.leaderPhoto}>
                                    Photo
                                </div>
                                <p style={styles.leaderRole}>
                                    {leader.role}
                                </p>
                                <p style={styles.leaderName}>{leader.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal CSS for responsive behavior only — inline styles can't express media queries */}
            <style>{`
                @media (max-width: 900px) {
                    .investment-detail-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .investment-detail-leaders {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 640px) {
                    .investment-detail-stats {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
}