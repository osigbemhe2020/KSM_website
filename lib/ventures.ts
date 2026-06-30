export interface Leader {
    role: string;
    name: string;
}

export interface Venture {
    slug: string;
    category: string;
    name: string;
    tagline: string;
    industry: string;
    areaOfOperation: string;
    registered: string;
    aboutShort: string;
    aboutLong: string;
    stats: { value: string; label: string }[];
    impactText: string;
    leaders: Leader[];
}

export const ventures: Venture[] = [
    {
        slug: "st-mulumba-trust-fund",
        category: "FINANCIAL SERVICES",
        name: "St. Mulumba Trust Fund",
        tagline:
            "A trust fund supporting the Order's charity, member welfare, and community development across the Federal Capital Territory.",
        industry: "Financial Services",
        areaOfOperation: "Federal Capital Territory, Nigeria",
        registered: "8091, Abuja, FCT",
        aboutShort: "Who We Are",
        aboutLong:
            "Established in 2001, St. Mulumba Trust Fund is a wholly owned financial arm of the Knights of St. Mulumba Metro Council Abuja. The fund was created to provide sustainable financial support for the Order's charitable activities, member welfare programmes, and community development initiatives across the FCT.\n\nOver more than two decades, the fund has disbursed millions of naira in grants, scholarships, and welfare support to thousands of families and individuals in need across the Abuja region.\n\nAll returns from the fund are directed toward the Metro Council's charitable programmes, Sub-Council activities, and the sustained growth of the Order's mission in the FCT.",
        stats: [
            { value: "₦500M+", label: "Funds Disbursed" },
            { value: "10,000+", label: "Beneficiaries" },
            { value: "12", label: "Communities Served" },
            { value: "20yr+", label: "Operating History" },
        ],
        impactText:
            "Since its establishment, St. Mulumba Trust Fund has disbursed over ₦500 million in grants and welfare support, benefiting thousands of families across the FCT.\n\nA significant portion of annual profits is channelled directly into the Metro Council's charitable fund, supporting outreach programmes, youth development, and member welfare across all Sub-Councils.\n\nBeyond grants and charity, the fund has created over 200 direct and indirect employment opportunities and contributed to parish infrastructure projects across more than twelve communities in the FCT.",
        leaders: [
            { role: "MANAGING DIRECTOR", name: "Sir Chukwuemeka Okosikwo" },
            { role: "SECRETARY", name: "Sir Adebayo Oluanya" },
            { role: "FINANCE DIRECTOR", name: "Sir Emmanuel Nwachukwu" },
        ],
    },
    {
        slug: "mulumba-insurance-services",
        category: "INSURANCE",
        name: "Mulumba Insurance Services Ltd",
        tagline:
            "Providing accessible and affordable insurance products to Catholic communities, parish groups, and families across Nigeria.",
        industry: "Insurance",
        areaOfOperation: "Federal Capital Territory, Nigeria",
        registered: "8090, Abuja, FCT",
        aboutShort: "Who We Are",
        aboutLong:
            "Established in 2004, Mulumba Insurance Services Ltd is a wholly owned subsidiary of the Knights of St. Mulumba Metro Council Abuja. The company was founded to fill a critical gap in accessible, faith-aligned insurance for Catholic communities across the FCT and beyond.\n\nOver more than two decades, the company has served thousands of policyholders including parish groups, Catholic schools, and individual families, offering life, health, and property insurance packages tailored to the community.\n\nAll profits from operations are directed toward the Metro Council's charitable programmes, Sub-Council activities, and the sustained growth of the Order's mission in the FCT.",
        stats: [
            { value: "8,000+", label: "Active Policyholders" },
            { value: "₦2B+", label: "Claims Settled" },
            { value: "12", label: "Communities Served" },
            { value: "18yr+", label: "Operating History" },
        ],
        impactText:
            "Since its establishment, Mulumba Insurance Services Ltd has served over 8,000 active policyholders and settled more than ₦2 billion in claims across the FCT.\n\nA significant portion of annual profits is channelled directly into the Metro Council's charitable fund, supporting outreach programmes, youth development, and member welfare across all Sub-Councils.\n\nBeyond insurance, the company has created over 150 direct employment opportunities and contributed to parish infrastructure projects across more than twelve communities in the FCT.",
        leaders: [
            { role: "MANAGING DIRECTOR", name: "Sir Chukwuemeka Okosikwo" },
            { role: "DIRECTOR, OPERATIONS", name: "Sir Adebayo Oluanya" },
            { role: "FINANCE DIRECTOR", name: "Sir Emmanuel Nwachukwu" },
        ],
    },
    {
        slug: "st-mulumba-properties",
        category: "REAL ESTATE",
        name: "St. Mulumba Properties Ltd",
        tagline:
            "A leading Catholic-aligned real estate development and property management company committed to creating quality, affordable spaces that support community growth across the Federal Capital Territory.",
        industry: "Real Estate Development",
        areaOfOperation: "Federal Capital Territory, Nigeria",
        registered: "8092, Abuja, FCT",
        aboutShort: "Who We Are",
        aboutLong:
            "Established in 2003, St. Mulumba Properties Ltd is a wholly owned subsidiary of the Knights of St. Mulumba Metro Council Abuja. Working under the banner of faith-driven enterprise and community responsibility, the company has delivered real estate across the Federal Capital Territory.\n\nOver more than two decades, the company has developed residential housing estates, commercial developments, and community facilities that have served thousands of families and organisations in the Abuja region.\n\nAll profits from operations are directed toward the Metro Council's charitable programmes, Sub-Council activities, and the sustained growth of the Order's mission in the FCT.",
        stats: [
            { value: "40+", label: "Properties Developed" },
            { value: "5,000+", label: "Housing Units" },
            { value: "12", label: "Communities Served" },
            { value: "20yr+", label: "Operating History" },
        ],
        impactText:
            "Since its establishment, St. Mulumba Properties Ltd has developed over 40 properties and delivered more than 5,000 affordable housing units across the FCT.\n\nA significant portion of annual profits is channelled directly into the Metro Council's charitable fund, supporting outreach programmes, youth development, and member welfare across all Sub-Councils.\n\nBeyond bricks and mortar, the company has created over 300 direct and indirect employment opportunities and contributed to parish infrastructure projects across more than twelve communities in the FCT.",
        leaders: [
            { role: "MANAGING DIRECTOR", name: "Sir Chukwuemeka Okosikwo" },
            { role: "SIR ADEBAYO OLUGARIA", name: "Sir Adehayo Oluanya" },
            { role: "FINANCE DIRECTOR", name: "Sir Emmanuel Nwachukwu" },
        ],
    },
];
