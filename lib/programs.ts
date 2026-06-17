import impact1 from "@/assets/impact-1.jpg";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";

// export type Program = {
//     slug: string;
//     title: string;
//     tagline: string;
//     hero: string;
//     sectionTitle: string;
//     overview: string[];
//     initiatives: { t: string; d: string }[];
//     impactNote: string;
//     impactImages: { src: string; t: string }[];
// };


const programs = [
    {
        slug: "community-support",
        title: "Charity & Outreach",
        tagline: "Extending God's love through compassionate service and structured community support.",
        hero: impact1,
        sectionTitle: "Community Support Programs",
        overview: [
            "Our Community Support Programs form the backbone of the Council's outreach ministry. Each quarter, members coordinate structured visits to orphanages, IDP settlements, correctional facilities, and rural parishes within the FCT — bringing food, medical attention, clothing, and the assurance of a caring community.",
            "Every initiative is anchored in dignity. We do not merely give; we sit with the vulnerable, listen to their stories, and ensure that our service reflects the love of Christ rather than the spectacle of charity.",
        ],
        initiatives: [
            { t: "Quarterly Food Drives", d: "Bulk distribution of staples to orphanages, widows, and IDP families — coordinated by the Welfare Committee." },
            { t: "Free Medical Missions", d: "Free consultations, malaria treatment, eye screening, and pharmaceutical support in partnership with Catholic medical professionals." },
            { t: "Welfare Visits", d: "Pastoral visits to widows, the sick, and the elderly across designated parishes." },
            { t: "Emergency Relief", d: "Rapid intervention in moments of disaster, displacement, or sudden loss within parish communities." },
        ],
        impactNote: "Moments from recent outreach across the FCT.",
        impactImages: [
            { src: impact1, t: "Food & Welfare Outreach" },
            { src: impact2, t: "Liturgical Service" },
            { src: impact3, t: "Youth Formation" },
        ],
    },
    {
        slug: "parish-assistance",
        title: "Charity & Outreach",
        tagline: "Standing with Catholic parishes through service, resource, and faithful presence.",
        hero: impact2,
        sectionTitle: "Parish Assistance Programs",
        overview: [
            "Parish Assistance places the Knights at the service of the local Church — supporting clergy, sustaining liturgical life, and helping parishes meet pastoral and infrastructural needs across the metropolis.",
            "Our work here is quiet and continuous: ushering at major feasts, sponsoring sacramental retreats, repairing parish facilities, and standing with the pastor wherever a faithful hand is needed.",
        ],
        initiatives: [
            { t: "Liturgical Support", d: "Trained ushers and volunteers for parish Masses, ordinations, and metropolitan celebrations." },
            { t: "Infrastructural Aid", d: "Repairs, renovations, and small capital support for parish buildings and sanctuary needs." },
            { t: "Sacramental Programs", d: "Sponsorship of catechumenate retreats, First Communion, and Confirmation preparation." },
            { t: "Clergy Support", d: "Annual gifts and pastoral solidarity with priests and religious serving in the Archdiocese." },
        ],
        impactNote: "Service rendered to parishes across the Archdiocese.",
        impactImages: [
            { src: impact2, t: "Liturgical Service" },
            { src: impact1, t: "Parish Outreach" },
            { src: impact3, t: "Sacramental Formation" },
        ],
    },
    {
        slug: "charity-events",
        title: "Charity & Outreach",
        tagline: "Mobilising community generosity through purposeful events and campaigns.",
        hero: impact3,
        sectionTitle: "Charity Events & Fundraisers",
        overview: [
            "Charity Events translate goodwill into action — gathering knights, families, and friends of the Order around shared causes and structured fundraising for the communities we serve.",
            "Each event is planned with care: transparent budgeting, named beneficiaries, and a published account of what was raised and where it was directed. Charity, for us, is never anonymous in its accountability.",
        ],
        initiatives: [
            { t: "Annual Charity Gala", d: "A flagship evening of fellowship and giving in support of the Council's outreach budget." },
            { t: "Walk for the Vulnerable", d: "An annual community walk raising awareness and funds for IDP families and widows." },
            { t: "Sponsored Mass & Dinner", d: "Quarterly thanksgiving Masses paired with charity dinners for designated beneficiaries." },
            { t: "Awareness Campaigns", d: "Targeted campaigns on issues of life, family, and faith across parish networks." },
        ],
        impactNote: "Highlights from recent fundraising and awareness work.",
        impactImages: [
            { src: impact3, t: "Annual Gala" },
            { src: impact1, t: "Community Walk" },
            { src: impact2, t: "Charity Dinner" },
        ],
    },
    {
        slug: "youth-education",
        title: "Charity & Outreach",
        tagline: "Investing in the next generation through education, mentoring, and formation.",
        hero: impact3,
        sectionTitle: "Youth & Educational Support",
        overview: [
            "The Youth & Educational Support programme channels the Order's resources toward the formation of young people — scholarships for the gifted but indigent, mentoring for the searching, and skill-building for the unemployed.",
            "We hold that no Catholic child in the FCT should be without access to schooling, mentorship, or a vocation, and we work — parish by parish — to make that conviction real.",
        ],
        initiatives: [
            { t: "Scholarship Programme", d: "Termly tuition support for indigent secondary and tertiary students within the Archdiocese." },
            { t: "Mentorship Circles", d: "Monthly gatherings pairing young men with Knights for guidance in faith, work, and life." },
            { t: "Skills Acquisition", d: "Vocational training partnerships in trades, technology, and entrepreneurship." },
            { t: "School Outreach", d: "Career talks, retreats, and educational materials delivered to Catholic schools and youth groups." },
        ],
        impactNote: "Lives shaped through scholarship, mentoring, and formation.",
        impactImages: [
            { src: impact3, t: "Mentorship Circle" },
            { src: impact2, t: "School Outreach" },
            { src: impact1, t: "Skills Workshop" },
        ],
    }
];

export default programs
