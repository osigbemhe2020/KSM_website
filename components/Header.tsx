'use client'
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <a href="#leadership" className="text-gray-700 hover:text-green-700 font-medium transition">
                Home
              </a>
              <a href="#leadership" className="text-gray-700 hover:text-green-700 font-medium transition">
                About us
              </a>
              <a href="#leadership" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our Leadership
              </a>
              <a href="#calendar" className="text-gray-700 hover:text-green-700 font-medium transition">
                Calendar
              </a>
              <a href="#projects" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our projects
              </a>
              <a href="#projects" className="text-gray-700 hover:text-green-700 font-medium transition">
                Our Sub-concils
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-green-700 font-medium transition">
                Photo Gallery
              </a>
              <a href="#outreach" className="text-gray-700 hover:text-green-700 font-medium transition">
               News and Updates
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 font-medium transition">
                Contact us
              </a>
            </div>

            {/* Login Button */}
            <button className="hidden md:block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
              Login
            </button>

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
              <a href="#leadership" className="block text-gray-700 hover:text-green-700 font-medium">
                Leadership
              </a>
              <a href="#calendar" className="block text-gray-700 hover:text-green-700 font-medium">
                Calendar
              </a>
              <a href="#projects" className="block text-gray-700 hover:text-green-700 font-medium">
                Our projects
              </a>
              <a href="#outreach" className="block text-gray-700 hover:text-green-700 font-medium">
                Our outreach
              </a>
              <a href="#membership" className="block text-gray-700 hover:text-green-700 font-medium">
                Membership
              </a>
              <a href="#gallery" className="block text-gray-700 hover:text-green-700 font-medium">
                Photo Gallery
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-green-700 font-medium">
                Contact us
              </a>
              <button className="w-full bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;