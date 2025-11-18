export function FeaturedArticle() {
  const loremIpsum = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.

qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisl ut aliquid ex ea commodo consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.`

  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">News Heading/ Title</h1>

      {/* Large Image */}
      <div className="mb-6">
        <div className="bg-gray-300 h-96 mb-2" />
        <div className="shadow-lg h-12" />
      </div>

      {/* Article Text */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-800">
        <p>{loremIpsum.split("\n\n")[0]}</p>
        <p>{loremIpsum.split("\n\n")[1]}</p>
      </div>
    </article>
  )
}
