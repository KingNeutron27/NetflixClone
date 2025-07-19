import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Share2, ThumbsUp, ThumbsDown, Download, Star, Calendar, Clock, Globe, Play, Users, Award } from "lucide-react"
import { useState, useEffect } from "react"
import Spinner from "../components/Spinner"
import Overview from "../components/Overview"
import Trailer from "../components/Trailer"
import Cast from "../components/Cast"
import Details from "../components/Details"
import { toast } from 'react-toastify'
import Reviews from "../components/Reviews"


function VideoPlayer() {
  const [videos, setVideos] = useState([])
  const [movies, setMovies] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [casts, setCasts] = useState([])
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [watchlist, setWatchlist] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()

  const API_KEY = import.meta.env.VITE_API_KEY

  const fetchVideoData = async() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    }
    try {
      setLoading(true)
      setError(null)
      // To fetch movie details
      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      if (!movieResponse.ok) throw new Error('Error fetching movie details')
      const movieResult = await movieResponse.json()
      setMovies(movieResult)

      // To fetch youtube trailer
      const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      if (!movieResponse.ok) throw new Error('Error fetching movie details')
      const videoResult = await videoResponse.json()
      setVideos(videoResult?.results)

      // To Fetch movies recommendations
      const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
      if (!recommendationsResponse.ok) throw new Error('Error fetching recommendations detail')
      const recommendationsResult = await recommendationsResponse.json()
      setRecommendations(recommendationsResult.results)

      //To Fetch movies casts
      const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
      if (!castResponse.ok) throw new Error('Error fetching casts detail')
      const castResult = await castResponse.json()
      setCasts(castResult?.cast)

    } catch (error) {
      setError('Error fetching data...', error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchVideoData()
  }, [id])

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h : ${mins}m`
  }

  const MainTrailer = videos?.find(video => video.type === 'Trailer')

  const handleLike = () => {
    setLiked(!liked)
    if(disLiked) setDisLiked(false)
  }

  const handleDislike = () => {
    setDisLiked(!disLiked)
    if(liked) setLiked(false)
    
  }
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movies.title,
          text: movies.tagline || movies.overview,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled sharing or other error
        console.log('Share cancelled or failed:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      } catch (error) {
        // Fallback if clipboard API fails
        console.error('Copy failed:', error)
        toast.error('Unable to copy link. Please copy manually: ' + window.location.href)
      }
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 min-h-screen bg-gray-900">
        <div className="text-white text-center">
          <p className="text-red-400 mb-4">Error loading movie: {error}</p>
          <button 
            onClick={fetchVideoData}
            className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
  loading ? <div className='mt-50'><Spinner loading={loading} /></div> : (
    <section className="bg-gray-900 min-h-screen w-full text-white">
        {/* Header */}
        <header className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base hidden xs:inline">Back</span>
          </button>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center truncate px-2 sm:px-4 flex-1 min-w-0">
            {movies.title}
          </h1>
          <div className="w-8 sm:w-16 lg:w-20 flex-shrink-0"></div>
        </header>

        {/* Hero Section */}
        <div className="relative">
          {/* Background Image Section */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-b from-transparent to-gray-900">
            <img
              src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
              alt={`${movies.title} background`}
              className="w-full h-full object-cover opacity-60 sm:opacity-50 md:opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
          
          {/* Content Section - Overlapping on mobile, side-by-side on desktop */}
          <div className="relative -mt-20 sm:-mt-24 md:absolute md:inset-0 md:mt-0">
            <div className="flex items-center justify-center md:justify-start h-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-center md:items-center w-full pt-4 md:pt-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                  alt={`${movies.title} poster`}
                  className="w-32 h-48 sm:w-36 sm:h-54 md:w-48 md:h-72 lg:w-56 lg:h-80 object-cover rounded-lg shadow-2xl flex-shrink-0 z-1"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center text-center md:text-left flex-1 min-w-0 bg-gray-900/90 md:bg-transparent rounded-lg md:rounded-none p-4 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                    {movies.title}
                  </h1>
                  {movies.tagline && (
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-2 sm:mb-3 md:mb-4 italic max-w-full md:max-w-2xl mx-auto md:mx-0">
                      "{movies.tagline}"
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center md:justify-start mb-3 md:mb-4 flex-wrap">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="text-yellow-400 fill-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base md:text-lg font-semibold">{movies.vote_average?.toFixed(1)}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">({movies.vote_count?.toLocaleString()} votes)</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{movies.release_date || "—"}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Clock size={14} className="sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{formatRuntime(movies.runtime)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {movies.genres?.slice(0, 4).map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 sm:px-3 py-1 bg-gray-700 rounded-full text-xs sm:text-sm flex-shrink-0"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  {MainTrailer && (
                    <button
                      onClick={() => setActiveTab('videos')}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-fit mx-auto md:mx-0 text-sm sm:text-base"
                    >
                      <Play size={16} className="sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Watch </span>Trailer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 mt-4 sm:mt-0">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6">
            <button
              onClick={handleLike}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors ${
                liked ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <ThumbsUp size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Like</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors ${
                disLiked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <ThumbsDown size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Dislike</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Share2 size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Share</span>
            </button>
            <button
              onClick={() => setWatchlist(!watchlist)}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors ${
                watchlist ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Download size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">{watchlist ? 'in wishlist' : 'Add'}</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-700 mb-4 sm:mb-4">
            <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide">
              {['overview', 'videos', 'cast', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'border-amber-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
          {activeTab === 'overview' && (
            <Overview
              description={movies.overview}
              companies={movies.production_companies}
              languages={movies.spoken_languages}
              images={recommendations}
            />
          )}
          {activeTab === 'videos' && (
            <div className="text-white">
              <Trailer
                videosDetails={MainTrailer}
                videosInfo={videos}
              />
            </div>
          )}
          {activeTab === 'cast' && (
            <div className="text-white">
              <Cast casts={casts} />
            </div>
          )}
          {activeTab === 'details' && (
            <div className="text-white">
              <Details
                release_date={movies.release_date}
                runtime={movies.runtime}
                budget={movies.budget}
                revenue={movies.revenue}
                languages={movies.spoken_languages}
                status={movies.status}
                popularity={movies.popularity}
                IMDB_ID={movies.imdb_id}
              />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <Reviews movie_id={id}/>
            </div>
          )}
        </div>
      </section>
  )
)}

export default VideoPlayer