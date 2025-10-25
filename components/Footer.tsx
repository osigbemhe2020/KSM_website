const Footer = () => {
  return (
    <footer className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-green-100 text-sm leading-relaxed">
              The Knights of St. Mulumba is a Catholic organization dedicated to the spiritual and social development of its members and the broader community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#leadership" className="text-green-100 hover:text-white transition">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#membership" className="text-green-100 hover:text-white transition">
                  Membership
                </a>
              </li>
              <li>
                <a href="#projects" className="text-green-100 hover:text-white transition">
                  Our Projects
                </a>
              </li>
              <li>
                <a href="#calendar" className="text-green-100 hover:text-white transition">
                  Event Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>Email: info@ksm.org</li>
              <li>Phone: +234 XXX XXX XXXX</li>
              <li>Address: Abuja, Nigeria</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-green-100 text-sm mb-3">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l text-gray-900 text-sm focus:outline-none"
              />
              <button className="bg-green-900 px-4 py-2 rounded-r hover:bg-green-950 transition text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-600 mt-8 pt-8 text-center text-sm text-green-100">
          <p>&copy; 2025 Knights of St. Mulumba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;