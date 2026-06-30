import WhoWeAreHero from "@/components/whoWeAreComponents/WhoWeAreHero";

const PhotoCard = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
            <div className="p-2">
                <p className="font-medium text-[16px] ">Activity of the day</p>
            </div>
        </div>


    );
};

const PhotoGalleryPage = () => {
    return (
        <div className="">
            <WhoWeAreHero
                title="Photo Gallery"
                description="Stay informed with the latest news, announcements, events, community stories, and updates from the Knights of St. Mulumba Metro Council Abuja."
            />
            <div className=" py-15 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
            </div>
        </div>
    );
};

export default PhotoGalleryPage;
