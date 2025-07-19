import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

function Reviews({ movie_id }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${API_KEY}`, options
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.results || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movie_id) {
      fetchReviews();
    }
  }, [movie_id]);

  return (
    <section className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg text-white shadow-lg">
      <header className="mb-4 sm:mb-6">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">User Reviews</h2>
      </header>

      {loading ? (
        <div className="text-center text-gray-400">Loading reviews...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400">No reviews available for this movie.</div>
      ) : (
        <div className="space-y-6">
          {reviews.slice(0, 5).map((review) => (
            <article
              key={review.id}
              className="border-b border-gray-700 pb-4 sm:pb-6 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-lg font-semibold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 mt-3 sm:mt-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-100">
                      {review.author}
                    </h3>
                    {review.author_details?.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                        <span className="text-sm sm:text-base font-medium">
                          {review.author_details.rating.toFixed(1)}/10
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 line-clamp-4">
                    {review.content}
                  </p>
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-500 hover:text-red-400 transition-colors"
                  >
                    Read full review
                    
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;