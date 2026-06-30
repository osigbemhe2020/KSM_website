import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { news as newsData, formatDate } from "@/lib/news-data";

function NewsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl">News & Updates</h2>
          <p className="mt-4 text-muted-foreground">Stay informed about the latest from the Metro Council.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {newsData.slice(0, 3).map((n) => (
            <NewsCard
              key={n.slug}
              title={n.title}
              date={formatDate(n.date)}
              imageSrc={n.image.src}
              excerpt={n.excerpt}
              href={`/news-and-updates/${n.slug}`}
            />
          ))}
        </div>
        <div className="text-center mt-14">
          <Button
            href="/news-and-updates"
            className="inline-flex px-6 rounded  w-auto mt-0"
          >
            Read Our News and Updates <span className="ml-2"><ArrowRight className="w-4 h-4" /></span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
