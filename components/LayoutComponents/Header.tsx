'use client'
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar with Logo */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-green-700 rounded-full"></div>
              </div>
              <div className="text-white">
                <h1 className="text-lg font-bold">KNIGHTS OF</h1>
                <p className="text-sm">ST. MULUMBA COUNCIL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between items-center gap-10 h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 items-center flex-1 justify-between">
              <Link href="/" className="text-gray-700 hover:text-green-700 font-medium transition">
                Home
              </Link>
              <div className="relative group">
                <button type="button" aria-haspopup="menu" className="text-gray-700 group-hover:text-green-700 font-medium transition inline-flex items-center select-none focus:outline-none">
                  About us
                  <svg className="ml-1 h-4 w-4 text-gray-500 group-hover:text-green-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full mt-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 hidden group-hover:block group-focus-within:block z-50">
                  <div className="py-2">
                    <Link href="/about-me" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
                      History
                    </Link>
                    <Link href="/st.mulumba" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
                      St. Mulumba
                    </Link>
                    <Link href="/our-mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
                      Our Mission
                    </Link>
                    <Link href="/how-to-join" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition">
                      How to join
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/leadership" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our Leadership
              </Link>
              <Link href="/event-calendar" className="text-gray-700 hover:text-green-700 font-medium transition">
                Calendar
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our projects
              </Link>
              <Link href="/sub-concils" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our Sub-concils
              </Link>
              <Link href="/photo-gallery" className="text-gray-700 hover:text-green-700 font-medium transition">
                Photo Gallery
              </Link>
              <Link href="/news-and-updates" className="text-gray-700 hover:text-green-700 font-medium transition">
               News and Updates
              </Link>
              <Link href="/contact-us" className="text-gray-700 hover:text-green-700 font-medium transition">
                Contact us
              </Link>
            </div>

            {/* Login Button */}
            <Link href="/sign-in"><button className="hidden md:block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
              Login
            </button></Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Home
              </Link>
              <div className="space-y-2">
                <p className="text-gray-700 hover:text-green-700 font-medium">About us</p>
                <div className="ml-4 space-y-2">
                  <Link href="/about-me" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
                    History
                  </Link>
                  <Link href="/st.mulumba" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
                    St. Mulumba
                  </Link>
                  <Link href="/our-mission" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
                    Our Mission
                  </Link>
                  <Link href="/how-to-join" className="block text-sm text-gray-600 hover:text-green-700" onClick={closeMenu}>
                    How to join
                  </Link>
                </div>
              </div>
              <Link href="/leadership" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Our Leadership
              </Link>
              <Link href="/event-calendar" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Calendar
              </Link>
              <Link href="/projects" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Our projects
              </Link>
              <Link href="/sub-concils" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Our Sub-concils
              </Link>
              <Link href="/photo-gallery" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Photo Gallery
              </Link>
              <Link href="/news-and-updates" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                News and Updates
              </Link>
              <Link href="/contact-us" className="block text-gray-700 hover:text-green-700 font-medium" onClick={closeMenu}>
                Contact us
              </Link>
              <Link href="/sign-in" onClick={closeMenu}>
                <button className="w-full bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;