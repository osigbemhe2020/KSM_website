const OurProjectsSection = () => {
  const projects = [
    {
      title: 'Youth empowerment',
      description: 'Support free skills IT skills development'
    },
    {
      title: 'Construction of st.Rita Parish',
      description: 'contributing the biggest church in the whole lord of...'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-700 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Support our projects</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            your donations will help us continue our projects which is part of our service to God and His Church.
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Donate
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurProjectsSection;