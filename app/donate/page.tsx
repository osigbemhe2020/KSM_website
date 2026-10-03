import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { donationPageQuery } from "@/sanity/lib/queries";
import DonateClientView from "@/components/DonateClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Make a Donation — Knights of St. Mulumba, Metro Council Abuja",
  description:
    "Support our mission of service, charity, and faith formation across the Federal Capital Territory.",
  openGraph: {
    title: "Make a Donation — Knights of St. Mulumba",
    description: "Support our mission of service, charity, and faith formation.",
  },
};

export default async function DonatePage() {
  const sanityData = await client.fetch(donationPageQuery);

  return (
    <main className="min-h-screen bg-cream">
      <DonateClientView initialData={sanityData} />
    </main>
  );
}
