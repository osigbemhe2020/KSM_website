import { ArrowRight } from "lucide-react";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";

const events = [
  { date: "22 MAR", title: "Metro Council Quarterly General Meeting", desc: "Quarterly meeting of all sub-councils within the Abuja metropolis. All Knights are expected to attend.", loc: "Our Lady Queen of Nigeria Pro-Cathedral, Abuja" },
  { date: "05 APR", title: "Annual Charity Gala & Fundraiser", desc: "Black-tie evening celebrating a year of service and raising funds for the Council's outreach initiatives.", loc: "Transcorp Hilton, Maitama, Abuja" },
  { date: "18 APR", title: "Day of Recollection & Spiritual Retreat", desc: "A day of prayer, reflection, and spiritual renewal for Knights and their families ahead of the Easter season.", loc: "Dominican Retreat House, Lugbe" },
];

function Events() {
  return (
    <section className=" py-20 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-gray-900 text-4xl md:text-5xl text-center mb-14">Upcoming Events</h2>
        <div className="grid grid-cols-12 text-xs tracking-[0.18em] text-gray-600 border-b border-gray-900 pb-4 mb-2">
          <div className="col-span-2">DATE</div>
          <div className="col-span-7">EVENTS</div>
          <div className="col-span-3">LOCATION</div>
        </div>
        {events.map((e) => (
          <div key={e.title} className="grid grid-cols-12 gap-4 py-7 border-b border-gray-900 items-start">
            <div className="col-span-2 font-serif text-sm">{e.date}</div>
            <div className="col-span-7">
              <h3 className="font-serif text-xl mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
            </div>
            <div className="col-span-3 text-sm text-muted-foreground">{e.loc}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-14">
        <Button
          href="/event-calendar"
          className="inline-flex px-6 rounded  w-auto mt-0"
        >
          View full Calendar <span className="ml-2"><ArrowRight /></span>
        </Button>
      </div>
    </section>
  );
}

export default Events;
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const EventCalendarSection = () => {
//   const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
  
//   const events = [
//     { date: 2, title: '25th Annual General assembly' },
//     { date: 9, title: '25th Annual General assembly' },
//     { date: 16, title: '25th Annual General assembly' },
//     { date: 23, title: '26th Annual General assembly' }
//   ];

//   const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//   const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
            
//             <div className="bg-white border rounded-lg p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="font-bold text-lg">November 2025</h3>
//                 <div className="flex gap-2">
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-7 gap-2 text-center mb-2">
//                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                   <div key={day} className="text-xs font-semibold text-gray-600 py-1">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-2">
//                 {Array.from({ length: firstDay }).map((_, idx) => (
//                   <div key={`empty-${idx}`} className="h-[40px] w-[40px]"></div>
//                 ))}
//                 {Array.from({ length: daysInMonth }).map((_, idx) => {
//                   const day = idx + 1;
//                   const hasEvent = events.some(e => e.date === day);
//                   return (
//                     <div
//                       key={day}
//                       className={`h-[40px] w-[40px] flex items-center justify-center text-sm rounded-full ${
//                         hasEvent ? 'bg-green-700 text-white font-bold' : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       {day}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
//               <button className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition">
//                 View full calender &gt; &gt;
//               </button>
//             </div>

//             <div className="space-y-4">
//               {events.map((event, idx) => (
//                 <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-shrink-0 w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">
//                     {event.date}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900">{event.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventCalendarSection;
