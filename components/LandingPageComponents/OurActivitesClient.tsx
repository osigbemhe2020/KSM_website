'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type GalleryItem = {
  _id: string;
  title: string;
  category?: string;
  caption?: string;
  alt?: string;
  takenAt?: string;
  image?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
};

const AUTOPLAY_INTERVAL = 6000;

const OurActivitesClient = ({ activities }: { activities: GalleryItem[] }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const total = activities.length;

  useEffect(() => {
    const update = () => setCardsVisible(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPaused && total > 0) startAutoplay();
    return stopAutoplay;
  }, [isPaused, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const cardWidth = 100 / cardsVisible;

  if (activities.length === 0) {
    return (
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-8">Photo Gallery</h2>
          <div className="text-center text-gray-500">No gallery items available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-8">Photo Gallery</h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * cardWidth}%)` }}
          >
            {[...activities, ...activities].map((activity, idx) => (
              <div
                key={idx}
                style={{ minWidth: `calc(${cardWidth}% - 1rem)` }}
                className="mx-2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex-shrink-0"
              >
                <div className="h-48 relative bg-gradient-to-br from-gray-300 to-gray-400">
                  {activity.image?.asset?.url && (
                    <Image
                      src={activity.image.asset.url}
                      alt={activity.image.asset.altText || activity.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-[16px]">{activity.title}</p>
                  {activity.category && (
                    <p className="text-xs text-gray-500 mt-1">{activity.category}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { prev(); setIsPaused(true); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          <button
            onClick={() => { next(); setIsPaused(true); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition z-10"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {activities.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrent(idx); setIsPaused(true); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current % total ? 'bg-forest w-4' : 'bg-gray-300'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/photo-gallery">
            <button className="text-forest font-semibold transition">
              View more →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurActivitesClient;