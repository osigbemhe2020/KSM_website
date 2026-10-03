import Image from "next/image";
import metroGk from "@/assets/images/home/metro-gk.jpg";

const WhoAreWeSection = () => {
  return (
    <section className="py-16 cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="font-serif text-5xl text-foreground mb-6">Metro Grand Knight Address</h2>
        <div className="grid md:grid-cols-[52%_38%] gap-18 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              “Welcome to the digital home of the Abuja Metropolitan Council 
              of the Knights of St. Mulumba Nigeria. As Catholic laymen, 
              our solemn mandate is rooted in unwavering faith, 
              high Christian morals, and selfless service. Through this 
              official portal, we connect our sub-councils, share our spiritual 
              apostolates, and extend Christ’s 
              mercy through impactful charitable outreaches across Central Nigeria.
               We invite you to explore our rich history, mission, and 
               community programs.”
            </p>
            <h4 className="font-bold text-md text-forest">
              — Sir Johnson Abiodun Jimoh (KSG, KSM), Worthy Metropolitan Grand Knight
            </h4>
          </div>

          <div className="relative">
            <div className="bg-gray-300 rounded-lg overflow-hidden h-72">
              <Image 
                src={metroGk} 
                alt="Metro Grand Knight" 
                className="w-full h-full object-contain"
              />
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