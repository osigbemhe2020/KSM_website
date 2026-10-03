import { client } from '@/sanity/lib/client';
import { galleryItemsQuery } from '@/sanity/lib/queries';
import OurActivitiesClient from './OurActivitesClient';

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

const OurActivitiesSection = async () => {
  const activities = await client.fetch<GalleryItem[]>(galleryItemsQuery);
  const limitedActivities = activities.slice(0, 6); // Limit to 6 items for the carousel

  return <OurActivitiesClient activities={limitedActivities} />;
};

export default OurActivitiesSection;