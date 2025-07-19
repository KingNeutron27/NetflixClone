function Overview({ description, companies, languages, images }) {
 
  return (
    <section className="bg-gray-800 rounded-lg text-white p-4 sm:p-6 lg:p-8">
      {/* Overview Text */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">Overview</h1>
        <p className="leading-relaxed text-gray-200 text-sm sm:text-base lg:text-lg">{description}</p>
      </div>
      
      {/* Companies & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div>
          <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Production Companies</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {companies?.map((company) => (
              <button 
                key={company.id} 
                className="rounded-full bg-gray-600 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm transition-all"
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {languages?.map((language, i) => (
              <button 
                key={i} 
                className="rounded-full bg-gray-600 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm transition-all"
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Recommendations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {images?.slice(0, 6).map(movie => (
            <div key={movie.id} className="text-center group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 px-1 leading-tight">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Overview