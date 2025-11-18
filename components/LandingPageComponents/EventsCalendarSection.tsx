import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventCalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
  
  const events = [
    { date: 2, title: '25th Annual General assembly' },
    { date: 9, title: '25th Annual General assembly' },
    { date: 16, title: '25th Annual General assembly' },
    { date: 23, title: '26th Annual General assembly' }
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
            
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">November 2025</h3>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs font-semibold text-gray-600 py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-[40px] w-[40px]"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const hasEvent = events.some(e => e.date === day);
                  return (
                    <div
                      key={day}
                      className={`h-[40px] w-[40px] flex items-center justify-center text-sm rounded-full ${
                        hasEvent ? 'bg-green-700 text-white font-bold' : 'hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
              <button className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition">
                View full calender &gt; &gt;
              </button>
            </div>

            <div className="space-y-4">
              {events.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">
                    {event.date}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendarSection;
