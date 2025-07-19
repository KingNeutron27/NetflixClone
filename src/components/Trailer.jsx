import { Play } from 'lucide-react';

function Trailer({ videosDetails, videosInfo }) {

  return (
    <section className='bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg'>
      {/* Header Section */}
      <div className='mb-4 sm:mb-6'>
        <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-white'>Videos</h1>
        <h2 className='font-semibold text-base sm:text-lg lg:text-xl text-gray-200'>Main Trailer</h2>
      </div>

      {/* Main Trailer */}
      <div className='rounded-lg overflow-hidden shadow-lg mb-6 sm:mb-8'>
        <iframe
          src={`https://www.youtube.com/embed/${videosDetails?.key}?start=113&autoplay=0&rel=0`}
          className='aspect-video w-full rounded-lg'
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Main Trailer"
          frameBorder="0"
        />
      </div>

      {/* Other Videos Section */}
      <div>
        <h1 className='text-base sm:text-lg lg:text-xl font-semibold mb-4 sm:mb-6 text-white'>Other Videos</h1>
        
        {videosInfo && videosInfo.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5'>
            {videosInfo.map((video) => (
              <div key={video.id} className='bg-gray-700 hover:bg-gray-600 p-3 sm:p-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'>
                <h2 className='font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2 text-white leading-tight'>
                  {video.name}
                </h2>
                <p className='text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 capitalize'>
                  {video.type}
                </p>
                <button
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg w-fit transition-all duration-200 cursor-pointer text-white font-medium text-sm sm:text-base hover:shadow-md"
                  aria-label={`Watch ${video.name}`}
                >
                  <Play size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                  <span>Watch</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-gray-700 p-4 sm:p-6 rounded-lg text-center'>
            <p className='text-gray-300 text-sm sm:text-base'>No additional videos available</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Trailer;