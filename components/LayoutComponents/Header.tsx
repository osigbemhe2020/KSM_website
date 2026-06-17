'use client';
import Image from 'next/image';
import logo from '@/assets/ksm-logo.jpg';
import { useState, useRef } from 'react';
import { useGetMe } from '@/hooks/auth.hook';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// ── Nav config ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Who We Are',
    children: [
      { label: 'Mission & Vision', href: '/our-mission' },
      { label: 'History', href: '/history' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Our Patron Saint', href: '/st.mulumba' },
      { label: 'Our Founder', href: '/ourFounder' },
      { label: 'Organization Structure', href: '/structure' },
      { label: 'Committees', href: '/comittees' },

    ],
  },
  {
    label: 'What We Do',
    children: [
      { label: 'Charity & Outreach', href: '/charity' },
      { label: 'Projects & Infrastructure', href: '/projects' },
      { label: 'Insurance & Financial', href: '#insurance-financial-services' },
      { label: 'Metro Investments', href: '#metro-investments' },
    ],
  },
  {
    label: 'Get Involved',
    children: [
      { label: 'Join Us', href: '#join' },
      { label: 'Member Benefits', href: '#membership' },
      { label: 'Find A Sub-Council', href: '#sub-concils' },
      { label: 'Our Sub-Councils', href: '/sub-concils' },
      { label: 'Calendar', href: '/event-calendar' },
      { label: 'Donate', href: '/donate' },
      { label: 'YSM', href: '#ysm' },
      { label: 'LSM', href: '#lsm' },
    ],
  },
  {
    label: 'Photo Gallery',
    href: '/photo-gallery',   // no dropdown
  },
  {
    label: 'News & Updates',
    href: '/news-and-updates',      // no dropdown
  },

  {
    label: 'Contact Us',
    href: '/contact-us',   // no dropdown
  },
];

// ── Desktop Dropdown Item ─────────────────────────────────────────────────────

const DesktopNavItem = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleClick = () => {
    if (item.children) setIsOpen((prev) => !prev);
  };

  if (!item.children) {
    return (
      <a href={item.href ?? '#'} className="hover:text-white transition-colors">
        {item.label}
      </a>
    );
  }

  return (
    <div
      className="relative bg-forest text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        onClick={handleClick}
        className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {item.children.map((child) => (
            <li key={child.label}>
              <a
                href={child.href}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-forest hover:text-white transition-colors"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── Mobile Accordion Item ─────────────────────────────────────────────────────

const MobileNavItem = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <a
        href={item.href ?? '#'}
        onClick={onClose}
        className="block py-2 text-white/90 hover:text-white transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      {/* Accordion trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2 text-white/90 hover:text-white transition-colors focus:outline-none"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Accordion children */}
      {isOpen && (
        <ul className="pl-4 border-l border-white/20 mb-1">
          {item.children.map((child) => (
            <li key={child.label}>
              <a
                href={child.href}
                onClick={onClose}
                className="block py-1.5 text-sm text-white/75 hover:text-white transition-colors"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: authData } = useGetMe();
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLoginClick = () => {
    if (authData?.user) {
      router.push('/member-page');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <header className=" z-20 bg-forest">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <Image src={logo} alt="KSM crest" className="h-10 w-10" width={40} height={40} />
          <div className="text-white leading-tight">
            <div className="font-serif text-base">Knights of St. Mulumba</div>
            <div className="text-[10px] tracking-[0.2em] opacity-80">METRO COUNCIL ABUJA</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-white/90">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={handleLoginClick}
          className="hidden lg:inline-flex items-center px-4 py-2 border border-white/60 text-white text-sm hover:bg-white/10 transition-colors"
        >
          Membership Portal
        </button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-forest/95 backdrop-blur-sm px-6 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <MobileNavItem key={item.label} item={item} onClose={closeMenu} />
          ))}
          <div className="pt-3 border-t border-white/20">
            <button
              onClick={() => { handleLoginClick(); closeMenu(); }}
              className="w-full px-4 py-2 border border-white/60 text-white text-sm hover:bg-white/10 transition-colors"
            >
              Membership Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


// import { useState} from "react";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useGetMe } from "@/hooks/auth.hook";


// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { data: authData} = useGetMe();
//   const router = useRouter();

//   const closeMenu = () => setIsMenuOpen(false);

//   const handleLoginClick = () => {
//     if (authData?.user) {
//       router.push('/member-page');
//     } else {
//       router.push('/sign-in');
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       {/* Top Bar with Logo */}
//       <div className="bg-green-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                 <div className="w-10 h-10 bg-green-700 rounded-full"></div>
//               </div>
//               <div className="text-white">
//                 <h1 className="text-lg font-bold">KNIGHTS OF</h1>
//                 <p className="text-sm">ST. MULUMBA COUNCIL</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
//           <div className="flex justify-between items-center gap-10 h-16">
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-6 items-center flex-1 justify-between">
//               <Link href="/" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Home
//               </Link>
//               <div className="relative group">
//                 <button type="button" aria-haspopup="menu" className="text-gray-700 group-hover:text-green-700 font-medium transition inline-flex items-center select-none focus:outline-none">
//                   Who we are
//                   <svg className="ml-1 h-4 w-4 text-gray-500 group-hover:text-green-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//                 <div className="absolute left-0 top-full mt-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 hidden group-hover:block group-focus-within:block z-50">
//                   <div className="py-2">
//                     <Link href="/about-me" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
//                       History
//                     </Link>
//                     <Link href="/st.mulumba" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
//                       St. Mulumba
//                     </Link>
//                     <Link href="/our-mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
//                       Our Mission
//                     </Link>
//                     <Link href="/how-to-join" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
//                       How to join
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               {/* <Link href="/leadership" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Our Leadership
//               </Link> */}
//               <Link  href="/projects" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 What we do
//               </Link>
//               <Link href="/event-calendar" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Calendar
//               </Link>
//               <Link href="/sub-concils" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Get Involved
//               </Link>
//               <Link href="/photo-gallery" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Photo Gallery
//               </Link>
//               <Link href="/news-and-updates" className="text-gray-700 hover:text-green-700 font-medium transition">
//                News and Updates
//               </Link>
//               <Link href="/contact-us" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Contact us
//               </Link>
//               <Link href="/" className="text-gray-700 hover:text-green-700 font-medium transition">
//                 Donate
//               </Link>
//             </div>

//             {/* Login Button */}
//             <button 
//               onClick={handleLoginClick}
//               className="hidden md:block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
//             >
//               {authData?.user ? 'Dashboard' : 'Login'}
//             </button>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-gray-700 hover:text-green-700"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4 space-y-3">
//               <Link href="/" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Home
//               </Link>
//               <div className="space-y-2">
//                 <p className="text-gray-700 hover:text-green-700 font-medium">About us</p>
//                 <div className="ml-4 space-y-2">
//                   <Link href="/about-me" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
//                     History
//                   </Link>
//                   <Link href="/st.mulumba" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
//                     St. Mulumba
//                   </Link>
//                   <Link href="/our-mission" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
//                     Our Mission
//                   </Link>
//                   <Link href="/how-to-join" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
//                     How to join
//                   </Link>
//                 </div>
//               </div>
//               <Link href="/leadership" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Our Leadership
//               </Link>
//               <Link href="/event-calendar" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Calendar
//               </Link>
//               <Link href="/projects" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Our projects
//               </Link>
//               <Link href="/sub-concils" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Our Sub-concils
//               </Link>
//               <Link href="/photo-gallery" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Photo Gallery
//               </Link>
//               <Link href="/news-and-updates" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 News and Updates
//               </Link>
//               <Link href="/contact-us" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
//                 Contact us
//               </Link>
//               <button 
//                 onClick={() => {
//                   handleLoginClick();
//                   closeMenu();
//                 }}
//                 className="w-full bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
//               >
//                 {authData?.user ? 'Dashboard' : 'Login'}
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

export default Header;