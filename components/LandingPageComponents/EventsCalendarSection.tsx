'use client';

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";

type Event = {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
};

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const allEvents = await client.fetch<Event[]>(eventsQuery);
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Upcoming events (today or future), sorted chronologically
        const upcoming = allEvents
          .filter((e) => new Date(e.endDate || e.startDate) >= startOfToday)
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
          .slice(0, 3);

        setEvents(upcoming.length > 0 ? upcoming : allEvents.slice(0, 3));
        setError(false);
      } catch (error) {
        console.error("Failed to fetch events for landing page:", error);
        setError(true);
        // Fallback to sample events if query fails
        setEvents([
          {
            _id: 'fallback-1',
            title: 'Annual General Assembly',
            startDate: new Date().toISOString(),
            location: 'Metro Council Hall',
            description: 'Join us for our annual general assembly.'
          },
          {
            _id: 'fallback-2',
            title: 'Charity Food Drive',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Various Locations',
            description: 'Community outreach program serving families in need.'
          },
          {
            _id: 'fallback-3',
            title: 'Youth Formation Retreat',
            startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Youth Center',
            description: 'Spiritual formation program for young Catholics.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  };

  return (
    <section className="py-20 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-gray-900 text-4xl md:text-5xl text-center mb-14">Upcoming Events</h2>
        <div className="grid grid-cols-12 text-xs tracking-[0.18em] text-gray-600 border-b border-gray-900 pb-4 mb-2">
          <div className="col-span-2">DATE</div>
          <div className="col-span-7">EVENTS</div>
          <div className="col-span-3">LOCATION</div>
        </div>
        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">No upcoming events scheduled at this time.</div>
        ) : (
          events.map((e) => (
            <div key={e._id || e.title} className="grid grid-cols-12 gap-4 py-7 border-b border-gray-900 items-start">
              <div className="col-span-2 font-serif text-sm">{formatEventDate(e.startDate)}</div>
              <div className="col-span-7">
                <h3 className="font-serif text-xl mb-1">{e.title}</h3>
                {e.description && <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>}
              </div>
              <div className="col-span-3 text-sm text-muted-foreground">{e.location || 'TBD'}</div>
            </div>
          ))
        )}
        {error && (
          <div className="text-center text-xs text-gray-500 mt-2 italic">
            Showing sample events — check Sanity connection
          </div>
        )}
      </div>
      <div className="text-center mt-14">
        <Button
          href="/event-calendar"
          className="inline-flex px-6 rounded w-auto mt-0"
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
