import newsHonored from "@/assets/news-honored.jpg";
import newsOutreach from "@/assets/news-outreach.jpg";
import newsSubcouncil from "@/assets/news-subcouncil.jpg";
import activityCommunity from "@/assets/activity-community.jpg";
import activityMedical from "@/assets/activity-medical.jpg";
import activityLiturgical from "@/assets/activity-liturgical.jpg";
import activityParish from "@/assets/activity-parish.jpg";
import activityMentorship from "@/assets/activity-mentorship.jpg";
import activityBrotherhood from "@/assets/activity-brotherhood.jpg";
import { StaticImageData } from "next/image";

export type NewsBlock =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string; cite?: string }
    | { type: "list"; items: string[] }
    | { type: "image"; src: string; caption?: string };

export type NewsPost = {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string; // ISO
    image: StaticImageData;
    category: string;
    content: NewsBlock[];
};

export const news: NewsPost[] = [
    {
        slug: "ksm-metro-council-honored-at-national-convention",
        title: "KSM Metro Council Abuja Honored at National Convention",
        excerpt:
            "The Metro Council received recognition for outstanding charitable work and parish support during the 2026 National Convention held in Enugu.",
        author: "Sir Emmanuel Okeke",
        date: "2026-06-12",
        image: newsHonored,
        category: "Announcements",
        content: [
            { type: "p", text: "The Knights of St. Mulumba Metro Council Abuja received the prestigious Council of the Year award at the 2026 National Convention, held in Enugu earlier this month. The recognition celebrates a year of sustained outreach, parish support, and structured community engagement across the Federal Capital Territory." },
            { type: "p", text: "Delegates from over forty subordinate councils across Nigeria gathered for the four-day convention, which opened with a Pontifical Mass celebrated by the National Chaplain. The Metro Council's delegation was led by the Metro Knight, accompanied by chairs of the Charity, Liturgical, and Youth committees." },
            { type: "h2", text: "A Year of Quiet, Consistent Service" },
            { type: "p", text: "In presenting the award, the Supreme Knight cited the Council's quarterly food drives, its sustained scholarship programme for indigent students, and the completion of a borehole project serving over 600 households in Karshi." },
            { type: "quote", text: "This honour belongs to every Knight, every Lady, and every parish that has walked this road with us. We accept it as a charge to do more, not as a destination.", cite: "Sir Emmanuel Okeke, Metro Knight" },
            { type: "image", src: activityCommunity.src, caption: "The delegation at the convention's opening Mass." },
            { type: "h2", text: "Looking Ahead" },
            { type: "p", text: "The Council will channel the recognition into expanding its medical mission programme and launching a mentorship initiative for young men preparing for confirmation in 2027." },
            {
                type: "list", items: [
                    "Expansion of the quarterly medical mission to two additional deaneries",
                    "Launch of the Mulumba Mentorship Circle for young Catholic men",
                    "Renovation of two parish halls in underserved communities",
                ]
            },
        ],
    },
    {
        slug: "quarterly-outreach-reaches-karshi-community",
        title: "Quarterly Outreach Reaches Karshi Community",
        excerpt:
            "More than 400 families received food parcels, medical screening, and welfare support during the Council's Q2 charity outreach in Karshi.",
        author: "Lady Margaret Adeyemi",
        date: "2026-06-04",
        image: newsOutreach,
        category: "Charity",
        content: [
            { type: "p", text: "Volunteers from across the Metro Council converged on the Karshi community early on Saturday for the Council's second quarterly outreach of the year. By the close of the day, over 400 families had received food parcels, basic medical screening, and counselling support." },
            { type: "h2", text: "Coordinated Across Committees" },
            { type: "p", text: "The outreach drew on the Charity Committee for logistics, the Medical Mission team for screening, and the Youth Wing for distribution. Local parish volunteers and the Ladies Auxiliary handled registration and pastoral conversation." },
            { type: "image", src: activityMedical.src, caption: "Free blood-pressure and blood-sugar screening was offered throughout the day." },
            { type: "quote", text: "Outreach is not a one-day event. It is a relationship we keep returning to.", cite: "Lady Margaret Adeyemi, Charity Chair" },
            {
                type: "list", items: [
                    "418 families served with food parcels",
                    "237 medical screenings completed",
                    "62 referrals made to partner clinics",
                ]
            },
            { type: "p", text: "The next quarterly outreach is scheduled for September and will return to the Mararaba corridor, where the Council has maintained a presence for the past four years." },
        ],
    },
    {
        slug: "new-subcouncil-inaugurated-at-our-lady-queen-of-nigeria",
        title: "New Subcouncil Inaugurated at Our Lady Queen of Nigeria",
        excerpt:
            "Twenty-three new Knights were exemplified at the inauguration of the Metro Council's newest subordinate council in Garki.",
        author: "Sir Patrick Eze",
        date: "2026-05-22",
        image: newsSubcouncil,
        category: "Council",
        content: [
            { type: "p", text: "The Metro Council inaugurated its newest subordinate council at Our Lady Queen of Nigeria Pro-Cathedral on Saturday, with twenty-three candidates exemplified into the order in a ceremony attended by the Apostolic Nuncio and the Metro Chaplain." },
            { type: "h2", text: "A Long-Awaited Foundation" },
            { type: "p", text: "Plans for the subcouncil began over eighteen months ago, following sustained interest from parishioners drawn to the order's charism of service, brotherhood, and Catholic witness." },
            { type: "image", src: activityLiturgical.src, caption: "Candidates process into the cathedral for the exemplification rite." },
            { type: "p", text: "The new subcouncil will be led pro tem by Sir Patrick Eze, who has served as Council Secretary for the past three years. A full election will follow in October." },
            { type: "quote", text: "We were not formed to fill seats. We were formed to carry the Cross of Christ into the public square with quiet, deliberate love.", cite: "Most Rev. Dr. Ignatius Kaigama" },
        ],
    },
    {
        slug: "scholarship-programme-supports-fifty-students",
        title: "Scholarship Programme Supports Fifty Students for 2026/27",
        excerpt:
            "The Metro Council's Education Trust has awarded scholarships to fifty indigent secondary-school students across the FCT for the new academic year.",
        author: "Sir Joseph Bello",
        date: "2026-05-08",
        image: activityMentorship,
        category: "Education",
        content: [
            { type: "p", text: "The Education Trust of the Metro Council has confirmed scholarship awards to fifty secondary-school students drawn from parishes across the Federal Capital Territory. The awards cover tuition, uniforms, and books for the 2026/27 academic session." },
            {
                type: "list", items: [
                    "Tuition coverage for three terms",
                    "Uniform and textbook allowance",
                    "Termly mentorship check-ins with assigned Knights",
                ]
            },
            { type: "p", text: "Selection was carried out by a panel of educators and Council members, prioritising orphans, children of widows, and students from displaced families." },
            { type: "quote", text: "A scholarship is more than money. It is a vote of confidence in a young person's future.", cite: "Sir Joseph Bello, Education Chair" },
        ],
    },
    {
        slug: "metro-council-supports-cathedral-renovation",
        title: "Metro Council Supports Cathedral Renovation Drive",
        excerpt:
            "The Council has committed manpower and matched funding to support the Archdiocese's cathedral renovation appeal launched this month.",
        author: "Sir Augustine Nwosu",
        date: "2026-04-29",
        image: activityParish,
        category: "Parish",
        content: [
            { type: "p", text: "Following the Archbishop's appeal for support toward the cathedral renovation, the Metro Council has committed matched funding up to ten million naira, alongside volunteer labour for non-specialist works." },
            { type: "p", text: "Knights from across the Council's subordinate units have already begun rotational weekend support at the site, handling logistics, security coordination, and visitor reception." },
            { type: "image", src: activityBrotherhood.src, caption: "Knights coordinating logistics at the cathedral site." },
            { type: "h2", text: "How to Contribute" },
            { type: "p", text: "Parishioners and well-wishers wishing to contribute may do so through their parish council or directly through the Archdiocesan account published in the appeal bulletin." },
        ],
    },
    {
        slug: "annual-charity-gala-raises-record-amount",
        title: "Annual Charity Gala Raises Record Amount for Outreach",
        excerpt:
            "This year's gala brought together members, families, and friends of the Council in an evening that exceeded fundraising targets by 40%.",
        author: "Lady Helen Okafor",
        date: "2026-04-11",
        image: activityCommunity,
        category: "Events",
        content: [
            { type: "p", text: "The Council's annual charity gala, held at the Transcorp Hilton, raised a record sum dedicated to the coming year's outreach calendar. Attendance crossed four hundred, with strong support from corporate partners and individual donors." },
            { type: "quote", text: "Every plate served tonight will become a plate served in a community that has waited too long.", cite: "Lady Helen Okafor, Events Chair" },
            {
                type: "list", items: [
                    "Proceeds dedicated to the medical mission expansion",
                    "Seed funding for the Mulumba Mentorship Circle",
                    "Renovation budget for two parish halls",
                ]
            },
        ],
    },
];

export function getRelated(slug: string, n = 3): NewsPost[] {
    const current = news.find((p) => p.slug === slug);
    if (!current) return news.slice(0, n);
    return news
        .filter((p) => p.slug !== slug)
        .sort((a, b) => (a.category === current.category ? -1 : 1))
        .slice(0, n);
}

export function getAdjacent(slug: string) {
    const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
    const idx = sorted.findIndex((p) => p.slug === slug);
    return {
        prev: idx > 0 ? sorted[idx - 1] : null,
        next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
    };
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function relativeDate(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return "1 week ago";
    if (weeks < 5) return `${weeks} weeks ago`;
    const months = Math.floor(days / 30);
    if (months <= 1) return "1 month ago";
    return `${months} months ago`;
}
