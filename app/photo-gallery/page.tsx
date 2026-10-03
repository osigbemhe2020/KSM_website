import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { galleryItemsQuery } from "@/sanity/lib/queries";
import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";
import PhotoGalleryClient from "@/components/PhotoGalleryClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photo Gallery — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "Explore photographic memories, events, investitures, and charity missions from the Knights of St. Mulumba Metro Council Abuja.",
  openGraph: {
    title: "Photo Gallery — Knights of St. Mulumba",
    description: "Photographic memories and event gallery.",
  },
};

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

export default async function PhotoGalleryPage() {
  const items = await client.fetch<GalleryItem[]>(galleryItemsQuery);

  return (
    <div>
      <WhoWeAreHero
        title="Photo Gallery"
        description="Explore photographic memories, events, investitures, and charity missions from the Knights of St. Mulumba Metro Council Abuja."
      />
      <PhotoGalleryClient items={items} />
    </div>
  );
}
