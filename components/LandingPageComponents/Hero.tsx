"use client";

import { useEffect, useState } from "react";

import heroImg1 from "@/assets/hero-brotherhood.jpg";
import heroImg2 from "@/assets/hero-image2.jpg";
import heroImg3 from "@/assets/hero-image3.jpg";

function HeroSection() {
  const images = [heroImg1, heroImg2, heroImg3];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[85vh]  w-full overflow-hidden">
      
      {/* Background Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          width={1920}
          height={1280}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-serif text-5xl leading-[1.05] max-w-4xl md:text-7xl lg:text-8xl">
          Faith. Service.
          <br />
          Brotherhood.
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
          Serving God and community through unity, leadership, and charity.
        </p>

        <a
          href="#join"
          className="mt-8 rounded-md bg-forest px-6 py-3 text-white transition hover:bg-[#144814]"
        >
          Join the Order
        </a>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              current === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// const HeroSection = () => {
//   return (
//     <section className="relative h-96 md:h-[500px] bg-gray-800 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40">
//         <div className="h-full w-full bg-gray-600"></div>
//       </div>
      
//       <div className="relative h-full flex items-center justify-center text-center px-4">
//         <div className="max-w-4xl">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//             Lorem ipsum dolor sit amet consectetur adipisic
//           </h2>
//           <p className="text-white/90 mb-8 max-w-2xl mx-auto text-sm md:text-base">
//             ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-gray-900 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
//               LEARN MORE
//             </button>
//             <button className="bg-green-700 text-white px-8 py-3 rounded font-semibold hover:bg-green-800 transition">
//               JOIN US
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

 export default HeroSection;

