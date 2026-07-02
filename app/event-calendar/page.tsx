
// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"



// interface Event {
//   id: string
//   dateRange: string
//   date: string
//   dayOfWeek: string
//   dayNumber: number
//   title: string
//   description: string
//   location: string
//   section: string
// }

// const mockEvents: Event[] = [
//   {
//     id: "1",
//     dateRange: "November 11, 2025 - November 13, 2025",
//     date: "November 11, 2025",
//     dayOfWeek: "Wed",
//     dayNumber: 11,
//     title: "2025 Supreme Convention",
//     description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
//     location: "Abuja",
//     section: "Section 31",
//   },
//   {
//     id: "2",
//     dateRange: "November 20, 2025",
//     date: "November 20, 2025",
//     dayOfWeek: "Wed",
//     dayNumber: 20,
//     title: "25th Metro Council Meeting",
//     description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
//     location: "Abuja",
//     section: "Section 32",
//   },
//   {
//     id: "3",
//     dateRange: "November 27, 2025",
//     date: "November 27, 2025",
//     dayOfWeek: "Wed",
//     dayNumber: 27,
//     title: "25th Metro Council Meeting",
//     description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
//     location: "Abuja",
//     section: "Section 33",
//   },
// ]

// export default function EventCalendar() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [currentDate] = useState(new Date("2025-07-10"))
//   const [filterOpen, setFilterOpen] = useState(false)

//   const filteredEvents = mockEvents.filter(
//     (event) =>
//       event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       event.location.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   return (
//     <div className="flex flex-col min-h-screen bg-white">

//       <div className="p-6">
//         <h1 className="text-center text-3xl font-bold mb-6 text-foreground">Event Calendar</h1>
//         <div className="flex gap-2 mb-6 max-w-[900px] mx-auto" >
//           <input
//             type="text"
//             placeholder="search event"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 px-4 py-2 bg-gray-200 rounded border border-border"
//           />
//           <button className="bg-green-600 hover:bg-green-700 text-white px-6">Find event</button>
//         </div>
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center gap-6 py-4 justify-start">
//             <div className="flex items-center gap-3">
//               <div className="text-sm font-medium">
//                 <div>Today:</div>
//                 <div>
//                   {currentDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold">Upcoming</span>
//               <button
//                 onClick={() => setFilterOpen(!filterOpen)}
//                 className="p-2 hover:bg-muted rounded-lg transition-colors"
//               >
//                 <ChevronDown className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//         {/* Events List */}
//        <div className="flex-1 py-6  w-full">
//           {filteredEvents.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No events found</p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               <div className="relative">
//                 <h2 className="font-serif text-5xl text-foreground mb-6">November 2025</h2>
//                   <div className="space-y-6">
//                   {filteredEvents.map((event) => (
//                     <div key={event.id} className="flex justify-between gap-20 border-b border-black/20 py-4">
//                       {/* Left Section */}
//                       <div className="flex flex-col items-center min-w-fit">
//                         <div className="text-sm font-semibold text-muted-foreground mb-2">{event.dayOfWeek}</div>
//                         <div className="text-3xl font-bold text-foreground mb-4">{event.dayNumber}</div>
//                         <div className="text-xs font-medium bg-muted px-2 py-1 rounded text-foreground">
//                           {event.section}
//                         </div>
//                       </div>

//                       {/* Right Section */}
//                       <div className="flex-1">
//                         <div className="text-sm text-muted-foreground mb-1">{event.dateRange}</div>
//                         <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
//                         <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         </div>
//     </div>
//     </div>
//     )
//   }
"use client";
import React, { useState } from "react";
import { MapPin, Clock, Search, ChevronRight, ChevronDown } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

type Filter = "Upcoming" | "Today" | "Next Month" | "This Month" | "Past";

const filters: Filter[] = ["Upcoming", "This Month", "Next Month", "Past"];

const events = [
  {
    month: "JUN",
    day: "14",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "Upcoming",
  },
  {
    month: "JUN",
    day: "14",
    year: "2025",
    title: "Sub-Council Grand Knight's Leadership Forum",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "Upcoming",
  },
  {
    month: "JUN",
    day: "16",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "This Week",
  },
  {
    month: "JUN",
    day: "16",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "This Week",
  },
  {
    month: "JUN",
    day: "16",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "10:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "This Month",
  },
  {
    month: "JUN",
    day: "14",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "Upcoming",
  },
  {
    month: "JUN",
    day: "14",
    year: "2025",
    title: "Annual Metro Council Mass & Investiture Ceremony",
    location: "St. Andrew's Cathedral, Wuse, Abuja FCT",
    time: "11:00 AM",
    desc: "The most significant annual gathering of the Knights of St. Mulumba Metro Council. All members, Sub-Councils, YSM and LSM are expected to attend.",
    tag: "Past",
  },
];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = events.filter((ev) => {
    const matchesFilter = activeFilter === "Upcoming" || ev.tag === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Hero */}
      <WhoWeAreHero
        title="Our Calendar"
        description="Stay connected with upcoming events, across the Knights of St. Mulumba Metro Council Abuja."
      />

      {/* Upcoming Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-5xl text-foreground mb-6 text-center">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-sm">
              Highlighted events across the Metro Church, Sub-Councils
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-events"
                className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-forest focus:border-forest shadow-sm"
              />
            </div>
            <button
              data-testid="button-search"
              className="px-10 py-3 bg-forest text-white text-sm font-semibold rounded-md shadow-sm hover:bg-forest/90 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-4">
            {/* Time dropdown stub */}


            {filters.map((f) => (
              <button
                key={f}
                data-testid={`tab-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 text-xs font-semibold rounded-full border transition-colors ${activeFilter === f
                  ? "bg-forest text-white border-forest"
                  : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground text-sm">
                No events found matching your search.
              </div>
            ) : (
              filtered.map((ev, i) => (
                <div
                  key={i}
                  data-testid={`card-event-${i}`}
                  className="py-8 flex gap-6 sm:gap-10  border-b border-black"
                >
                  {/* Date Column */}
                  <div className="shrink-0 w-16 pt-1 text-center">
                    <div className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">{ev.month}</div>
                    <div className="font-serif text-4xl font-bold text-black leading-none mb-1">{ev.day}</div>
                    <div className="text-xs font-medium text-gray-500">{ev.year}</div>
                  </div>

                  {/* Divider */}


                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-4xl sm:text-3xl f text-black leading-snug mb-3 group-hover:opacity-90 transition-opacity">
                      {ev.title}
                    </h3>
                    <div className="flex justify-between items-start mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <MapPin className="w-4 h-4 shrink-0 text-gray-500" />
                        {ev.location}
                      </span>

                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{ev.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
