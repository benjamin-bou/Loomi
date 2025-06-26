import { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../api';
import Stars from './Stars';

export default function SubscriptionReviewsList({ subscriptionTypeId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchData(`/subscriptions/${subscriptionTypeId}/reviews`);
      setReviews(data.reviews);
      setAverageRating(data.average_rating);
      setTotalReviews(data.total_reviews);
      setRatingDistribution(data.rating_distribution);
    } catch (error) {
      console.error('Error fetching subscription reviews:', error);
      setError('Erreur lors du chargement des avis');
    } finally {
      setLoading(false);
    }
  }, [subscriptionTypeId]);

  useEffect(() => {
    if (subscriptionTypeId) {
      fetchReviews();
    }
  }, [subscriptionTypeId, fetchReviews]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <Stars 
        rating={rating}
        size={16}
        spacing="space-x-0.5"
      />
    );
  };

  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    // Le backend retourne déjà les pourcentages, on les additionne juste
    // Pour l'affichage, on groupe les demi-étoiles avec les étoiles entières
    let percentage = 0;
    if (rating === 5) {
      percentage = (ratingDistribution['5'] || 0);
    } else if (rating === 4) {
      percentage = (ratingDistribution['4.5'] || 0) + (ratingDistribution['4'] || 0);
    } else if (rating === 3) {
      percentage = (ratingDistribution['3.5'] || 0) + (ratingDistribution['3'] || 0);
    } else if (rating === 2) {
      percentage = (ratingDistribution['2.5'] || 0) + (ratingDistribution['2'] || 0);
    } else if (rating === 1) {
      percentage = (ratingDistribution['1.5'] || 0) + (ratingDistribution['1'] || 0) + (ratingDistribution['0.5'] || 0);
    }
    return Math.round(percentage);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Résumé des notes */}
      {totalReviews > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-800">
                  {averageRating}
                </span>
                <Stars 
                  rating={averageRating}
                  size={20}
                  spacing="space-x-0.5"
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {totalReviews} avis
              </p>
            </div>
          </div>

          {/* Distribution des notes */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-8">
                  {rating} ★
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {getRatingPercentage(rating)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des avis */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">💭</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Aucun avis pour le moment
          </h3>
          <p className="text-gray-500">
            Soyez le premier à partager votre expérience !
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Avis des abonnés ({totalReviews})
          </h3>
          
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">
                      {review.user.first_name} {review.user.last_name[0]}.
                    </span>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>
              
              {review.comment && (
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
