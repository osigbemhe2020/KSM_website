"use client";

import { User,Users,LayoutDashboard, Files, Wallet, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  authData?: {
    user?: {
      firstName?: string;
      lastName?: string;
    };
  };
  authLoading?: boolean;
  onLogout?: () => void;
  pathname?: string;
  onNavigate?: (path: string) => void;
}

const Sidebar = ({ authData, authLoading, onLogout, pathname = '', onNavigate }: SidebarProps) => {

  const navItems = [
    { screen: "Dashboard", path: "/member-page/dashboard", icon: <LayoutDashboard /> },
    { screen: "My Membership", path: "/member-page/basedata", icon: <User /> },
    { screen: "Membership Directory", path: "/member-page/directory", icon: <Users /> },
    { screen: "Documents", path: "/member-page/documents", icon: <Files /> },
    { screen: "Payments", path: "/member-page/payments", icon: <Wallet /> },
  ];

  const bottomNavItems = [
    { screen: "Settings", path: "/member-page/settings", icon: <Settings /> },
    { screen: "Logout", action: "logout", icon: <LogOut /> },
  ];

  const NavButton = ({ item }: { item: { screen: string; path?: string; action?: string; icon: React.ReactNode } }) => {
    const isActive = item.path ? (pathname === item.path || pathname.startsWith(item.path + '/')) : false;
    
    const handleClick = () => {
      if (item.action === 'logout') {
        onLogout?.();
      } else if (item.path) {
        onNavigate?.(item.path);
      }
    };

    return (
      <button onClick={handleClick} key={item.screen}>
        <div className={`flex items-center p-2 gap-1 w-[95%] 
          ${isActive ? 'bg-[#78DAA0] text-[#2D2D2D] rounded-lg' : 'text-[#5A5A5A] bg-transparent'}
          hover:bg-[#78DAA0] hover:text-[#2D2D2D] hover:rounded-lg`}
        >
          <span className="text-[14px]">{item.icon}</span>
          <span className="text-[14px]/[1.2]">{item.screen}</span>
        </div>
      </button>
    );
  };

  return (
    <aside className="bg-[#D4F4E1] w-full p-[24px] 
    text-black flex flex-col justify-between h-screen 
    overflow-auto hide-scrollbar relative">

      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <p className="text-[13px]/[1.2] text-[#2D2D2D]">KNIGHTS OF ST.MULUMBA<br />METRO CONCIL</p>
        </div>

        <div>
          <p className="text-[25px]/[1.2] text-[#2D2D2D]">
            Welcome, Sir {authLoading ? "..." : authData?.user?.firstName || "John"} {authLoading ? "" : authData?.user?.lastName || "Doe"}
          </p>
        </div>

        <nav className="space-y-4 flex flex-col">
          {navItems.map((item) => <NavButton key={item.screen} item={item} />)}
        </nav>
      </div>

      {/* Bottom Section */}
      <nav className="space-y-4 flex flex-col">
        {bottomNavItems.map((item) => <NavButton key={item.screen} item={item} />)}
      </nav>
    </aside>
  );
};

export default Sidebar;