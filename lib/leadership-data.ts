import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";

export type Leader = {
  slug: string;
  image: string;
  role: string;
  name: string;
  served: string;
  shortBio: string;
  bioHeading: string;
  bio: string[];
  responsibilities: string[];
  gifts: string[];
};

export const leaders: Leader[] = [
  {
    slug: "anthony-okonkwo",
    image: leader1.src,
    role: "METROPOLITAN GRAND KNIGHT",
    name: "Sir Kt. Anthony O. Okonkwo",
    served: "Serving since 2018 KSM, KSJI",
    shortBio:
      "A devoted Catholic, family man, and public-spirited servant who leads the Metro Council with nearly three decades of fraternal service.",
    bioHeading: "A Life of Faith and Service.",
    bio: [
      "A devoted Catholic, family man, and public-spirited servant, Sir Kt. Anthony Okonkwo brings to the office of Metropolitan Grand Knight nearly three decades of fraternal service and an unwavering commitment to the mission of the Order.",
      "Under his stewardship, the Metro Council has deepened its outreach to parish communities, expanded mentorship for younger Knights, and renewed its commitment to charitable works across the Federal Capital Territory.",
      "Initiated into the Order in 1996, Sir Kt. Okonkwo previously served as Deputy Grand Knight and Chancellor before being elevated to the office of Metropolitan Grand Knight. He is a communicant of Our Lady Queen of Nigeria Pro-Cathedral, Abuja.",
    ],
    responsibilities: [
      "Presiding over Metro Council convocations and executive sessions",
      "Representing the Order before the Archdiocese and civic authorities",
      "Oversight of all Council ministries, projects, and finances",
      "Spiritual and moral leadership of the brotherhood",
    ],
    gifts: ["Parish outreach", "Mentorship", "Institutional stewardship"],
  },
  {
    slug: "emmanuel-okafor",
    image: leader2.src,
    role: "DEPUTY METROPOLITAN GRAND KNIGHT",
    name: "Sir Kt. Dr. Emmanuel C. Okafor",
    served: "Serving since 2019",
    shortBio:
      "A physician and lay leader devoted to the formation of younger Knights and the pastoral life of the Council.",
    bioHeading: "Healing Hands, Steadfast Heart.",
    bio: [
      "Sir Kt. Dr. Emmanuel Okafor combines a lifelong medical practice with deep devotion to the Order, offering both counsel and care to his brother Knights.",
      "He supports the Metropolitan Grand Knight in the day-to-day coordination of Council programs, formation of new Knights, and pastoral outreach.",
      "A parishioner of St. Mary's Catholic Church, he continues to model the balance of professional excellence and spiritual discipline that defines the Order.",
    ],
    responsibilities: [
      "Coordinating Council programs and formation activities",
      "Deputizing for the Metropolitan Grand Knight",
      "Chairing the Health and Welfare committee",
      "Mentoring Squires and new initiates",
    ],
    gifts: ["Formation", "Pastoral care", "Health ministry"],
  },
  {
    slug: "joseph-adekunle",
    image: leader3.src,
    role: "METROPOLITAN CHANCELLOR",
    name: "Sir Kt. Barr. Joseph A. Adekunle",
    served: "Serving since 2021",
    shortBio:
      "A canon-law-attuned barrister guiding the Council through matters of discipline, fraternity, and constitutional fidelity.",
    bioHeading: "Order, Fidelity, and Fraternity.",
    bio: [
      "Sir Kt. Barr. Joseph Adekunle brings decades of legal practice and canon-law familiarity to the office of Metropolitan Chancellor.",
      "He safeguards the constitutional order of the Council, keeps its records, and advises on matters of discipline and dispute resolution.",
      "A parishioner of Holy Trinity Catholic Church, he is known for his measured judgment and quiet fidelity to the Order's traditions.",
    ],
    responsibilities: [
      "Custodian of Council records and minutes",
      "Advising on constitutional and legal matters",
      "Coordinating discipline and grievance processes",
      "Preserving the traditions of the Order",
    ],
    gifts: ["Canon law", "Records custody", "Dispute resolution"],
  },
  {
    slug: "peter-eze",
    image: leader1.src,
    role: "METROPOLITAN TREASURER",
    name: "Sir Kt. Peter N. Eze",
    served: "Serving since 2020",
    shortBio:
      "A chartered accountant carrying the financial stewardship of the Order with quiet diligence and unwavering transparency.",
    bioHeading: "Stewardship of the Common Purse.",
    bio: [
      "Sir Kt. Peter Eze, FCA, brings over twenty-five years of financial practice to the office of Metropolitan Treasurer.",
      "He oversees dues collection, project budgeting, and reporting, and works closely with the Financial Secretary to ensure orderly stewardship.",
      "A parishioner of St. Charles Lwanga Catholic Church, he is a quiet, meticulous presence in every Council convocation.",
    ],
    responsibilities: [
      "Custody of Council funds and accounts",
      "Preparing annual budgets and financial reports",
      "Coordinating with auditors and the Finance committee",
      "Advising on project funding and sustainability",
    ],
    gifts: ["Financial reporting", "Audit readiness", "Budget discipline"],
  },
];

export const getLeader = (slug: string) => leaders.find((l) => l.slug === slug);
export const getOtherLeaders = (slug: string) => leaders.filter((l) => l.slug !== slug).slice(0, 3);
