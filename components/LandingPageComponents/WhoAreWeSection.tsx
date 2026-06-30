const WhoAreWeSection = () => {
  return (
    <section className="py-16 cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-5xl text-foreground mb-6">Metro Grand Knight Address</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gray-300 rounded-lg overflow-hidden h-80">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-forest text-white p-6 rounded-lg shadow-lg">
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