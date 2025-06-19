const statusLabel = {
  received: "Reçue",
  paid: "Payée",
  pending: "En attente",
  delivered: "Livrée",
  canceled: "Annulée",
};

export default function OrderCard({ order, user }) {
  // Paiements (tous les moyens de paiement)
  const payments = order.payment_methods || [];

  // Vérifier si la commande contient des boîtes (pour afficher la date de livraison)
  const hasBoxes = order.box_orders && order.box_orders.length > 0;
  return (
    <div className="bg-white rounded-2xl sm:!rounded-[2rem] px-4 sm:!px-6 md:!px-8 py-4 sm:!py-6 md:!py-8 flex flex-col md:flex-row gap-4 sm:!gap-6 md:!gap-8 shadow-sm">
      {/* Image produit */}
      <div className="bg-[#e5e5e5] rounded-xl w-[100px] h-[100px] sm:!w-[120px] sm:!h-[120px] min-w-[100px] sm:!min-w-[120px] flex-shrink-0 mx-auto md:mx-0" />

      {/* Infos commande */}
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 sm:!mb-3">
          <h2 className="!text-lg sm:!text-xl text-center md:text-left">
            Commande n°<span className="font-bold">{order.order_number}</span>
          </h2>
        </div>
        <p className="!text-xs sm:!text-sm mb-1 text-center md:text-left">
          Date&nbsp;:{" "}
          {order.created_at
            ? new Date(order.created_at).toLocaleDateString("fr-FR")
            : ""}        </p>        <p className="!text-xs sm:!text-sm mb-2 sm:!mb-4 text-center md:text-left">
          Statut&nbsp;: {statusLabel[order.status] || order.status}
          <br />
          {hasBoxes && order.delivery_date && (
            <>
              Livraison à partir du :{" "}
              {new Date(order.delivery_date).toLocaleDateString("fr-FR")}
            </>
          )}
        </p>        {/* Bloc Livraison + Paiement */}
        <div className="flex flex-col md:flex-row gap-4 sm:!gap-6 md:!gap-8 mt-2">          {/* Livraison - seulement pour les commandes de boîtes */}
          {hasBoxes && (
            <div className="flex-1 min-w-0 md:min-w-[180px]">
              <div className="font-semibold mb-1 !text-sm sm:!text-base text-center md:text-left">Livraison en relais</div>
              <div className="!text-xs sm:!text-sm text-center md:text-left">
                {user.first_name || "Prénom"} {user.last_name || "Nom"}
                <br />
                {user.address || "Adresse"}
                <br />
                {user.zipcode || "Code Postal"} {user.city || ""}
                <br />
                France
                <br />
                {user.phone || "Téléphone"}
              </div>
            </div>          )}
          {/* Paiement */}
          <div className="flex-1 min-w-0 md:min-w-[180px]">
            <div className="font-semibold mb-1 !text-sm sm:!text-base text-center md:text-left">Paiement</div>
            <div className="!text-xs sm:!text-sm text-center md:text-left">
              {payments.length > 0 ? (
                payments.map((pm, idx) => (
                  <div key={pm.id || idx}>
                    {pm.payment_method_type && pm.payment_method_type.name
                      ? `Paiement ${pm.payment_method_type.name}`
                      : "Moyen de paiement inconnu"}
                    {pm.amount ? ` — ${parseFloat(pm.amount).toFixed(2)} €` : null}
                  </div>
                ))
              ) : (
                "Aucun moyen de paiement"
              )}
              <br />
              Facturée à {user.first_name || "Prénom"} {user.last_name || "Nom"}
              <br />
              {user.address || "Adresse"}
              <br />
              {user.zipcode || "Code Postal"} {user.city || ""}
              <br />
              France
            </div>
          </div>
        </div>        {/* Liste des articles achetés */}
        <div className="mt-3 sm:!mt-4 mb-2">
          <div className="font-semibold mb-1 !text-sm sm:!text-base text-center md:text-left">Contenu de la commande</div>
          <ul className="!text-xs sm:!text-sm list-disc list-inside text-center md:text-left">
            {/* Boxes */}
            {order.box_orders && order.box_orders.length > 0 && order.box_orders.map((boxOrder, idx) => (
              <li key={boxOrder.id || idx}>
                Box : {boxOrder.box?.name || 'Box inconnue'}
                {boxOrder.quantity ? ` × ${boxOrder.quantity}` : ''}
              </li>
            ))}
            {/* Abonnement */}
            {order.subscription && (
              <li>
                Abonnement : {order.subscription?.subscription_type.label || 'Abonnement'}
              </li>
            )}            {/* Carte cadeau utilisée pour le paiement */}
            {order.giftCard && (
              <li>
                Carte cadeau utilisée : {order.giftCard.code || 'Carte cadeau'}
              </li>
            )}
            {/* Cartes cadeaux créées par cette commande */}
            {order.created_gift_cards && order.created_gift_cards.length > 0 && order.created_gift_cards.map((createdGiftCard, idx) => (
              <li key={createdGiftCard.id || idx}>
                Carte cadeau créée : {createdGiftCard.gift_card_type?.name || 'Type inconnu'} - Code: {createdGiftCard.code}
              </li>
            ))}
          </ul>
        </div>        {/* Montant total aligné à droite sur desktop */}
        <div className="mt-3 sm:!mt-4 text-center md:text-right font-bold !text-base sm:!text-lg text-loomipink">
          Total : {parseFloat(order.total_amount).toFixed(2)} €
        </div>
      </div>
    </div>
  );
}
