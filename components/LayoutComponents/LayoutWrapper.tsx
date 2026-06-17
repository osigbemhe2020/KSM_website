"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

import sketchImg from "@/assets/cathedral-sketch.png";
import legacy1 from "@/assets/legacy-1.jpg";
import legacy2 from "@/assets/legacy-2.jpg";
import legacy3 from "@/assets/legacy-3.jpg";


function Legacy() {
  return (
    <section className="bg-forest text-white mb-15">
      <div className="relative max-w-7xl mx-auto px-6 md:px-14 py-20 md:py-28 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-10">Become Part of a<br />Living Legacy.</h2>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[legacy1, legacy2, legacy3].map((src, i) => (
                <div key={i} className="aspect-[3/5] overflow-hidden">
                  <img src={src.src} alt="" loading="lazy" width={512} height={800} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-10">
            <p className="text-white/90 leading-relaxed mb-8 max-w-sm">
              Join a brotherhood rooted in faith, dedicated to service, and committed to building a stronger Church and nation.
            </p>
            <a href="#" className="py-2 px-4 border border-white">Begin Your Journey</a>
          </div>
        </div>
        <img src={sketchImg.src} alt="" aria-hidden className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[110%] opacity-15 pointer-events-none" />
      </div>
    </section>
  );
}

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/member-page") || pathname.startsWith("/registration") || pathname.startsWith("/sign-in");
  const isHomePage = pathname === "/";

  return (
    <main className="text-gray-900 bg-cream">
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && !isHomePage && <Legacy />}
      {!hideChrome && <Footer isHomePage={isHomePage} />}
    </main>
  );
}