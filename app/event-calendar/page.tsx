"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Clock, Search } from "lucide-react";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";

type Filter = "Upcoming" | "This Month" | "Next Month" | "Past";

const filters: Filter[] = ["Upcoming", "This Month", "Next Month", "Past"];

interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
}

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchedEvents = await client.fetch<Event[]>(eventsQuery);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    const nextMonthYear = nextMonthDate.getFullYear();
    const nextMonth = nextMonthDate.getMonth();

    const query = searchQuery.trim().toLowerCase();

    // 1. Filter by date logic
    let result = events.filter((ev) => {
      const start = new Date(ev.startDate);
      const end = ev.endDate ? new Date(ev.endDate) : start;

      if (activeFilter === "Upcoming") {
        // Today or future dates
        return end >= startOfToday;
      } else if (activeFilter === "This Month") {
        // Happening in current calendar month & year
        return start.getFullYear() === currentYear && start.getMonth() === currentMonth;
      } else if (activeFilter === "Next Month") {
        // Happening in next calendar month & year
        return start.getFullYear() === nextMonthYear && start.getMonth() === nextMonth;
      } else if (activeFilter === "Past") {
        // Before today
        return end < startOfToday;
      }
      return true;
    });

    // 2. Filter by search query
    if (query !== "") {
      result = result.filter(
        (ev) =>
          ev.title.toLowerCase().includes(query) ||
          (ev.location || "").toLowerCase().includes(query) ||
          (ev.description || "").toLowerCase().includes(query) ||
          (ev.category || "").toLowerCase().includes(query)
      );
    }

    // 3. Sort chronologically
    if (activeFilter === "Past") {
      // Past events: most recent past events first
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else {
      // Upcoming, This Month, Next Month: soonest events first
      result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    return result;
  }, [events, activeFilter, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      year: date.getFullYear().toString()
    };
  };

  if (loading) {
    return (
      <div className="w-full">
        <WhoWeAreHero
          title="Our Calendar"
          description="Stay connected with upcoming events, across the Knights of St. Mulumba Metro Council Abuja."
        />
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </section>
      </div>
    );
  }

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
              {activeFilter === "Past"
                ? "Past Events"
                : activeFilter === "This Month"
                ? "This Month's Events"
                : activeFilter === "Next Month"
                ? "Next Month's Events"
                : "Upcoming Events"}
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
                placeholder="Search events by name, location, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-events"
                className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-forest focus:border-forest shadow-sm"
              />
            </div>
            <button
              data-testid="button-search"
              onClick={(e) => e.preventDefault()}
              className="px-10 py-3 bg-forest text-white text-sm font-semibold rounded-md shadow-sm hover:bg-forest/90 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-4">
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
                {searchQuery
                  ? `No events found matching "${searchQuery}".`
                  : activeFilter === "Upcoming"
                  ? "No upcoming events scheduled at this time."
                  : activeFilter === "This Month"
                  ? "No events scheduled for this month."
                  : activeFilter === "Next Month"
                  ? "No events scheduled for next month."
                  : "No past events recorded."}
              </div>
            ) : (
              filtered.map((ev) => {
                const { month, day, year } = formatDate(ev.startDate);
                return (
                  <div
                    key={ev._id}
                    data-testid={`card-event-${ev._id}`}
                    className="py-8 flex gap-6 sm:gap-10 border-b border-black"
                  >
                    {/* Date Column */}
                    <div className="shrink-0 w-16 pt-1 text-center">
                      <div className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">{month}</div>
                      <div className="font-serif text-4xl font-bold text-black leading-none mb-1">{day}</div>
                      <div className="text-xs font-medium text-gray-500">{year}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-4xl sm:text-3xl text-black leading-snug mb-3 group-hover:opacity-90 transition-opacity">
                        {ev.title}
                      </h3>
                      <div className="flex justify-between items-start mb-3">
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                          <MapPin className="w-4 h-4 shrink-0 text-gray-500" />
                          {ev.location || 'TBD'}
                        </span>
                        {ev.time && (
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Clock className="w-4 h-4 shrink-0 text-gray-500" />
                            {ev.time}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{ev.description || ''}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
