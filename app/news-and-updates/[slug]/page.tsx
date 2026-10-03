'use client';

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsPostBySlugQuery, newsPostsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import RichTextRenderer from "@/components/RichTextRenderer";

interface NewsPost {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author?: string;
  hero?: {
    asset?: {
      url?: string;
    };
  };
  content?: any;
}

// ---------- shared style tokens ----------
const colors = {
    cream: "#f5f1e8",
    forest: "#2f4f3f",
    border: "#e3ddd0",
    lightCream: "#dfd5c8ff",
    background: "#ffffff",
    foreground: "#1a1a1a",
    muted: "#6b6b6b",
};

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: "100vh",
        backgroundColor: colors.cream,
    },
    backLinkWrap: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px 24px 0 24px",
    },
    backLink: {
        fontSize: "11px",
        letterSpacing: "0.25em",
        color: colors.forest,
        textDecoration: "none",
    },
    article: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px 24px 80px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "40px",
    },
    articleMobile: {
        gridTemplateColumns: "1fr",
    },
    mainCol: {
        minWidth: 0,
    },
    category: {
        fontSize: "11px",
        letterSpacing: "0.25em",
        color: colors.forest,
        marginBottom: "16px",
    },
    title: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "44px",
        lineHeight: 1.15,
        marginBottom: "24px",
        marginTop: 0,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        overflow: "hidden",
    },
    metaRow: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px 16px",
        fontSize: "14px",
        color: colors.muted,
        borderBottom: `1px solid ${colors.border}`,
        paddingBottom: "24px",
    },
    metaAuthor: {
        color: colors.foreground,
    },
    figure: {
        margin: "32px 0",
        position: "relative",
        width: "100%",
        height: "420px",
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    figureImg: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
    },
    proseWrap: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "none",
    },
    p: {
        fontSize: "16px",
        lineHeight: 1.75,
        color: "rgba(26,26,26,0.9)",
        margin: 0,
    },
    h2: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "32px",
        color: colors.foreground,
        marginBottom: "8px",
        marginTop: 0,
    },
    list: {
        listStyleType: "disc",
        paddingLeft: "24px",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "rgba(26,26,26,0.9)",
    },
    quote: {
        borderLeft: `4px solid ${colors.forest}`,
        paddingLeft: "20px",
        paddingTop: "8px",
        paddingBottom: "8px",
        fontStyle: "italic",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "20px",
        color: "rgba(26,26,26,0.9)",
        margin: 0,
    },
    quoteFooter: {
        marginTop: "8px",
        fontStyle: "normal",
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: colors.muted,
    },
    inlineFigure: {
        position: "relative",
        width: "100%",
        height: "320px",
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    figcaption: {
        marginTop: "8px",
        fontSize: "12px",
        color: colors.muted,
        fontStyle: "italic",
        textAlign: "center",
    },
    shareWrap: {
        marginTop: "48px",
        borderTop: `1px solid ${colors.border}`,
        paddingTop: "24px",
    },
    shareLabel: {
        fontSize: "11px",
        letterSpacing: "0.25em",
        color: colors.forest,
        marginBottom: "16px",
    },
    shareButtons: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
    },
    shareBtn: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40px",
        padding: "0 16px",
        fontSize: "11px",
        letterSpacing: "0.2em",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.foreground,
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color 0.2s, color 0.2s",
    },
    navWrap: {
        marginTop: "48px",
        borderTop: `1px solid ${colors.border}`,
        paddingTop: "32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
    },
    navWrapMobile: {
        gridTemplateColumns: "1fr",
    },
    navCard: {
        display: "block",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        padding: "20px",
        textDecoration: "none",
        color: colors.foreground,
        transition: "border-color 0.2s",
    },
    navLabel: {
        fontSize: "11px",
        letterSpacing: "0.25em",
        color: colors.muted,
        marginBottom: "8px",
    },
    navTitle: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "18px",
        lineHeight: 1.3,
    },
    aside: {
        display: "flex",
        flexDirection: "column",
        gap: "32px",
    },
    sidebarBlock: {
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.lightCream,
        padding: "24px",
    },
    sidebarKicker: {
        fontSize: "11px",
        letterSpacing: "0.25em",
        color: colors.forest,
        marginBottom: "16px",
    },
    sidebarHeading: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "36px",
        color: colors.foreground,
        marginBottom: "24px",
        marginTop: 0,
    },
    latestList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
    },
    latestLink: {
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "12px",
        textDecoration: "none",
        color: colors.foreground,
    },
    latestThumbWrap: {
        position: "relative",
        width: "80px",
        height: "80px",
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    latestThumbImg: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    latestTitle: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "14px",
        lineHeight: 1.35,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    latestMeta: {
        marginTop: "4px",
        fontSize: "11px",
        color: colors.muted,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    relatedList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        listStyle: "none",
        margin: 0,
        padding: 0,
    },
    relatedLink: {
        display: "block",
        textDecoration: "none",
        color: colors.foreground,
    },
    relatedKicker: {
        fontSize: "10px",
        letterSpacing: "0.25em",
        color: colors.forest,
        marginBottom: "4px",
    },
    relatedTitle: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "16px",
        lineHeight: 1.35,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
};

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [post, setPost] = useState<NewsPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [latestPosts, setLatestPosts] = useState<NewsPost[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const currentPost = await client.fetch<NewsPost>(newsPostBySlugQuery, { slug });
                if (!currentPost) {
                    notFound();
                    return;
                }
                setPost(currentPost);

                const allPosts = await client.fetch<NewsPost[]>(newsPostsQuery);
                const latest = allPosts
                    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                    .slice(0, 5);
                setLatestPosts(latest);
            } catch (error) {
                console.error("Failed to fetch news post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading || !post) {
        return (
            <main style={styles.main}>
                <div style={styles.backLinkWrap}>
                    <Link href="/news-and-updates" style={styles.backLink}>
                        ← BACK TO NEWSROOM
                    </Link>
                </div>
                <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                    Loading article...
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const relativeDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return formatDate(dateString);
    };

    // Simple prev/next logic based on date
    const sortedPosts = [...latestPosts].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    const currentIndex = sortedPosts.findIndex(p => p._id === post._id);
    const prev = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const next = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    const related = sortedPosts.filter(p => p._id !== post._id).slice(0, 4);

    return (
        <main style={styles.main}>
            <div style={styles.backLinkWrap}>
                <Link href="/news-and-updates" style={styles.backLink}>
                    ← BACK TO NEWSROOM
                </Link>
            </div>

            <article
                style={styles.article}
                className="news-detail-article"
            >
                <div style={styles.mainCol}>
                    <div style={styles.category}>{post.category.toUpperCase()}</div>
                    <h1 style={styles.title} title={post.title}>{post.title}</h1>
                    <div style={styles.metaRow}>
                        <span>By <span style={styles.metaAuthor}>{post.author || 'KSM Metro Council'}</span></span>
                        <span>·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <figure style={styles.figure}>
                        {post.hero?.asset?.url && (
                            <Image
                                src={post.hero.asset.url}
                                alt={post.title}
                                fill
                                style={styles.figureImg}
                            />
                        )}
                    </figure>

                    <div style={styles.proseWrap}>
                        {post.content ? (
                            <RichTextRenderer content={post.content} />
                        ) : null}
                    </div>

                    <ShareBar title={post.title} />

                    <PrevNext prev={prev} next={next} />
                </div>

                <aside style={styles.aside}>
                    <SidebarBlock title="Latest News">
                        <ul style={styles.latestList}>
                            {latestPosts.map((p) => (
                                <li key={p._id}>
                                    <Link href={`/news-and-updates/${p.slug.current}`} style={styles.latestLink}>
                                        <div style={styles.latestThumbWrap}>
                                            {p.hero?.asset?.url && (
                                                <Image
                                                    src={p.hero.asset.url}
                                                    alt=""
                                                    fill
                                                    loading="lazy"
                                                    style={styles.latestThumbImg}
                                                />
                                            )}
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={styles.latestTitle}>{p.title}</div>
                                            <div style={styles.latestMeta}>{p.author || 'KSM Metro Council'}</div>
                                            <div style={styles.latestMeta}>{relativeDate(p.publishedAt)}</div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </SidebarBlock>

                    <SidebarBlock title="Related Stories">
                        <ul style={styles.relatedList}>
                            {related.map((p) => (
                                <li key={p._id}>
                                    <Link href={`/news-and-updates/${p.slug.current}`} style={styles.relatedLink}>
                                        <div style={styles.relatedKicker}>{p.category.toUpperCase()}</div>
                                        <div style={styles.relatedTitle}>{p.title}</div>
                                        <div style={styles.latestMeta}>{relativeDate(p.publishedAt)}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </SidebarBlock>
                </aside>
            </article>

            {/* Internal CSS for responsive behavior + hover states that inline styles can't express */}
            <style>{`
                @media (max-width: 900px) {
                    .news-detail-article {
                        grid-template-columns: 1fr !important;
                    }
                }
                .news-detail-article a:hover .latest-hover-img,
                .news-detail-article .group:hover img {
                    transform: scale(1.05);
                }
            `}</style>
        </main>
    );
}

function SidebarBlock({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={styles.sidebarBlock}>
            <div style={styles.sidebarKicker}>{title.toUpperCase()}</div>
            <h2 style={styles.sidebarHeading}>{title}</h2>
            {children}
        </div>
    );
}

function ShareBar({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const enc = encodeURIComponent;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* noop */
        }
    };

    const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = colors.forest;
        e.currentTarget.style.color = colors.forest;
    };
    const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.color = colors.foreground;
    };

    return (
        <div style={styles.shareWrap}>
            <div style={styles.shareLabel}>SHARE THIS STORY</div>
            <div style={styles.shareButtons}>
                <a
                    style={styles.shareBtn}
                    href={`https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    FACEBOOK
                </a>
                <a
                    style={styles.shareBtn}
                    href={`https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(title)}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    X / TWITTER
                </a>
                <a
                    style={styles.shareBtn}
                    href={`https://wa.me/?text=${enc(title + " " + shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    WHATSAPP
                </a>
                <button
                    type="button"
                    onClick={copy}
                    style={styles.shareBtn}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    {copied ? "COPIED ✓" : "COPY LINK"}
                </button>
            </div>
        </div>
    );
}

function PrevNext({ prev, next }: { prev: NewsPost | null; next: NewsPost | null }) {
    if (!prev && !next) return null;

    const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = colors.forest;
    };
    const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = colors.border;
    };

    return (
        <nav style={styles.navWrap} className="news-detail-nav" aria-label="Article navigation">
            {prev ? (
                <Link
                    href={`/news-and-updates/${prev.slug.current}`}
                    style={styles.navCard}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    <div style={styles.navLabel}>← PREVIOUS</div>
                    <div style={styles.navTitle}>{prev.title}</div>
                </Link>
            ) : <div />}
            {next ? (
                <Link
                    href={`/news-and-updates/${next.slug.current}`}
                    style={{ ...styles.navCard, textAlign: "right" }}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                >
                    <div style={styles.navLabel}>NEXT →</div>
                    <div style={styles.navTitle}>{next.title}</div>
                </Link>
            ) : <div />}
        </nav>
    );
}