import Link from "next/link";
import {
  FileText,
  CalendarDays,
  Users,
  Shield,
  FolderKanban,
  GalleryHorizontal,
  Briefcase,
  HeartHandshake,
  Plus,
  ArrowRight,
  ExternalLink,
  Settings,
  BookOpen,
  Crown,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { ADMIN_CATEGORIES } from "@/lib/adminResources";

export const dynamic = "force-dynamic";

type CountQueryResponse = {
  news: number;
  events: number;
  leaders: number;
  subcouncils: number;
  projects: number;
  ventures: number;
  gallery: number;
  charity: number;
  faqs: number;
  pillars: number;
  recentNews: Array<{ _id: string; title: string; publishedAt: string; category?: string }>;
  upcomingEvents: Array<{ _id: string; title: string; startDate: string; category?: string }>;
};

const countsQuery = `{
  "news": count(*[_type == "newsPost"]),
  "events": count(*[_type == "event"]),
  "leaders": count(*[_type == "leader"]),
  "subcouncils": count(*[_type == "subCouncil"]),
  "projects": count(*[_type == "project"]),
  "ventures": count(*[_type == "venture"]),
  "gallery": count(*[_type == "galleryItem"]),
  "charity": count(*[_type == "charityProgram"]),
  "faqs": count(*[_type == "faq"]),
  "pillars": count(*[_type == "pillar"]),
  "recentNews": *[_type == "newsPost"] | order(publishedAt desc)[0...3]{_id, title, publishedAt, category},
  "upcomingEvents": *[_type == "event" && startDate >= now()] | order(startDate asc)[0...3]{_id, title, startDate, category}
}`;

export default async function AdminDashboardPage() {
  const data = await client.fetch<CountQueryResponse>(countsQuery);

  const stats = [
    { label: "News Articles", count: data.news, href: "/admin/news-posts", icon: FileText, color: "text-blue-700 bg-blue-50" },
    { label: "Calendar Events", count: data.events, href: "/admin/events", icon: CalendarDays, color: "text-emerald-700 bg-emerald-50" },
    { label: "Leaders & Officers", count: data.leaders, href: "/admin/leaders", icon: Users, color: "text-purple-700 bg-purple-50" },
    { label: "Sub-Councils", count: data.subcouncils, href: "/admin/subconcils", icon: Shield, color: "text-amber-700 bg-amber-50" },
    { label: "Community Projects", count: data.projects, href: "/admin/projects", icon: FolderKanban, color: "text-indigo-700 bg-indigo-50" },
    { label: "Photo Gallery", count: data.gallery, href: "/admin/gallery", icon: GalleryHorizontal, color: "text-rose-700 bg-rose-50" },
  ];

  const singletons = [
    { title: "Global Site Settings", path: "/admin/site-settings", icon: Settings, desc: "Brand contacts, office hours, address & social channels" },
    { title: "Our Founder Page", path: "/admin/pages/founder", icon: BookOpen, desc: "Rev. Fr. Abraham Ojefua biography, founding vision & chapters" },
    { title: "St. Mulumba Page", path: "/admin/pages/st-mulumba", icon: Crown, desc: "Patron Saint biography, quotes, significance & legacy points" },
    { title: "Donation Portal", path: "/admin/pages/donation", icon: Heart, desc: "Presets, impact metrics, beneficiary testimonials & copy" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
      {/* Header Banner */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              <CheckCircle2 size={12} /> Sanity CMS Active
            </span>
            <span className="text-xs text-slate-400">&bull;</span>
            <span className="text-xs text-slate-500">Metro Council Abuja</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl font-normal text-slate-900 md:text-5xl">
            Welcome to Content Management
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Control all website content, narratives, officers, projects, and site settings in one place.
          </p>
        </div>

        {/* Quick Add CTA */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/news-posts/new"
            className="inline-flex items-center gap-1.5 bg-forest px-4 py-2.5 text-xs font-medium text-white hover:bg-forest/90 transition-colors shadow-xs"
          >
            <Plus size={14} /> New Article
          </Link>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 border border-forest bg-white px-4 py-2.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors shadow-xs"
          >
            <Plus size={14} /> New Event
          </Link>
        </div>
      </div>

      {/* Primary Content Statistics */}
      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Live Content Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex p-2 rounded-md ${stat.color}`}>
                    <Icon size={18} />
                  </span>
                  <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-4">
                  <p className="font-serif text-3xl font-normal text-slate-900">{stat.count}</p>
                  <p className="mt-1 text-xs text-slate-500 group-hover:text-forest transition-colors">{stat.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Singleton Page Editors */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Dedicated Story &amp; Single Pages
          </h2>
          <span className="text-xs text-slate-400">1-Click Content Editing</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {singletons.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.path}
                className="group border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-forest hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex p-2 bg-[#F6F4EE] text-forest rounded-md">
                    <Icon size={18} />
                  </span>
                  <span className="text-[11px] font-medium text-forest group-hover:underline">Edit Page &rarr;</span>
                </div>
                <h3 className="mt-3 font-medium text-sm text-slate-900">{page.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">{page.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4 Navigation Domains Grid */}
      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          CMS Category Hub
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {ADMIN_CATEGORIES.map((cat) => (
            <div key={cat.id} className="border border-slate-200 bg-white p-6 shadow-xs">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900">{cat.name}</h3>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 px-2 py-1 text-slate-600 rounded">
                  {cat.badge}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {cat.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col p-3 rounded bg-slate-50/70 hover:bg-forest/5 hover:text-forest transition-colors border border-slate-100"
                  >
                    <span className="text-xs font-medium text-slate-800">{item.label}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Latest News Articles */}
        <div className="border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-medium text-slate-900">Recent News Posts</h3>
            <Link href="/admin/news-posts" className="text-xs text-forest hover:underline">
              View all ({data.news})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {data.recentNews.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No news articles published yet.</p>
            ) : (
              data.recentNews.map((post) => (
                <div key={post._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-900 truncate">{post.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {post.category && ` &bull; ${post.category}`}
                    </p>
                  </div>
                  <Link
                    href={`/admin/news-posts/${post._id}/edit`}
                    className="text-xs font-medium text-forest hover:underline shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-medium text-slate-900">Upcoming Events</h3>
            <Link href="/admin/events" className="text-xs text-forest hover:underline">
              View all ({data.events})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {data.upcomingEvents.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No upcoming events scheduled.</p>
            ) : (
              data.upcomingEvents.map((evt) => (
                <div key={evt._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-900 truncate">{evt.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(evt.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {evt.category && ` &bull; ${evt.category}`}
                    </p>
                  </div>
                  <Link
                    href={`/admin/events/${evt._id}/edit`}
                    className="text-xs font-medium text-forest hover:underline shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}