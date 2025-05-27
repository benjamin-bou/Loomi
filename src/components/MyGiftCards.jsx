import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api';
import { useCart } from '../context/CartContext';

export default function MyGiftCards() {
  const [myGiftCards, setMyGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { activatedGiftCards, addGiftCardToCart, removeActivatedGiftCard } = useCart();  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        setLoading(true);
        // Récupérer les cartes depuis la base de données
        const response = await fetchData('/my-gift-cards');
        const dbGiftCards = response.giftCards || [];
          // Synchroniser avec le localStorage
        const localGiftCards = activatedGiftCards || [];
        
        // Supprimer les cartes invalides du localStorage
        localGiftCards.forEach(localCard => {
          const isValid = dbGiftCards.find(dbCard => dbCard.code === localCard.code && !dbCard.used_at);
          if (!isValid) {
            removeActivatedGiftCard(localCard.id);
          }
        });
        
        // Utiliser les données de la base comme source de vérité
        setMyGiftCards(dbGiftCards);
        
      } catch (error) {
        console.error('Erreur lors du chargement des cartes cadeaux:', error);
        // En cas d'erreur, utiliser les cartes du localStorage comme fallback
        setMyGiftCards(activatedGiftCards || []);
        setError('Impossible de vérifier le statut des cartes cadeaux');
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, [activatedGiftCards, removeActivatedGiftCard]);

  const handleUseGiftCard = (giftCard) => {
    // Ajouter la carte au panier avec prix 0
    addGiftCardToCart(giftCard);
    // Rediriger vers la page de commande
    navigate('/order');
  };
  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-[2rem] p-8">
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-700 text-sm">{error}</span>
          </div>
        </div>
      )}
      
      {myGiftCards.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <div className="text-6xl mb-4">🎁</div>
          <p className="text-lg">Aucune carte cadeau activée</p>
          <p className="text-sm mt-2">Activez vos cartes cadeaux pour les voir ici</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myGiftCards.map((giftCard) => (
            <div 
              key={giftCard.id} 
              className={`border rounded-lg p-4 ${
                giftCard.usedForPayment || giftCard.used_at 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-lg">
                    {giftCard.giftCardType?.name || 'Carte cadeau'}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Code: <span className="font-mono">{giftCard.code}</span>
                  </div>
                  {giftCard.expiration_date && (
                    <div className="text-sm text-gray-500 mt-1">
                      Expire le: {new Date(giftCard.expiration_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>                <div className="text-right">
                  {giftCard.usedForPayment || giftCard.used_at ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Utilisée
                    </span>
                  ) : (
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Disponible
                      </span>
                      <button
                        onClick={() => handleUseGiftCard(giftCard)}
                        className="px-4 py-2 bg-[#DB3D88] text-white rounded-lg text-sm font-medium hover:bg-[#C8327A] transition-colors cursor-pointer"
                      >
                        Utiliser
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {giftCard.giftCardType?.description && (
                <div className="mt-3 text-sm text-gray-600">
                  {giftCard.giftCardType.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
