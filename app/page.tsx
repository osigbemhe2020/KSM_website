'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import OurActivitiesSection from "@/components/OurActivites";
import OurProjectsSection from "@/components/OurProjectsSection";
import WhoAreWeSection from "@/components/WhoAreWeSection";
import EventsCalendarSection from "@/components/EventsCalendarSection";
import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    
    <div>
      <Header />
      <HeroSection/>
      <WhoAreWeSection/>
      <OurActivitiesSection/>
      <OurProjectsSection/>
      <EventsCalendarSection/>
      <NewsSection/>
      <Footer/>
    </div>
  );
}
