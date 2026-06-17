
import logo from "@/assets/ksm-logo.jpg";

function Footer({ isHomePage }: { isHomePage: boolean }) {
  const cols = [
    { h: "Who We Are", links: ["The Knights Of St. Mulumba Metro Council Abuja Is The Coordinating Body For All KSM Sub-Councils Within The Federal Capital Territory."], paragraph: true },
    { h: "What We Do", links: ["Charity & Outreach", "Projects & Infastructure", "Metro Investments"] },
    { h: "Get Involved", links: ["Join the Order", "Upcoming Events", "Donate"] },
  ];
  return (
    <footer className={`${isHomePage ? "bg-forest text-white" : "bg-cream text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-1 flex items-start gap-3">
          <img src={logo.src} alt="KSM" className="h-12 w-12" width={48} height={48} />
          <div className="font-serif leading-tight">
            <div className="text-xl">Knights of</div>
            <div className="text-xl">St. Mulumba</div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="font-serif text-base mb-4">{c.h}</h4>
            {c.paragraph ? (
              <p className="text-xs text-muted-foreground leading-relaxed">{c.links[0]}</p>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => <li key={l}><a href="#" className="hover:text-forest">{l}</a></li>)}
              </ul>
            )}
          </div>
        ))}
        <div>
          <h4 className="font-serif text-base mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>◷ Catholic Secretariat, Abuja, FCT, Nigeria</li>
            <li>✉ info@ksmabuja.org</li>
            <li>☏ +234 (0) 900 000 0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 Knights Of St. Mulumba, Metro Council Abuja. All Rights Reserved.
      </div>
    </footer>
  );
}
// const Footer = () => {
//   return (
//     <footer className="bg-green-700 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">About Us</h3>
//             <p className="text-green-100 text-sm leading-relaxed">
//               The Knights of St. Mulumba is a Catholic organization dedicated to the spiritual and social development of its members and the broader community.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a href="#leadership" className="text-green-100 hover:text-white transition">
//                   Leadership
//                 </a>
//               </li>
//               <li>
//                 <a href="#membership" className="text-green-100 hover:text-white transition">
//                   Membership
//                 </a>
//               </li>
//               <li>
//                 <a href="#projects" className="text-green-100 hover:text-white transition">
//                   Our Projects
//                 </a>
//               </li>
//               <li>
//                 <a href="#calendar" className="text-green-100 hover:text-white transition">
//                   Event Calendar
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-2 text-sm text-green-100">
//               <li>Email: info@ksm.org</li>
//               <li>Phone: +234 XXX XXX XXXX</li>
//               <li>Address: Abuja, Nigeria</li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Newsletter</h3>
//             <p className="text-green-100 text-sm mb-3">
//               Subscribe to our newsletter for updates
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="flex-1 px-3 py-2 rounded-l text-gray-900 text-sm focus:outline-none"
//               />
//               <button className="bg-green-900 px-4 py-2 rounded-r hover:bg-green-950 transition text-sm">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-green-600 mt-8 pt-8 text-center text-sm text-green-100">
//           <p>&copy; 2025 Knights of St. Mulumba. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

export default Footer;