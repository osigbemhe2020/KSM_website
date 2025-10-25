const WhoAreWeSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Are we</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
              READ MORE &gt;&gt;
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-gray-300 rounded-lg overflow-hidden h-80">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-green-700 text-white p-6 rounded-lg shadow-lg">
              <p className="font-bold text-lg">Sir Johnson Jimoh</p>
              <p className="text-sm text-green-100">Metro Grand Knight</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWeSection;