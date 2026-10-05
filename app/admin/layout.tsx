'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { ADMIN_CATEGORIES } from "@/lib/adminResources";
import { useGetMe } from "@/hooks/auth.hook";
import MemberHeader from '@/components/LayoutComponents/memberHeader';

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: authData, isLoading: authLoading } = useGetMe();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !authData?.user) {
      router.push('/sign-in');
    }
  }, [authData, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;
  if (!authData?.user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0 h-[96px]">
        <MemberHeader authData={authData} authLoading={authLoading} />
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed bottom-4 right-4 z-50 bg-forest text-white p-3 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-50 bg-[#1B382B] text-white w-72 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:h-[calc(100vh-96px)] md:w-72 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                          onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
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
        <div className="min-w-0 flex-1 bg-[#FDFBF7] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
