import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainButton from '../components/addOns/MainButton';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Récupérer les données de commande depuis les paramètres URL ou localStorage
    const orderDataFromUrl = searchParams.get('orderData');
    const orderDataFromStorage = localStorage.getItem('lastOrderData');
    
    if (orderDataFromUrl) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(orderDataFromUrl));
        setOrderData(parsedData);
        // Sauvegarder dans localStorage pour le cas où l'utilisateur rafraîchit la page
        localStorage.setItem('lastOrderData', JSON.stringify(parsedData));
      } catch (error) {
        console.error('Erreur lors du parsing des données de commande:', error);
      }
    } else if (orderDataFromStorage) {
      try {
        const parsedData = JSON.parse(orderDataFromStorage);
        setOrderData(parsedData);
      } catch (error) {
        console.error('Erreur lors du parsing des données de commande depuis localStorage:', error);
      }
    }

    // Nettoyer les données de localStorage après 10 minutes
    const cleanup = setTimeout(() => {
      localStorage.removeItem('lastOrderData');
    }, 10 * 60 * 1000);

    return () => clearTimeout(cleanup);
  }, [searchParams]);

  const handleNavigateToOrders = () => {
    navigate('/profile/orders');
  };

  const handleNavigateToSubscription = () => {
    navigate('/profile/subscription');
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  // Si aucune donnée de commande n'est disponible, rediriger vers la page d'accueil
  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
            Aucune information de commande trouvée
          </h2>
          <MainButton 
            onClick={handleNavigateToHome}
            className="bg-loomilightpink text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition-colors"
          >
            Retour à l'accueil
          </MainButton>
        </div>
      </div>
    );
  }

  const hasSubscription = orderData.items?.some(item => 
    item.type === 'subscription' || item.subscription_type_id
  );

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'gift_card':
        return 'Carte cadeau';
      case 'visa':
        return 'Visa';
      case 'cb':
        return 'Carte bancaire';
      case 'applepay':
        return 'Apple Pay';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Non spécifié';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] py-8">
      <div className="container mx-auto px-4">
        {/* Forme blob décorative */}
        {/* Forme blob en haut à droite */}
        <div
            className="absolute -right-12 top-50 z-0 pointer-events-none bg-loomipink w-[22vw] h-[18vw] max-w-[520px] max-h-[300px]"
            style={{
              borderRadius: "53% 47% 60% 40% / 63% 49% 51% 37%",
            }}
          />
          {/* Forme rose foncé gauche */}
          <div
            className="hidden lg:block absolute left-0 -bottom-30 w-[153px] h-[411px] bg-loomipink z-50"
            style={{
              borderRadius: "55% 45% 65% 35% / 60% 45% 55% 40%",
              transform: "rotate(-25deg)",
            }}
          />

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative z-10">
          {/* En-tête de félicitations */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Félicitations ! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Votre commande a été confirmée avec succès
            </p>
          </div>

          {/* Détails de la commande */}
          <div className="bg-lightgrey rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Résumé de votre commande
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de commande :</span>
                <span className="font-semibold">#{orderData.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date :</span>
                <span className="font-semibold">
                  {new Date(orderData.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Mode de paiement :</span>
                <span className="font-semibold">
                  {getPaymentMethodDisplay(orderData.payment_method)}
                </span>
              </div>
              
              <div className="flex justify-between text-lg font-bold pt-3 border-t">
                <span>Total :</span>
                <span>{formatPrice(orderData.total)} €</span>
              </div>
            </div>
          </div>

          {/* Articles commandés */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Articles commandés
            </h3>
            <div className="space-y-2">
              {orderData.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="font-medium">
                      {item.type === 'subscription' ? (item.label || item.name) : (item.name || item.title)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    )}
                  </div>
                  <span className="font-semibold">
                    {item.type === 'giftcard_usage' ? 'Gratuit' : `${formatPrice(item.price || item.base_price)} €`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <MainButton 
              onClick={handleNavigateToOrders}
              className="w-full bg-loomilightpink text-white py-3 rounded-lg hover:bg-loomipink transition-colors"
              text="Voir mes commandes"
            />
            
            {hasSubscription && (
              <MainButton 
                onClick={handleNavigateToSubscription}
                className="w-full bg-loomilightpink py-3 rounded-lg hover:bg-loomipink transition-colors"
                text="Gérer mon abonnement"
              />
            )}
            
            <MainButton 
              onClick={handleNavigateToHome}
              className="w-full bg-transparent py-3 rounded-lg border-[#8B4513] hover:bg-gray-100 transition-colors"
              text="Retourner à l'accueil"
            >
            </MainButton>
          </div>

          {/* Message additionnel */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              📧 Vous recevrez bientôt un email de confirmation avec tous les détails de votre commande.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
