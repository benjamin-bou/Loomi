import { useState } from 'react';
import { postData, updateBox } from '../api';
import Stars from './Stars';

export default function ReviewModal({ isOpen, onClose, boxId, boxName, existingReview = null, onReviewSubmitted }) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Veuillez sélectionner une note');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const reviewData = {
        box_id: boxId,
        rating,
        comment: comment.trim()
      };      let response;
      if (existingReview) {
        // Mise à jour d'un avis existant
        response = await updateBox(`/reviews/${existingReview.id}`, reviewData);
      } else {
        // Création d'un nouvel avis
        response = await postData('/reviews', reviewData);
      }

      if (onReviewSubmitted) {
        onReviewSubmitted(response.review);
      }
      
      onClose();
      setRating(0);
      setComment('');
      setError('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.message || 'Une erreur est survenue lors de l\'envoi de votre avis');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    if (!existingReview) {
      setRating(0);
      setComment('');
    }
  };

  if (!isOpen) return null;  return (
    <div 
        className="fixed inset-0 flex items-center justify-center z-[60] p-4" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {existingReview ? 'Modifier votre avis' : 'Laisser un avis'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">{boxName}</h3>
          </div>

          <form onSubmit={handleSubmit}>            {/* Rating Stars */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note *
              </label>              <Stars 
                rating={rating}
                size={30}
                interactive={true}
                onStarClick={handleStarClick}
                spacing="space-x-1"
                allowHalfStars={true}
              />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire (optionnel)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience avec cette boîte..."
                maxLength={1000}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-loomilightpink focus:border-transparent resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {comment.length}/1000 caractères
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex-1 px-4 py-2 bg-loomilightpink text-white rounded-lg hover:bg-loomipink disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Envoi...' : (existingReview ? 'Modifier' : 'Publier')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
