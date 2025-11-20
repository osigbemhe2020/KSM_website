"use client";

import Image from "next/image";
import { User,FolderOpen,Mail,Vote,Wallet,Settings,LogOut } from "lucide-react";


type SidebarProps = {
  setScreen: (screen: string) => void;
};

const Sidebar= ({setScreen}:SidebarProps) => {
  
  const navItems = [
       {screen:"Basedata" , icon:<User/>},
       {screen:"Directory" , icon:<FolderOpen/>},
       {screen:"Email" , icon:<Mail/>},
       {screen:"E-voting",icon:<Vote/>},
       {screen:"Payments",icon:<Wallet/>}
  ];
    

  const bottomNavItems = [{screen:"Settings",icon:<Settings/>},
    {screen:"Logout",icon:<LogOut/>}];

  return (
    <aside className="bg-green-700 text-white flex flex-col justify-between h-screen overflow-auto hide-scrollbar relative">
     

      {/* Top Section */}
      <div className="flex flex-col gap-[50px]">
        <figure className="w-full flex items-center justify-center pt-6">
          <Image
            src="/WhatsApp-Image.svg"
            height={80}
            width={100}
            alt="PADOLABS"
          />
        </figure>

        <nav className="space-y-6 p-8  flex flex-col">
          {navItems.map((item,index)=>{
            return(
              <button onClick={()=>setScreen(item.screen)} key={index}>
                <div className="flex items-center gap-4">
                  <span>{item.icon}</span>
                  <span>{item.screen}</span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <nav className="p-8 space-y-6 flex flex-col">
        {bottomNavItems.map((item,index)=>{
          return(
            <button onClick={()=>setScreen(item.screen)} key={item.screen}>
              <div className="flex items-center gap-4">
                <span>{item.icon}</span>
                <span>{item.screen}</span>
              </div>
            </button>
          )
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
