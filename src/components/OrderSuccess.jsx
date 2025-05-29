import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from './addOns/MainButton';

const OrderSuccess = ({ order, onClose }) => {
  const navigate = useNavigate();

  const handleNavigateToOrders = () => {
    navigate('/orders');
    onClose();
  };

  const handleNavigateToSubscription = () => {
    navigate('/subscription');
    onClose();
  };

  const handleNavigateToHome = () => {
    navigate('/');
    onClose();
  };

  // Vérifier s'il y a un abonnement dans la commande
  const hasSubscription = order?.items?.some(item => item.type === 'subscription') || order?.subscription_id;

  // Calculer le total de la commande
  const calculateTotal = () => {
    if (order?.total) return order.total;
    if (order?.items) {
      return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }
    return '0.00';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-loomibeige rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Formes blob décoratives */}
        <div
          className="absolute -right-8 -top-8 w-24 h-24 bg-loomipink z-10 pointer-events-none"
          style={{
            borderRadius: "52% 48% 46% 54% / 59% 61% 39% 41%",
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute -left-6 bottom-10 w-20 h-20 bg-loomipink z-10 pointer-events-none"
          style={{
            borderRadius: "48% 52% 60% 40% / 50% 40% 60% 50%",
            transform: "rotate(-12deg)",
          }}
        />

        {/* Contenu principal */}
        <div className="relative z-20 p-8">
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>

          {/* Titre et félicitations */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Félicitations !
            </h2>
            <p className="text-lg text-gray-600">
              Votre commande a été validée avec succès
            </p>
          </div>

          {/* Résumé de la commande */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Résumé de votre commande</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de commande :</span>
                <span className="font-medium">#{order?.id || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date :</span>
                <span className="font-medium">
                  {order?.created_at ? formatDate(order.created_at) : 'Aujourd\'hui'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Montant total :</span>
                <span className="font-semibold text-lg">{calculateTotal()} €</span>
              </div>
            </div>

            {/* Articles commandés */}
            {order?.items && order.items.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Articles commandés :</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name || item.label || 'Article'}</span>
                      <span>{item.quantity || 1}x {item.price || '0.00'} €</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <MainButton 
                text="Voir mes commandes"
                onClick={handleNavigateToOrders}
                className="flex-1"
              />
              
              {hasSubscription && (
                <MainButton 
                  text="Mon abonnement"
                  onClick={handleNavigateToSubscription}
                  className="flex-1"
                />
              )}
            </div>
            
            <button
              onClick={handleNavigateToHome}
              className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-loomipink hover:text-loomipink transition-colors duration-300"
            >
              Retourner à l'accueil
            </button>
          </div>

          {/* Message informatif */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
            <p>
              📧 Un email de confirmation vous a été envoyé avec tous les détails de votre commande.
              {hasSubscription && ' Votre abonnement sera actif dès maintenant !'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
