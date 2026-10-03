import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery, faqsQuery } from "@/sanity/lib/queries";
import ContactClientView from "@/components/ContactClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us — Knights of St. Mulumba, Metro Council Abuja",
  description: "Get in touch with the Knights of St. Mulumba Metro Council Abuja.",
  openGraph: {
    title: "Contact Us — Knights of St. Mulumba",
    description: "Get in touch with the Knights of St. Mulumba Metro Council Abuja.",
  },
};

export default async function ContactPage() {
  const [settings, faqs] = await Promise.all([
    client.fetch(siteSettingsQuery).catch(() => null),
    client.fetch(faqsQuery).catch(() => []),
  ]);

  return <ContactClientView settings={settings} faqs={faqs} />;
}
