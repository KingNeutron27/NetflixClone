function Cast({ casts }) {
  return (
    <section className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg text-white">
      <header>
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4">
          Cast
        </h2>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {casts?.slice(0, 10).map((cast) => (
          <article
            key={cast.cast_id}
            className="text-center flex flex-col items-center"
          >
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                  : "/placeholder-image.jpg" // Fallback image
              }
              alt={`${cast.name} profile`}
              className="object-cover object-center h-40 sm:h-48 md:h-56 w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              loading="lazy"
              onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback on error
            />
            <h3 className="font-semibold text-base sm:text-lg md:text-xl mt-2 line-clamp-2">
              {cast.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-1">
              {cast.character || "Unknown character"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Cast;