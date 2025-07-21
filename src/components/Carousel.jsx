import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY

  const fetchMoviesData = async() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const result = await response.json();  
      setMovies(result.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesData();
    
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 480) setItemsToShow(1);      // Mobile small
      else if (width < 640) setItemsToShow(2); // Mobile
      else if (width < 768) setItemsToShow(3); // Tablet small
      else if (width < 1024) setItemsToShow(4); // Tablet
      else if (width < 1280) setItemsToShow(5); // Desktop
      else setItemsToShow(6); // Large desktop
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, movies.length - itemsToShow));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= movies.length - itemsToShow;
  const visibleSlides = movies.slice(currentIndex, currentIndex + itemsToShow);

  // Dynamic grid classes for better responsiveness
  const getGridClasses = () => {
    return `grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 ${
      itemsToShow === 1 ? 'grid-cols-1' :
      itemsToShow === 2 ? 'grid-cols-2' :
      itemsToShow === 3 ? 'grid-cols-3' :
      itemsToShow === 4 ? 'grid-cols-4' :
      itemsToShow === 5 ? 'grid-cols-5' : 'grid-cols-6'
    }`;
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="text-white text-center max-w-md">
          <p className="text-red-400 mb-4 text-sm sm:text-base">Error loading movies: {error}</p>
          <button 
            onClick={fetchMoviesData}
            className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <p className="text-white text-center">No movies available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-2 sm:px-4 lg:px-6 xl:px-8">
      <div className="relative flex items-center">
        {/* Previous button */}
        <button
          className={`absolute left-0 z-20 rounded-full p-1.5 sm:p-2 md:p-3 text-white transition-all duration-200 ${
            isPrevDisabled 
              ? 'bg-gray-600/50 cursor-not-allowed opacity-50' 
              : 'bg-black/70 hover:bg-black/90 hover:scale-110 backdrop-blur-sm shadow-lg'
          }`}
          onClick={prevSlide}
          disabled={isPrevDisabled}
          aria-label="Previous slide"
        >
          <MdArrowBack className="text-sm sm:text-lg md:text-xl" />
        </button>

        {/* Carousel container */}
        <div className="overflow-hidden mx-6 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-14 w-full">
          <div className={getGridClasses()}>
            {visibleSlides.map((movie, index) => (
              <Link 
                to={`video/${movie.id}`} 
                key={`${movie.id}-${currentIndex}`}
                className="group relative block transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-40 xs:h-42 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Movie index number */}
                  <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2">
                    <span
                      className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-lg"
                      style={{ textShadow: '2px 2px 4px rgba(255, 0, 0, 0.8)' }}
                    >
                      {currentIndex + index + 1}
                    </span>
                  </div>
                </div>
                
                {/* Movie title */}
                <div className="mt-2 px-1">
                  <h3 className="text-white text-xs sm:text-sm md:text-base font-medium line-clamp-2 group-hover:text-red-400 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-amber-400 text-xs sm:text-sm mt-1">
                    ({movie.release_date?.slice(0, 4) ?? 'N/A'})
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          className={`absolute right-0 z-20 rounded-full p-1.5 sm:p-2 md:p-3 text-white transition-all duration-200 ${
            isNextDisabled 
              ? 'bg-gray-600/50 cursor-not-allowed opacity-50' 
              : 'bg-black/70 hover:bg-black/90 hover:scale-110 backdrop-blur-sm shadow-lg'
          }`}
          onClick={nextSlide}
          disabled={isNextDisabled}
          aria-label="Next slide"
        >
          <MdArrowForward className="text-sm sm:text-lg md:text-xl" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: Math.ceil(movies.length / itemsToShow) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * itemsToShow)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              Math.floor(currentIndex / itemsToShow) === i 
                ? 'bg-red-500 w-4' 
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;