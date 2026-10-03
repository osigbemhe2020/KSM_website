import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  FileText,
  FolderKanban,
  GalleryHorizontal,
  Gem,
  HeartHandshake,
  LayoutDashboard,
  Library,
  Settings,
  Shield,
  Users,
  Workflow,
  HelpCircle,
  Briefcase,
  BookOpen,
  Crown,
  Heart,
  Milestone,
  Layers,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/adminAuth";
import { ADMIN_CATEGORIES } from "@/lib/adminResources";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText,
  CalendarDays,
  GalleryHorizontal,
  HelpCircle,
  Users,
  Workflow,
  Shield,
  Layers,
  FolderKanban,
  Briefcase,
  HeartHandshake,
  Gem,
  Settings,
  BookOpen,
  Crown,
  Heart,
  Milestone,
  Library,
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const access = await getAdminAccess(requestHeaders.get("cookie"));

  if (!access.allowed) {
    redirect(access.status === 401 ? "/sign-in" : "/member-page/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 md:flex">
      {/* Sidebar Navigation */}
      <aside className="w-full shrink-0 bg-[#1B382B] text-white md:sticky md:top-0 md:h-screen md:w-72">
        <div className="flex h-full flex-col px-5 py-6">
          {/* Brand Header */}
          <Link href="/admin" className="mb-6 block border-b border-white/10 pb-5">
            <span className="block font-serif text-lg font-normal tracking-wide text-white">Knights of St. Mulumba</span>
            <span className="mt-0.5 block text-[9px] font-medium tracking-[0.25em] text-[#C5A059]">METRO COUNCIL ABUJA</span>
            <span className="mt-3 inline-block bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/80">
              Content Management System
            </span>
          </Link>

          {/* Quick Dashboard Link */}
          <div className="mb-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              <LayoutDashboard size={16} className="text-[#C5A059]" />
              <span>Workspace Overview</span>
            </Link>
          </div>

          {/* Categorized Nav Items */}
          <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
            {ADMIN_CATEGORIES.map((category) => (
              <div key={category.id}>
                <div className="mb-2 flex items-center justify-between px-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{category.name}</p>
                </div>
                <div className="space-y-0.5">
                  {category.items.map((item) => {
                    const IconComponent = iconMap[item.icon] || FileText;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-3 px-3 py-2 text-xs font-normal text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <IconComponent size={14} className="opacity-70 group-hover:opacity-100 text-white/80" />
                        <span className="truncate">{item.label}</span>
                        {item.isSingleton && (
                          <span className="ml-auto text-[9px] uppercase tracking-wider text-[#C5A059] opacity-80">Page</span>
                        )}
                        <ChevronRight size={12} className="ml-auto opacity-0 transition-opacity group-hover:opacity-70" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer links */}
          <div className="mt-6 border-t border-white/10 pt-4 space-y-2">
            <Link
              href="/member-page/dashboard"
              className="flex items-center justify-between px-3 py-1 text-xs text-[#78DAA0] hover:text-white transition-colors"
            >
              <span>← Member Dashboard</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 text-xs text-white/70 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <ArrowUpRight size={14} />
                View Public Website
              </span>
              <span className="text-[10px] text-[#C5A059]">Live</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}