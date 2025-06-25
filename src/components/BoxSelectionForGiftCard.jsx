import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, getImageUrl } from '../api';
import { useCart } from '../context/CartContext';
import MainButton from './addOns/MainButton';

export default function BoxSelectionForGiftCard({ giftCard, onClose }) {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBox, setSelectedBox] = useState(null);
  const navigate = useNavigate();
  const { addGiftCardToCart } = useCart();

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const response = await fetchData('/boxes');
        setBoxes(response || []);
      } catch (error) {
        console.error('Erreur lors du chargement des boxes:', error);
        setError('Impossible de charger les boxes disponibles');
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  const handleBoxSelect = (box) => {
    setSelectedBox(box);
  };  const handleConfirm = () => {
    if (!selectedBox) {
      setError('Veuillez sélectionner une box');
      return;
    }
    // Ajouter à la fois la box sélectionnée et la carte cadeau au panier
    addGiftCardToCart(giftCard, selectedBox);
    // Rediriger vers la page de commande
    navigate('/order');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="bg-white rounded-[2rem] p-8 max-w-[800px] w-full mx-4 shadow-2xl">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-[2rem] p-8 max-w-[900px] w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Choisir une box avec votre carte cadeau</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Informations de la carte cadeau */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-green-800">
                {giftCard.giftCardType?.name || 'Carte cadeau'}
              </div>
              <div className="text-sm text-green-600">
                Code: <span className="font-mono">{giftCard.code}</span>
              </div>
            </div>
            <div className="text-green-800 font-medium">
              Gratuit
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Liste des boxes */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Sélectionnez une box :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {boxes.map((box) => (
              <div
                key={box.id}
                onClick={() => handleBoxSelect(box)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedBox?.id === box.id
                    ? 'border-[#DB3D88] bg-pink-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >                
              <div className="flex items-start space-x-4">
                  {box.images && box.images.length > 0 ? (
                    <img
                      src={getImageUrl(box.images[0].link)}
                      alt={box.images[0].alt || box.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/64x64/F4AECC/ffffff&text=Box";
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Box</span>
                    </div>
                  )}<div className="flex-1">
                    <h4 className="font-medium text-lg">{box.name}</h4>
                    {box.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {box.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[#DB3D88] font-medium">
                        {box.price ? `${box.price}€` : 'Prix non défini'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/boxes/${box.id}`);
                        }}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors cursor-pointer"
                      >
                        Voir détails
                      </button>
                    </div>
                  </div>
                  {selectedBox?.id === box.id && (
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-[#DB3D88]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {boxes.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-lg">Aucune box disponible</p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Annuler
          </button>
          <MainButton
            text="Confirmer la sélection"
            onClick={handleConfirm}
            disabled={!selectedBox}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
