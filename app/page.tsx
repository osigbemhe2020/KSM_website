'use client';

import HeroSection from "@/components/LandingPageComponents/Hero";
import OurActivitiesSection from "@/components/LandingPageComponents/OurActivites";
import OurProjectsSection from "@/components/LandingPageComponents/OurProjectsSection";
import WhoAreWeSection from "@/components/LandingPageComponents/WhoAreWeSection";
import EventsCalendarSection from "@/components/LandingPageComponents/EventsCalendarSection";
import NewsSection from "@/components/LandingPageComponents/NewsSection";
import MemberHeader from "@/components/LayoutComponents/memberHeader";

export default function Home() {
  return (
    
    <div>
      <HeroSection/>
      <WhoAreWeSection/>
      <OurActivitiesSection/>
      <OurProjectsSection/>
      <EventsCalendarSection/>
      <NewsSection/>
   
    </div>
  );
}
