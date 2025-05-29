import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../components/ReviewModal";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);  const [selectedBoxForReview, setSelectedBoxForReview] = useState(null);
  const [existingReview, setExistingReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        const data = await fetchData("/profile/deliveries");
        setDeliveries(data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        setError("Une erreur est survenue lors du chargement des livraisons.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDeliveryTypeLabel = (type) => {
    switch (type) {
      case 'order':
        return 'Achat direct';
      case 'subscription':
        return 'Abonnement';
      default:
        return type;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'En préparation';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleReviewClick = async (delivery) => {
    try {
      // Vérifier s'il y a déjà un avis pour cette boîte
      const reviewData = await fetchData(`/reviews/user/${delivery.box_id}`);
      
      setSelectedBoxForReview({
        id: delivery.box_id,
        name: delivery.box_name
      });
      setExistingReview(reviewData.review);
      setIsReviewModalOpen(true);
    } catch (error) {
      console.error('Error fetching existing review:', error);
      // Même en cas d'erreur, on ouvre le modal pour créer un nouvel avis
      setSelectedBoxForReview({
        id: delivery.box_id,
        name: delivery.box_name
      });
      setExistingReview(null);
      setIsReviewModalOpen(true);
    }
  };

  const handleReviewSubmitted = (review) => {
    // Mettre à jour la liste des livraisons pour refléter qu'un avis a été laissé
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(delivery => 
        delivery.box_id === review.box_id 
          ? { ...delivery, can_review: false }
          : delivery
      )
    );
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen relative px-8 py-8 overflow-hidden">
      {/* Forme rose SVG à droite */}
      <div
        className="absolute -right-10 top-[30%] z-0 pointer-events-none bg-loomipink w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
        style={{
          borderRadius: "52% 48% 41% 59% / 50% 35% 65% 50%"
        }}
      />

      <div className="relative z-10 mx-[50px]">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="mb-2">Mes livraisons</h1>
          <p className="text-lg text-gray-600">
            Historique de toutes vos livraisons : boîtes achetées et abonnements
          </p>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : deliveries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Aucune livraison</h2>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore de livraisons à afficher.
            </p>
            <button
              onClick={() => navigate('/boxes')}
              className="bg-loomilightpink text-white px-6 py-3 rounded-xl hover:bg-loomipink transition-colors"
            >
              Découvrir nos boîtes
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {delivery.box_name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                        {getStatusLabel(delivery.status)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {getDeliveryTypeLabel(delivery.delivery_type)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {delivery.delivery_type === 'order' ? 'Commandée le' : 'Livrée le'}
                    </p>
                    <p className="font-medium">
                      {formatDate(delivery.delivery_date || delivery.order_date)}
                    </p>
                  </div>
                </div>

                {delivery.tracking_number && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Numéro de suivi :</span> {delivery.tracking_number}
                    </p>
                  </div>
                )}

                {delivery.delivery_type === 'subscription' && delivery.subscription_name && (
                  <div className="bg-purple-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-purple-700">
                      <span className="font-medium">Abonnement :</span> {delivery.subscription_name}
                    </p>
                  </div>
                )}                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {delivery.delivery_address && (
                      <p>📍 {delivery.delivery_address}</p>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    {delivery.can_review && (
                      <button
                        onClick={() => handleReviewClick(delivery)}
                        className="bg-loomilightpink text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-loomipink transition-colors cursor-pointer"
                      >
                        Laisser un avis
                      </button>
                    )}
                    {delivery.box_id && (
                      <button
                        onClick={() => navigate(`/boxes/${delivery.box_id}`)}
                        className="text-loomilightpink hover:text-loomipink text-sm font-medium cursor-pointer"
                      >
                        Voir la boîte →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>        )}
      </div>

      {/* Modal d'avis */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        boxId={selectedBoxForReview?.id}
        boxName={selectedBoxForReview?.name}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
