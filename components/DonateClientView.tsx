"use client";

import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import leader1 from "@/assets/activity-community.jpg";
import leader2 from "@/assets/activity-mentorship.jpg";
import leader3 from "@/assets/project-scholarship.jpg";
import { useDonate } from "@/hooks/payment.hook";

const placeholders = [leader1.src, leader2.src, leader3.src];

type ImpactItem = {
  title?: string;
  description?: string;
  metric?: string;
  subtext?: string;
  image?: { asset?: { url?: string } };
};

type DonationData = {
  title?: string;
  description?: string;
  impactsTitle?: string;
  impactsSubtitle?: string;
  impactsDescription?: string;
  impacts?: ImpactItem[];
  donationTitle?: string;
  donationDescription?: string;
  presets?: number[];
  testimonialsTitle?: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  testimonialImage?: { asset?: { url?: string } };
};

const defaultImpacts: ImpactItem[] = [
  { title: "Community Outreach", description: "Food, medical, and welfare missions across the FCT.", metric: "12,400+", subtext: "BENEFICIARIES IN 2024" },
  { title: "Youth Development", description: "Mentorship and faith formation for the next generation.", metric: "180", subtext: "YOUNG LEADERS MENTORED" },
  { title: "Educational Support", description: "Tuition and books for promising students in need.", metric: "₦14M", subtext: "IN SCHOLARSHIPS AWARDED" },
  { title: "Welfare Assistance", description: "Relief for widows, orphans, and the sick.", metric: "320", subtext: "FAMILIES SUPPORTED" },
  { title: "Parish Development", description: "Liturgical support and infrastructure for local churches.", metric: "24", subtext: "PARISHES ASSISTED" },
];

export default function DonateClientView({ initialData }: { initialData?: DonationData | null }) {
  const impacts = initialData?.impacts && initialData.impacts.length > 0 ? initialData.impacts : defaultImpacts;
  const presets = initialData?.presets && initialData.presets.length > 0 ? initialData.presets : [5000, 10000, 25000, 50000];

  const [amount, setAmount] = useState<number | "">(presets[1] || 10000);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { mutate: donate } = useDonate();

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    donate({ name, amount, email });
  };

  return (
    <>
      {/* Tangible Impact Section */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            {initialData?.impactsTitle || "WHERE YOUR GIFT GOES"}
          </p>
          <h2 className="font-serif text-5xl text-foreground mb-6">
            {initialData?.impactsSubtitle || "A Tangible Inheritance of Service"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mb-10 leading-relaxed">
            {initialData?.impactsDescription ||
              "Every donation, however modest, becomes a tangible act of charity carried to homes, parishes, and classrooms across the Federal Capital Territory."}
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {impacts.map((i, index) => (
              <ProfileCard
                key={i.title || index}
                imageSrc={i.image?.asset?.url || placeholders[index % 3]}
                name={i.title || "Impact Area"}
                description={i.description || ""}
                footerNode={
                  <>
                    <div className="font-serif text-2xl text-forest">{i.metric || "-"}</div>
                    <div className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">{i.subtext}</div>
                  </>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 border border-border">
            <div className="bg-forest p-10 hidden md:block" />
            <div className="bg-background p-10 md:p-12">
              <h2 className="font-serif text-5xl text-foreground mb-6">
                {initialData?.donationTitle || "Make a Donation"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {initialData?.donationDescription ||
                  "Every donation, no matter how big or small, makes a significant difference to our cause. Thank you for doing your part to help."}
              </p>

              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">DONATION AMOUNT</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setAmount(p);
                      setCustom("");
                    }}
                    className={`py-3 text-sm border transition-colors ${
                      amount === p ? "bg-forest text-white border-forest" : "border-border hover:border-forest"
                    }`}
                  >
                    ₦{p.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-8 mt-4">
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setAmount(e.target.value ? Number(e.target.value) : "");
                  }}
                  placeholder="₦ Other custom amount"
                  className="flex-1 px-3 py-3 text-sm border border-border bg-background focus:outline-none focus:border-forest"
                />
                <span className="text-xs text-muted-foreground">Custom</span>
              </div>

              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">YOUR NAME / INTENTION (OPTIONAL)</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dirisu Paul"
                className="w-full px-3 py-3 text-sm border border-border bg-background focus:outline-none focus:border-forest mb-6"
              />

              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">EMAIL ADDRESS (FOR RECEIPT) *</p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="donor@example.com"
                className="w-full px-3 py-3 text-sm border border-border bg-background focus:outline-none focus:border-forest mb-8"
              />

              <button
                onClick={handleDonate}
                className="w-full bg-forest text-white py-4 text-sm tracking-[0.15em] hover:bg-forest-deep transition-colors"
              >
                CONTINUE TO PAYMENT
              </button>
              <p className="text-[10px] text-muted-foreground mt-4 text-center">
                Secured giving. All donations are acknowledged with an official receipt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-cream py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            {initialData?.testimonialsTitle || "TESTIMONIALS"}
          </p>
          <h2 className="font-serif text-5xl text-foreground mb-6">What Our Beneficiaries Say</h2>
          <div className="grid md:grid-cols-2 min-h-60 gap-6">
            <div className="bg-forest h-full min-h-60 hidden md:block overflow-hidden">
              {initialData?.testimonialImage?.asset?.url && (
                <img
                  src={initialData.testimonialImage.asset.url}
                  alt={initialData.testimonialAuthor || "Beneficiary"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-serif text-xl mb-6 text-foreground/90 leading-snug">
                &ldquo;{initialData?.testimonialQuote ||
                  "When the Knights came to our parish, they did not arrive as benefactors but as brothers. Their quiet generosity carried my son through university — a gift our family will pray for, always."}&rdquo;
              </p>
              <p className="font-bold text-lg">{initialData?.testimonialAuthor || "Mrs. Adeze"}</p>
              <p className="text-xs text-muted-foreground">
                {initialData?.testimonialRole || "Beneficiary, Abuja Charity Outreach"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
