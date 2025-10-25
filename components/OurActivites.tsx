const OurActivitiesSection = () => {
  const activities = [
    { title: 'Activity 1', count: '24 recent event there' },
    { title: 'Activity 2', count: '24 recent event there' },
    { title: 'Activity 3', count: 'Activities on outreach in area...' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Activities</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{activity.count}</p>
                <button className="text-green-700 font-semibold hover:text-green-800 transition">
                  View more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurActivitiesSection;
