import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen bg-cream">
            <WhoWeAreHero
                title="Metro Investments"
                description="Our investments and business ventures support long-term sustainability, community development, and the continued growth of our mission."

            />
            {children}
        </main>
    );
}