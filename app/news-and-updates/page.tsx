import { NewsCard } from "@/components/NewsComponents/news-card"
import { FeaturedArticle } from "@/components/NewsComponents/featured-article"



export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="border-t border-black mb-2" />
        <h1 className="text-3xl font-bold text-center py-4">News and Updates</h1>
        <div className="border-b border-black" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <FeaturedArticle />
          </div>

          {/* Latest News Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6">Latest News</h2>
            <div className="space-y-4">
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />  
                <NewsCard />
                <NewsCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
