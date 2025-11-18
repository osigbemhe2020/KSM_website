const Title = ({title}: {title: string}) => {
    return(
        <section className="w-full bg-gray-100 px-6 py-10 md:py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-black mb-8">{title}</h1>
        </div>
      </section>
    )
}

export default Title