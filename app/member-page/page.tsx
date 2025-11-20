'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/LayoutComponents/memberSidebar';
import MemberHeader from '@/components/LayoutComponents/memberHeader';
import Basedata from '@/components/membersScreens/basedata';
import Directory from '@/components/membersScreens/directory';
import Email from '@/components/membersScreens/email';
import EVoting from '@/components/membersScreens/e-voting';
import Payment from '@/components/membersScreens/payment';


{/*onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} */}
{/*onCloseMobile={() => setSidebarOpen(false)}*/}


const MemberLayout = () => {
  const [screen, setScreen] = useState("Basedata");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar if clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSidebarOpen]);

  return (
    <div className="relative flex h-screen overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-5 w-58 transform bg-white transition-transform duration-300 ease-in-out  lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[100%]'
          } lg:static lg:inset-0`}
      >
        <Sidebar setScreen={setScreen} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
      <MemberHeader/>
        <main className="p-[0px] py-[20px] bg-gray-100 flex-1">
             {screen === "Basedata" && <Basedata />}
             {screen === "Directory" && <Directory />}
             {screen === "Email" && <Email />}
             {screen === "E-voting" && <EVoting />}
             {screen === "Payments" && <Payment />}
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
