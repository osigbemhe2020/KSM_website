import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen bg-cream">
            <WhoWeAreHero title="Charity & Outreach" description="Extending God's love through compassionate service and structured community support across the Abuja metropolis." />
            {children}
        </main>
    );
}