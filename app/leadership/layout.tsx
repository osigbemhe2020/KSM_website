import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen bg-cream">
            <WhoWeAreHero
                title="Leadership"
                description="A clear hierarchy built on service, accountability, and shared purpose."
            />
            {children}
        </main>
    );
}