
import pHall from "@/assets/project-hall.jpg";
import pClinic from "@/assets/project-clinic.jpg";
import pScholarship from "@/assets/project-scholarship.jpg";
import pBorehole from "@/assets/project-borehole.jpg";
import pSkills from "@/assets/project-skills.jpg";
import pCathedral from "@/assets/project-cathedral.jpg";

export type Status = "COMPLETED" | "ONGOING" | "UPCOMING";

export type Milestone = { date: string; title: string; note: string };

export type Project = {
    slug: string;
    title: string;
    hero: typeof pHall;
    status: Status;
    overview: string[];
    objectives: string[];
    milestones: Milestone[];
};

const projects: Project[] = [
    {
        slug: "st-joseph-parish-hall-renovation",
        title: "St. Joseph Parish Hall Renovation",
        hero: pHall,
        status: "COMPLETED",
        overview: [
            "The St. Joseph Parish Hall Renovation was conceived as a gift from the Knights of St. Mulumba, Metro Council Abuja, to a parish whose pastoral and liturgical life had outgrown its facilities. Working closely with the parish priest and the building committee, the Council financed a full structural overhaul — roofing, electricals, sanitary upgrades, and interior finishing — alongside expanded seating for catechism, choir rehearsals, and parish gatherings.",
            "The project stands today as a quiet witness to what is possible when stewardship and faith are joined. It is dedicated to the service of the parish community and remains in active use for liturgical, catechetical, and community events.",
        ],
        objectives: [
            "Restore and expand the parish hall to accommodate a growing congregation.",
            "Install modern lighting, ventilation, and audio-visual equipment.",
            "Create a dignified venue for liturgical, catechetical, and community events.",
            "Strengthen the bond between the Order and the host parish.",
        ],
        milestones: [
            { date: "Jan 2023", title: "Project Approval", note: "Council resolution and parish board passed." },
            { date: "Apr 2023", title: "Groundbreaking", note: "Foundation works and structural assessment commenced." },
            { date: "Oct 2023", title: "Major Works Completed", note: "Roofing, finishes, and electricals completed." },
            { date: "Feb 2024", title: "Dedication & Handover", note: "Hall blessed by the Archbishop and handed to parish." },
        ],
    },
    {
        slug: "community-health-centre-gwagwalada",
        title: "Community Health Centre, Gwagwalada",
        hero: pClinic,
        status: "ONGOING",
        overview: [
            "The Community Health Centre at Gwagwalada is a multi-phase development providing free and subsidised primary healthcare to underserved families on the outskirts of the Federal Capital Territory.",
            "Built in partnership with Catholic medical professionals, the centre offers outpatient consultations, maternal care, pharmacy services, and routine immunisation, and serves as the base for the Council's quarterly medical missions.",
        ],
        objectives: [
            "Deliver affordable primary healthcare to underserved communities.",
            "Establish a permanent base for free medical missions.",
            "Provide maternal and child health services within the FCT periphery.",
            "Form a clinical home for volunteering Catholic medical professionals.",
        ],
        milestones: [
            { date: "May 2023", title: "Site Acquisition", note: "Land secured in partnership with the parish." },
            { date: "Nov 2023", title: "Phase One Construction", note: "Outpatient block and pharmacy completed." },
            { date: "Jul 2024", title: "Phase Two Begins", note: "Maternal wing and laboratory under construction." },
            { date: "2026", title: "Full Commissioning", note: "Anticipated completion and operational launch." },
        ],
    },
    {
        slug: "scholarship-endowment-fund-facility",
        title: "Scholarship Endowment Fund Facility",
        hero: pScholarship,
        status: "ONGOING",
        overview: [
            "The Scholarship Endowment Fund Facility consolidates the Council's educational support into a single, transparently-administered structure. The facility houses the records, governance, and disbursement of scholarships for indigent secondary and tertiary students within the Archdiocese.",
            "It is designed to outlive any single council year — a permanent infrastructure for permanent generosity.",
        ],
        objectives: [
            "Establish a self-sustaining endowment for indigent Catholic students.",
            "Centralise scholarship governance and disbursement.",
            "Preserve donor confidence through transparent administration.",
            "Expand the reach of the programme parish by parish.",
        ],
        milestones: [
            { date: "Mar 2023", title: "Endowment Charter Signed", note: "Governance and trustees confirmed." },
            { date: "Sep 2023", title: "First Disbursements", note: "Tuition support awarded to forty-two students." },
            { date: "Aug 2024", title: "Facility Build-Out", note: "Office and records facility commissioned." },
            { date: "Ongoing", title: "Annual Awards Cycle", note: "Termly scholarship review and disbursement." },
        ],
    },
    {
        slug: "water-borehole-project-kuje",
        title: "Water Borehole Project, Kuje",
        hero: pBorehole,
        status: "COMPLETED",
        overview: [
            "The Water Borehole Project at Kuje delivered clean, safe drinking water to a rural community that had previously walked several kilometres for an unsafe source. The Council funded drilling, pump installation, an overhead reservoir, and a public access point dedicated to the community.",
            "The borehole serves households, the local primary school, and the parish — a small infrastructure with daily, dignifying impact.",
        ],
        objectives: [
            "Provide clean, safe drinking water to a rural FCT community.",
            "Reduce water-borne illness and the burden on women and children.",
            "Support the local primary school and parish water needs.",
            "Establish a community-managed maintenance arrangement.",
        ],
        milestones: [
            { date: "Feb 2024", title: "Community Engagement", note: "Site agreed with community and parish leadership." },
            { date: "May 2024", title: "Drilling Completed", note: "Borehole drilled and water quality certified." },
            { date: "Jul 2024", title: "Reservoir Installed", note: "Overhead tank and public access tap built." },
            { date: "Aug 2024", title: "Handover", note: "Commissioned and handed to community committee." },
        ],
    },
    {
        slug: "youth-skills-acquisition-centre",
        title: "Youth Skills Acquisition Centre",
        hero: pSkills,
        status: "UPCOMING",
        overview: [
            "The Youth Skills Acquisition Centre will equip young people across the Archdiocese with marketable skills in trades, technology, and entrepreneurship. The centre is designed as a launchpad for vocations beyond the classroom — fitted with workshops, a digital lab, and mentorship facilities.",
            "Site acquisition and architectural design are complete; groundbreaking is scheduled for the next council year.",
        ],
        objectives: [
            "Train young people in trades, technology, and entrepreneurship.",
            "Provide mentorship anchored in Catholic moral formation.",
            "Partner with industry for placement and apprenticeship.",
            "Reduce unemployment among parish youth across the FCT.",
        ],
        milestones: [
            { date: "Oct 2024", title: "Site Acquisition", note: "Land secured and titled to the Council." },
            { date: "Feb 2025", title: "Architectural Design", note: "Full design and bill of quantities completed." },
            { date: "Q3 2026", title: "Groundbreaking", note: "Construction to commence subject to funding." },
            { date: "2028", title: "Anticipated Opening", note: "First intake of trainees expected." },
        ],
    },
    {
        slug: "cathedral-beautification-project",
        title: "Cathedral Beautification Project",
        hero: pCathedral,
        status: "ONGOING",
        overview: [
            "The Cathedral Beautification Project is the Council's standing commitment to the visible dignity of the Pro-Cathedral — its grounds, its sanctuary appointments, and the small structural enhancements that allow the seat of the Archdiocese to receive the faithful well.",
            "The work is continuous: landscape upkeep, sanctuary lighting, vestment storage, and pew restoration, undertaken in close consultation with the cathedral administrator.",
        ],
        objectives: [
            "Preserve the dignity and beauty of the Pro-Cathedral.",
            "Support cathedral liturgical and pastoral needs.",
            "Maintain grounds, lighting, and sanctuary appointments.",
            "Stand visibly with the Archdiocese at its mother church.",
        ],
        milestones: [
            { date: "2022", title: "Programme Initiated", note: "Council adopted the cathedral as a standing beneficiary." },
            { date: "2023", title: "Sanctuary Lighting", note: "Sanctuary lighting overhaul completed." },
            { date: "2024", title: "Grounds Restoration", note: "Landscaping and pathway works delivered." },
            { date: "Ongoing", title: "Continuous Care", note: "Quarterly works in coordination with administrator." },
        ],
    },
];

export default projects;