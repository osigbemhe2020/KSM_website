// 'use client';

// import React, { useState } from 'react';
// import { Heart, User } from 'lucide-react';

// export default function DonationForm() {
//   const [amount, setAmount] = useState('25');
//   const [customAmount, setCustomAmount] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('credit');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [project, setProject] = useState('');

//   const amounts = ['50,000', '100,000', '250,000', '500,000'];

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto px-4 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
//           <p className="text-gray-600">
//             Your generous donation helps us continue our work in leadership development and community service. Every contribution makes a difference.
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-8">
//           {/* Donation Amount */}
//           <div className="mb-8">
//             <h2 className="font-serif text-5xl text-foreground mb-6">Choose Your Donation Amount</h2>
//             <div className="grid grid-cols-4 gap-3 mb-4">
//               {amounts.map((amt) => (
//                 <button
//                   key={amt}
//                   onClick={() => {
//                     setAmount(amt);
//                     setCustomAmount('');
//                   }}
//                   className={`py-3 px-4 rounded font-medium transition-colors N{
//                     amount === amt && !customAmount
//                       ? 'bg-emerald-500 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   ${amt}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() => {
//                   setAmount('other');
//                   setCustomAmount('');
//                 }}
//                 className={`py-3 px-4 rounded font-medium transition-colors ${
//                   amount === 'other' && !customAmount
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Other
//               </button>
//               <input
//                 type="text"
//                 placeholder="$ Enter amount"
//                 value={customAmount}
//                 onChange={(e) => {
//                   setCustomAmount(e.target.value);
//                   setAmount('custom');
//                 }}
//                 className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="mb-8">
//             <h2 className="font-serif text-5xl text-foreground mb-6">Payment Method</h2>
//             <div className="grid grid-cols-3 gap-3 mb-6">
//               <button
//                 onClick={() => setPaymentMethod('credit')}
//                 className={`py-3 px-4 rounded font-medium transition-colors ${
//                   paymentMethod === 'credit'
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Credit Card
//               </button>
//               <button
//                 onClick={() => setPaymentMethod('paypal')}
//                 className={`py-3 px-4 rounded font-medium transition-colors ${
//                   paymentMethod === 'paypal'
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 PayPal
//               </button>
//               <button
//                 onClick={() => setPaymentMethod('bank')}
//                 className={`py-3 px-4 rounded font-medium transition-colors ${
//                   paymentMethod === 'bank'
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Bank Transfer
//               </button>
//             </div>

//             {/* Credit Card Form */}
//             {paymentMethod === 'credit' && (
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                   className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Expiry Date (MM/YY)"
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value)}
//                     className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="CVV"
//                     value={cvv}
//                     onChange={(e) => setCvv(e.target.value)}
//                     className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Name on Card"
//                   value={nameOnCard}
//                   onChange={(e) => setNameOnCard(e.target.value)}
//                   className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Optional Project Selection */}
//           <div className="mb-8">
//             <h2 className="font-serif text-5xl text-foreground mb-6">Optional: Link Your Donation</h2>
//             <select
//               value={project}
//               onChange={(e) => setProject(e.target.value)}
//               className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
//             >
//               <option value="">Select a Project (Optional)</option>
//               <option value="education">Education Initiative</option>
//               <option value="healthcare">Healthcare Program</option>
//               <option value="community">Community Development</option>
//             </select>
//           </div>

//           {/* Security Note */}
//           <div className="mb-6 text-center">
//             <p className="text-sm text-gray-500">
//               Your donation will be securely processed. Thank you for your support!
//             </p>
//           </div>

//           {/* Donate Button */}
//           <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded font-medium hover:bg-emerald-600 transition-colors">
//             Donate Now
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';
import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";

const placeholders = [leader1.src, leader2.src, leader3.src];

type Impact = { t: string; d: string; metric: string; sub: string };
const impacts: Impact[] = [
  { t: "Community Outreach", d: "Food, medical, and welfare missions across the FCT.", metric: "12,400+", sub: "BENEFICIARIES IN 2024" },
  { t: "Youth Development", d: "Mentorship and faith formation for the next generation.", metric: "180", sub: "YOUNG LEADERS MENTORED" },
  { t: "Educational Support", d: "Tuition and books for promising students in need.", metric: "₦14M", sub: "IN SCHOLARSHIPS AWARDED" },
  { t: "Welfare Assistance", d: "Relief for widows, orphans, and the sick.", metric: "320", sub: "FAMILIES SUPPORTED" },
  { t: "Parish Development", d: "Liturgical support and infrastructure for local churches.", metric: "24", sub: "PARISHES ASSISTED" },
];

function Tangible() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4">WHERE YOUR GIFT GOES</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">A Tangible<br />Inheritance of Service</h2>
        <p className="text-sm text-muted-foreground max-w-md mb-10 leading-relaxed">
          Every donation, however modest, becomes a tangible act of charity carried to homes, parishes, and classrooms across the Federal Capital Territory.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {impacts.map((i, index) => (
            <ProfileCard
              key={i.t}
              imageSrc={placeholders[index % 3]}
              name={i.t}
              description={i.d}
              footerNode={
                <>
                  <div className="font-serif text-2xl text-forest">{i.metric}</div>
                  <div className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">{i.sub}</div>
                </>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const presets = [5000, 10000, 25000, 50000];

function Donate() {
  const [amount, setAmount] = useState<number | "">(10000);
  const [custom, setCustom] = useState("");
  const [dedication, setDedication] = useState("");

  return (
    <section className="bg-cream pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 border border-border">
          <div className="bg-forest p-10 hidden md:block" />
          <div className="bg-background p-10 md:p-12">
            <h2 className="font-serif text-5xl text-foreground mb-6">Make a Donation</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Every donation, no matter how big or small, makes a significant difference to our cause. Thank you for doing your part to help.
            </p>

            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">DONATION AMOUNT</p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setAmount(p); setCustom(""); }}
                  className={`py-3 text-sm border transition-colors ${amount === p ? "bg-forest text-white border-forest" : "border-border hover:border-forest"}`}
                >
                  ₦{p.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-8">
              <input
                type="number"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setAmount(e.target.value ? Number(e.target.value) : ""); }}
                placeholder="₦100,000"
                className="flex-1 px-3 py-3 text-sm border border-border bg-background focus:outline-none focus:border-forest"
              />
              <span className="text-xs text-muted-foreground">Amount</span>
            </div>

            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">DEDICATION OR INTENTION (OPTIONAL)</p>
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="In memory of, in honor of…"
              className="w-full px-3 py-3 text-sm border border-border bg-background focus:outline-none focus:border-forest mb-8"
            />

            <button type="button" className="w-full bg-forest text-white py-4 text-sm tracking-[0.15em] hover:bg-forest-deep transition-colors">
              CONTINUE TO PAYMENT
            </button>
            <p className="text-[10px] text-muted-foreground mt-4 text-center">
              Secured giving. All donations are acknowledged with a receipt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testmonial() {
  return (
    <section className="bg-cream py-10">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4">TESTIMONIALS</p>
        <h2 className="font-serif text-5xl text-foreground mb-6">What Our Beneficiaries Say</h2>
        <div className="grid md:grid-cols-2 h-100  gap-10 ">
          <div className="bg-forest h-full w-[451px] min-h-100 hidden md:block" />
          <div>

            <p className="font-serif text-xl mb-6 text-foreground/90 leading-snug ">
              "When the Knights came to our parish, they did not arrive as benefactors but as brothers. Their quiet
              generosity carried my son through university — a gift our family will pray for, always."
            </p>
            <p className="font-bold text-lg">
              Mrs. Adeze
            </p>
            <p className="text-xs text-muted-foreground">
              Beneficiary, Abuja charity Outreach
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

function DonatePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Tangible />
      <Donate />
      <Testmonial />
    </main>
  );
}

export default DonatePage;
