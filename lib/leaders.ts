export interface Leader {
    id: string;
    role: string;
    roleShort: string;
    name: string;
    serving: string;
    tag: string;
    tagline: string;
    bio: string;
    responsibilities: string[];
    gifts: string[];
}

export const leaders: Leader[] = [
    {
        id: "anthony-okonkwo",
        role: "METROPOLITAN GRAND KNIGHT",
        roleShort: "Metropolitan Grand Knight",
        name: "Sir Kt. Anthony O. Okonkwo",
        serving: "Serving since 2008, #KSL",
        tag: "#KSL",
        tagline:
            "A devoted Catholic, family man, and public-spirited servant who leads the Metro Council with nearly three decades of fraternal service.",
        bio: "A devoted Catholic, family man, and public-spirited servant, Sir Kt. Anthony Okonkwo brings to the office of Metropolitan Grand Knight nearly three decades of fraternal service and an unwavering commitment to the mission of the Order.\n\nElected to lead the Metro Council in 2008, Sir Kt. Okonkwo has championed parish communities, escalated mentorship for younger Knights, and pioneered the capacity for charitable works across the Federal Capital Territory.\n\nInitiated into the Order in 1996, Sir Kt. Okonkwo previously served as Deputy Metropolitan Grand Knight, before serving as the Metropolitan Grand Knight. He is a communicant of Our Lady Queen of Nigeria Pro-Cathedral, Abuja.",
        responsibilities: [
            "Presiding over Metro Council convocations and executive sessions",
            "Representing the Order before the Archdiocese and civic authorities",
            "Oversight of all Council ministries, projects, and finances",
            "Spiritual and moral leadership of the brotherhood",
        ],
        gifts: ["Parish outreach", "Membership", "Institutional stewardship"],
    },
    {
        id: "emmanuel-okafor",
        role: "DEPUTY METROPOLITAN GRAND KNIGHT",
        roleShort: "Deputy Metropolitan Grand Knight",
        name: "Sir Kt. Dr. Emmanuel C. Okafor",
        serving: "Serving since 2016",
        tag: "#KSL",
        tagline:
            "A physician and lay leader devoted to the formation of younger Knights and the pastoral life of the Council.",
        bio: "Sir Kt. Dr. Emmanuel C. Okafor is a distinguished physician and devoted Catholic lay leader who has served the Metro Council with dedication since 2016. He brings his professional discipline and pastoral sensitivity to the role of Deputy Metropolitan Grand Knight.\n\nDr. Okafor has been instrumental in mentoring younger members of the Order and supporting the spiritual formation of Knights across all Sub-Councils. His medical background has also proven invaluable in guiding the Council's welfare and health outreach initiatives.\n\nHe is a communicant of the Holy Trinity Cathedral, Abuja, and has served the Order in various capacities over two decades of fraternal service.",
        responsibilities: [
            "Supporting the Grand Knight in presiding over Council meetings",
            "Coordinating formation programmes for younger members",
            "Overseeing pastoral and welfare activities across Sub-Councils",
            "Acting Metropolitan Grand Knight in the absence of the Grand Knight",
        ],
        gifts: ["Youth formation", "Pastoral care", "Medical welfare"],
    },
    {
        id: "joseph-adekunle",
        role: "METROPOLITAN CHANCELLOR",
        roleShort: "Metropolitan Chancellor",
        name: "Sir Kt. Barr. Joseph A. Adekunle",
        serving: "Serving since 2018",
        tag: "#KSL",
        tagline:
            "A senior law-attuned barrister guiding the Council with precision, discipline, fraternity, and constitutional fidelity.",
        bio: "Sir Kt. Barr. Joseph A. Adekunle is a distinguished barrister and legal practitioner who has brought his expertise in law and governance to the role of Metropolitan Chancellor since 2018.\n\nAs Chancellor, Sir Kt. Adekunle is responsible for maintaining the constitutional integrity of the Metro Council, overseeing the admission and formation of new members, and ensuring that all Council activities align with the laws and statutes of the Order.\n\nHis commitment to fraternal discipline, constitutional fidelity, and servant leadership has earned him wide respect across the Metro Council. He is a communicant of St. Andrew's Cathedral, Wuse, Abuja.",
        responsibilities: [
            "Maintaining the constitutional records and statutes of the Council",
            "Overseeing admission and formation of new members",
            "Advising the Grand Knight on legal and constitutional matters",
            "Coordinating the Order of the Council during ceremonies",
        ],
        gifts: ["Constitutional governance", "Member formation", "Legal counsel"],
    },
    {
        id: "peter-eze",
        role: "METROPOLITAN TREASURER",
        roleShort: "Metropolitan Treasurer",
        name: "Sir Kt. Peter N. Eze",
        serving: "Serving since 2020",
        tag: "#KSL",
        tagline:
            "A chartered accountant carrying the financial resources of the Order with quiet diligence and unwavering transparency.",
        bio: "Sir Kt. Peter N. Eze is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) who has served as Metropolitan Treasurer since 2020, bringing impeccable financial stewardship to the Metro Council.\n\nAs Treasurer, Sir Kt. Eze manages the fiscal resources of the Metro Council, ensures compliance with financial obligations, and prepares comprehensive reports for the Council's review. His approach to financial management is characterised by transparency, prudence, and accountability.\n\nHe is a communicant of Our Lady Queen of Nigeria Pro-Cathedral, Abuja, and has been a Knight of St. Mulumba for over fifteen years.",
        responsibilities: [
            "Managing and safeguarding the financial resources of the Council",
            "Preparing financial reports and presenting to the Council",
            "Overseeing dues collection and disbursements",
            "Ensuring compliance with financial obligations of the Order",
        ],
        gifts: ["Financial stewardship", "Accountability", "Strategic budgeting"],
    },
];
