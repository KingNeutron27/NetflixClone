function Details({ release_date, runtime, budget, revenue, languages, status, popularity, IMDB_ID }) {
  return (
    <section className="bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg text-white shadow-lg">
      <header className="mb-4 sm:mb-6">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-100">Movie Details</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-5">
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Release Date</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">{release_date || '—'}</p>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Runtime</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">{runtime || 'N/A'}</p>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Budget</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">
              {budget && budget !== 'N/A' && budget !== '0' ? `$${budget}` : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Revenue</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">
              {revenue && revenue !== 'N/A' && revenue !== '0' ? `$${revenue}` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-5">
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Original Language</p>
            <div className="space-y-1">
              {languages && languages.length > 0 ? (
                languages.map((language, i) => (
                  <p key={i} className="text-base sm:text-lg font-medium text-gray-100">
                    {language.english_name || language.name || language.iso_639_1?.toUpperCase() || 'Unknown'}
                  </p>
                ))
              ) : (
                <p className="text-base sm:text-lg font-medium text-gray-100">—</p>
              )}
            </div>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Status</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                status === 'Released' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                status === 'Post Production' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                status === 'In Production' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                'bg-gray-600/20 text-gray-400 border border-gray-600/30'
              }`}>
                {status || 'Unknown'}
              </span>
            </p>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Popularity</p>
            <p className="text-base sm:text-lg font-medium text-gray-100">
              {popularity ? (
                <span className="flex items-center gap-2">
                  {popularity.toFixed(1)}
                  <span className="text-xs sm:text-sm text-gray-400">/ 100</span>
                </span>
              ) : '—'}
            </p>
          </div>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">IMDB</p>
            {IMDB_ID && IMDB_ID !== '—' ? (
              <a 
                href={`https://www.imdb.com/title/${IMDB_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-medium text-yellow-400 hover:text-yellow-300 transition-colors underline decoration-dotted underline-offset-2"
              >
                View on IMDB
              </a>
            ) : (
              <p className="text-base sm:text-lg font-medium text-gray-100">—</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details