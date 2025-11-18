const PhotoCard = () => {
    return (
            <div  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="p-2">
                <p className="font-medium text-[16px] ">Activity of the day</p>
              </div>
            </div>

       
    );
};

const PhotoGalleryPage = () => {
    return (
        <div className="py-15 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Photo Gallery</h2>
            <div className="grid md:grid-cols-3 gap-8">
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
