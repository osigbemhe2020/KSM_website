import { ArrowRight } from "lucide-react";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";

const pillars = [
  { t: "Charity & Outreach", d: "Extending God's love through community service, welfare programs, and compassionate outreach to the vulnerable.", i: "♥", href: "/charity" },
  { t: "Projects &Infrastructure", d: "Building lasting impact through parish support, educational facilities, and community development projects.", i: "⌂", href: "/projects" },
  { t: "Metro Investments", d: "Creating sustainable ventures that empower members and generate resources for the Order's mission.", i: "▦", href: "/investments" },
];

function WhatWeDo() {
  return (
    <section className="bg-cream pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl">What We Do</h2>
          <p className="mt-4  max-w-xl mx-auto">Our work reflects our commitment to faith, community, and service.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars.map((p) => (
            <div key={p.t}>
              <div className="text-2xl text-forest mb-4">{p.i}</div>
              <h3 className="font-serif text-xl mb-3">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.d}</p>
              <a href={p.href} className="flex items-center gap-2 ">Learn More <ArrowRight /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;