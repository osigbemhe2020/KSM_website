const NewsSection = () => {
  const news = [
    {
      date: '1st november 2025',
      title: 'winning of the holy cup',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
    },
    {
      date: '1st november 2025',
      title: 'winning of the holy cup',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
    },
    {
      date: '1st november 2025',
      title: 'winning of the holy cup',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et voluptate delectare accusantium doloremque laudantium'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">News & updates</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48  bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="p-6">
                <p className="text-green-700 text-sm font-semibold mb-2">{item.date}</p>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <button className="text-green-700 font-semibold hover:text-green-800 transition">
                  READ ALL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

