
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"



interface Event {
  id: string
  dateRange: string
  date: string
  dayOfWeek: string
  dayNumber: number
  title: string
  description: string
  location: string
  section: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    dateRange: "November 11, 2025 - November 13, 2025",
    date: "November 11, 2025",
    dayOfWeek: "Wed",
    dayNumber: 11,
    title: "2025 Supreme Convention",
    description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
    location: "Abuja",
    section: "Section 31",
  },
  {
    id: "2",
    dateRange: "November 20, 2025",
    date: "November 20, 2025",
    dayOfWeek: "Wed",
    dayNumber: 20,
    title: "25th Metro Council Meeting",
    description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
    location: "Abuja",
    section: "Section 32",
  },
  {
    id: "3",
    dateRange: "November 27, 2025",
    date: "November 27, 2025",
    dayOfWeek: "Wed",
    dayNumber: 27,
    title: "25th Metro Council Meeting",
    description: "To be held in Abuja, hosted by the New York Grand. More details to be announced later",
    location: "Abuja",
    section: "Section 33",
  },
]

export default function EventCalendar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate] = useState(new Date("2025-07-10"))
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <div className="p-6">
        <h1 className="text-center text-3xl font-bold mb-6 text-foreground">Event Calendar</h1>
        <div className="flex gap-2 mb-6 max-w-[900px] mx-auto" >
          <input
            type="text"
            placeholder="search event"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-200 rounded border border-border"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-6">Find event</button>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 py-4 justify-start">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">
                <div>Today:</div>
                <div>
                  {currentDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">Upcoming</span>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

        {/* Events List */}
       <div className="flex-1 py-6  w-full">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative">
                <h2 className="text-xl font-bold mb-6 pb-3 ">November 2025</h2>
                  <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="flex justify-between gap-20 border-b border-black/20 py-4">
                      {/* Left Section */}
                      <div className="flex flex-col items-center min-w-fit">
                        <div className="text-sm font-semibold text-muted-foreground mb-2">{event.dayOfWeek}</div>
                        <div className="text-3xl font-bold text-foreground mb-4">{event.dayNumber}</div>
                        <div className="text-xs font-medium bg-muted px-2 py-1 rounded text-foreground">
                          {event.section}
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">{event.dateRange}</div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
    </div>
    </div>
    )
  }
