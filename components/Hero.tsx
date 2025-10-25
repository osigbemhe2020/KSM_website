const HeroSection = () => {
  return (
    <section className="relative h-96 md:h-[500px] bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40">
        <div className="h-full w-full bg-gray-600"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Lorem ipsum dolor sit amet consectetur adipisic
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
              LEARN MORE
            </button>
            <button className="bg-green-700 text-white px-8 py-3 rounded font-semibold hover:bg-green-800 transition">
              JOIN US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

