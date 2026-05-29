'use client'
import { useState, useEffect,useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import useResponsive from "@/hooks/useResponsive";
import Sidebar from '@/components/LayoutComponents/memberSidebar';
import MemberHeader from '@/components/LayoutComponents/memberHeader';
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { toast } from "react-toastify";

export default function MemberPageLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const { data: authData, isLoading: authLoading } = useGetMe();
  const logoutMutation = useLogout();

  // ✅ ALL useEffects must come before any early returns
  useEffect(() => {
    if (!authLoading && !authData?.user) {
      router.push('/sign-in');
    }
  }, [authData, authLoading, router]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSidebarOpen]);

  const handleNavigate = (path: string) => router.push(path);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/');
        toast.success("Logged out successfully!");
      },
      onError: (error) => {
        router.push('/sign-in');
        toast.error("Logout failed. Please try again.");
      }
    });
  };

  const isProfilePage = pathname.startsWith('/member-page/directory/');
  const isMembershipPage = pathname.startsWith('/member-page/basedata/');

  const getPageTitle = (path: string) => {
    const pathMap: Record<string, string> = {
      '/member-page/dashboard': 'Dashboard',
      '/member-page/basedata': 'My Membership',
      '/member-page/directory': 'Membership Directory',
      '/member-page/documents': 'Documents',
      '/member-page/payments': 'Payments',
      '/member-page/settings': 'Profile & Settings',
    };
    return pathMap[path] || 'Dashboard';
  };

  // ✅ Early returns AFTER all hooks
  if (authLoading) return <div>Loading...</div>;
  if (!authData?.user) return null;

  return (
    <div className="relative flex h-screen overflow-hidden">

        {/* Mobile overlay */}
        {(isMobile || isTablet) && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 w-[80%] max-w-[304px]
            transform transition-transform duration-300 ease-in-out  
            lg:translate-x-0 lg:w-[20%] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[100%]'} 
            lg:static lg:inset-0 lg:z-auto`}
        >
          <Sidebar 
            authData={authData} 
            authLoading={authLoading} 
            onLogout={handleLogout}
            pathname={pathname}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          {/* Hamburger menu button for mobile/tablet */}
          {(isMobile || isTablet) && (
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="fixed top-10 left-4 z-30 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {/* Sticky header within main content */}
          <div className="sticky top-0 z-10 bg-white">
            <MemberHeader authData={authData} authLoading={authLoading} />
          </div>

          <main className={`${(isMobile || isTablet) ? 'px-[20px] py-[30px]' : 'px-[32px] py-[46px]'} bg-gray-100 flex-1`}>
            {isProfilePage ? (
              <button
                onClick={() => router.push('/member-page/directory')}
                className={`flex items-center gap-2 text-[#5A5A5A] hover:text-[#2D2D2D] ${(isMobile || isTablet) ? 'mb-[20px]' : 'mb-[50px]'}`}
              >
                <ArrowLeft size={20} />
                <span className="text-[32px]/[1.2] font-400">Membership Directory</span>
              </button>
            ) : isMembershipPage ? (
              <button
                onClick={() => router.push('/member-page/basedata')}
                className={`flex items-center gap-2 text-[#5A5A5A] hover:text-[#2D2D2D] ${(isMobile || isTablet) ? 'mb-[20px]' : 'mb-[50px]'}`}
              >
                <ArrowLeft size={20} />
                <span className="text-[32px]/[1.2] font-400">My Membership</span>
              </button>
            ) : (
              <h1 className={`text-[32px]/[1.2] text-black font-400 ${(isMobile || isTablet) ? 'mb-[20px]' : 'mb-[50px]'}`}>{getPageTitle(pathname)}</h1>
            )}
            {children}
          </main>
        </div>

      </div>
  );
}