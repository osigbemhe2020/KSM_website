"use client";

import { useState } from "react";
import { news, formatDate } from "@/lib/news-data";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { NewsCard } from "@/components/NewsCard";

const CATEGORIES = ["All", "Latest", "Announcements", "Events", "YSM / LSM"];

export default function NewsListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredNews = [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((n) => activeCategory === "All" || n.category === activeCategory);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  return (
    <main className="min-h-screen bg-cream w-full">
      <WhoWeAreHero
        title="News and Updates"
        description="Stay informed with the latest news, announcements, events, community stories, and updates from the Knights of St. Mulumba Metro Council Abuja."
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-gray-500 tracking-widest mr-2">CATEGORIES</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-6 py-2 text-xs font-semibold rounded-full border transition-colors ${activeCategory === cat
                    ? "bg-forest text-white border-forest"
                    : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {visibleNews.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleNews.map((post) => (
              <NewsCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                imageSrc={post.image.src}
                excerpt={post.excerpt}
                href={`/news-and-updates/${post.slug}`}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-forest text-white px-8 py-3 rounded font-semibold hover:bg-forest/90 transition-colors inline-flex items-center"
            >
              Load More Articles →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}