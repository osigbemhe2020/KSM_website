import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen bg-cream">
            <WhoWeAreHero title="Our Projects" description="Our projects are a reflection of our commitment to God and His Church. We believe that through our projects, we can make a positive impact on the lives of those around us." />
            {children}
        </main>
    );
}