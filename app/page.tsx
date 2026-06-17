'use client';

import HeroSection from "@/components/LandingPageComponents/Hero";
import OurActivitiesSection from "@/components/LandingPageComponents/OurActivites";
import OurProjectsSection from "@/components/LandingPageComponents/OurProjectsSection";
import WhoAreWeSection from "@/components/LandingPageComponents/WhoAreWeSection";
import NewsSection from "@/components/LandingPageComponents/NewsSection";
import WhatWeDo from "@/components/LandingPageComponents/WhatWeDo";
import Events from "@/components/LandingPageComponents/EventsCalendarSection";


export default function Home() {
  return (
    
    <div className="bg-cream text-gray-900">
      <HeroSection/>
      <WhoAreWeSection/>
      <Events/>
      <WhatWeDo/>
      <OurActivitiesSection/>
      <OurProjectsSection/>
      <NewsSection/>
    </div>
  );
}
