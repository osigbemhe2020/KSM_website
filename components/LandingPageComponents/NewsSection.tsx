import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { client } from "@/sanity/lib/client";
import { newsPostsQuery } from "@/sanity/lib/queries";

type NewsPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  hero?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
};

const NewsSection = async () => {
  const newsPosts = await client.fetch<NewsPost[]>(newsPostsQuery);
  const latestNews = newsPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl">News & Updates</h2>
          <p className="mt-4 text-muted-foreground">Stay informed about the latest from the Metro Council.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latestNews.map((n) => (
            <NewsCard
              key={n._id}
              title={n.title}
              date={formatDate(n.publishedAt)}
              imageSrc={n.hero?.asset?.url || ''}
              excerpt={n.excerpt}
              href={`/news-and-updates/${n.slug.current}`}
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
};

export default NewsSection;
