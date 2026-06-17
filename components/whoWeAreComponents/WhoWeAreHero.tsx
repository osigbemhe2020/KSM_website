import skyImg from "@/assets/history-sky.jpg";

function WhoWeAreHero({title, description}: {title: string, description: string}) {
    return (
      <section className="relative h-[340px] w-full overflow-hidden">
        <style>{`
          .hero-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2rem;
            height: 100%;
          }
          .hero-title {
            flex: 1;
            text-align: left;
          }
          .hero-description {
            flex: 1;
            text-align: left;
          }
          @media (max-width: 768px) {
            .hero-container {
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 0.5rem;
            }
            .hero-title {
              flex: none;
              text-align: center;
            }
            .hero-description {
              flex: none;
              text-align: center;
              font-size: 1.1rem;
              line-height: 1.4;
            }
          }
        `}</style>
        <img src={skyImg.src} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={768} />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-cream/30" />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 hero-container">
          <h1 className="font-serif text-5xl md:text-7xl text-foreground leading-tight hero-title">{title}</h1>
          <p className="font-serif text-2xl md:text-3xl text-foreground/90 leading-snug hero-description">{description}</p>
        </div>
      </section>
    );
  }

export default WhoWeAreHero;