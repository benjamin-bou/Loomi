import { getImageUrl } from '../utils/imageUtils';

const statusLabel = {
  received: "Reçue",
  paid: "Payée",
  pending: "En attente",
  delivered: "Livrée",
  canceled: "Annulée",
};

const statusColors = {
  received: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
  canceled: "bg-red-100 text-red-800",
};

export default function OrderCard({ order, user }) {
  // Paiements (tous les moyens de paiement)
  const payments = order.payment_methods || [];

  // Vérifier si la commande contient des boîtes (pour afficher la date de livraison)
  const hasBoxes = order.box_orders && order.box_orders.length > 0;

  // Récupérer l'image du premier produit
  const getOrderImage = () => {
    if (order.box_orders && order.box_orders.length > 0) {
      const firstBox = order.box_orders[0];
      if (firstBox.box?.images && firstBox.box.images.length > 0) {
        return getImageUrl(firstBox.box.images[0].link);
      }
    }
    if (order.subscription) {
      return "/images/boxes/box_couture_003.png";
    }
    if (order.created_gift_cards && order.created_gift_cards.length > 0) {
      return "/images/gift_cards_image_1.png";
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      {/* Header avec numéro et statut */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div>
          <h2 className="!text-sm sm:!text-lg md:!text-2xl text-gray-900">
            Commande #{order.order_number}
          </h2>
          <p className="text-sm text-gray-600">
            {order.created_at
              ? new Date(order.created_at).toLocaleDateString("fr-FR")
              : "Date inconnue"}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
            {statusLabel[order.status] || order.status}
          </span>
          <div className="text-lg font-bold text-loomipink">
            {parseFloat(order.total_amount).toFixed(2)} €
          </div>
        </div>
      </div>

      {/* Content principal */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image et articles */}
        <div className="flex gap-4 flex-1">
          {/* Image produit */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            {getOrderImage() ? (
              <img 
                src={getOrderImage()} 
                alt="Produit"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://dummyimage.com/80x80/e5e5e5/999999&text=IMG";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">📦</span>
              </div>
            )}
          </div>

          {/* Articles commandés */}
          <div className="flex-1">
            <h3 className="!text-sm sm:!text-lg md:!text-2xl text-gray-900 mb-2">Articles</h3>
            <div className="space-y-1 text-sm text-gray-600">
              {/* Boxes */}
              {order.box_orders && order.box_orders.length > 0 && order.box_orders.map((boxOrder, idx) => (
                <div key={boxOrder.id || idx}>
                  📦 {boxOrder.box?.name || 'Box inconnue'}
                  {boxOrder.quantity && boxOrder.quantity > 1 && ` ×${boxOrder.quantity}`}
                </div>
              ))}
              
              {/* Abonnement */}
              {order.subscription && (
                <div>
                  🔄 {order.subscription?.subscription_type.label || 'Abonnement'}
                </div>
              )}
              
              {/* Carte cadeau utilisée */}
              {order.giftCard && (
                <div>
                  🎫 Carte cadeau utilisée ({order.giftCard.code})
                </div>
              )}
              
              {/* Cartes cadeaux créées */}
              {order.created_gift_cards && order.created_gift_cards.length > 0 && order.created_gift_cards.map((createdGiftCard, idx) => (
                <div key={createdGiftCard.id || idx}>
                  🎁 {createdGiftCard.gift_card_type?.name || 'Carte cadeau'} créée
                </div>
              ))}
            </div>

            {/* Date de livraison */}
            {hasBoxes && order.delivery_date && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg text-sm">
                <span className="text-blue-700">
                  🚚 Livraison prévue dès le {new Date(order.delivery_date).toLocaleDateString("fr-FR")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informations complémentaires - cachées sur mobile, visibles sur desktop */}
        <div className="hidden md:block md:w-80 space-y-4">
          {/* Paiement */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">💳 Paiement</h4>
            <div className="text-xs text-gray-600">
              {payments.length > 0 ? (
                payments.map((pm, idx) => (
                  <div key={pm.id || idx}>
                    {pm.payment_method_type?.name || "Inconnu"}
                    {pm.amount && ` (${parseFloat(pm.amount).toFixed(2)} €)`}
                  </div>
                ))
              ) : (
                "Non spécifié"
              )}
            </div>
          </div>

          {/* Livraison - seulement pour les commandes de boîtes */}
          {hasBoxes && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">📍 Livraison</h4>
              <div className="text-xs text-gray-600">
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.address}</div>
                <div>{user.zipcode} {user.city}</div>
                <div>France</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
