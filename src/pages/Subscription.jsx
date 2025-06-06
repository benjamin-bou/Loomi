import { fetchData, postData } from "../api";
import MainButton from "../components/addOns/MainButton";
import { useEffect, useState } from "react";
import l_shape from "/images/picto/l_shape.svg";
import SubscriptionSkeleton from "../components/SubscriptionSkeleton";

export default function Orders() {
  const statusLabel = {
    active: "Actif",
    paused: "En pause",
    cancelled: "Annulé",
    expired: "Expiré",
    pending: "En cours",
    delivered: "Livré",
  };  const [subscription, setSubscription] = useState({});
  const [user, setUser] = useState({});
  const [giftCardExtensions, setGiftCardExtensions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchData("/my-subscription");
        setSubscription(data?.subscription || {});
        setUser(data?.user || {});
        setGiftCardExtensions(data?.gift_card_extensions || null);
      } catch (error) {
        console.error("Erreur lors du chargement de l'abonnement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleUnsubscribe = async () => {
    if (confirm("Êtes-vous sûr de vouloir annuler votre abonnement ? Cette action est irréversible.")) {
      setIsLoading(true);
      try {
        const response = await postData("/cancel-subscription", {});
        if (response.message) {
          // Mettre à jour l'état local
          window.location.reload(); // Recharger la page pour mettre à jour l'affichage
          setSubscription(response.subscription);
        }
      } catch (error) {
        console.error("Erreur lors de l'annulation:", error);
        const errorMessage = error.response?.data?.error || "Une erreur est survenue lors de l'annulation de l'abonnement.";
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }  };  

  if (loading) {
    return <SubscriptionSkeleton />;
  }

  return (
    <div className="bg-loomibeige relative px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 font-montserrat overflow-hidden pb-20">
      {/* SVG l_shape en haut à droite */}
      <img 
        src={l_shape} 
        alt="Forme décorative" 
        className="absolute -right-5 sm:-right-8 md:-right-10 top-[2vw] z-0 pointer-events-none w-[25vw] sm:w-[30vw] h-[25vw] sm:h-[30vw] max-w-[300px] sm:max-w-[400px] md:max-w-[450px] max-h-[300px] sm:max-h-[400px] md:max-h-[450px]"
        style={{ transform: "rotate(-35deg)" }}
      />

      {/* Titre */}
      <h1 className="relative z-10 mb-4 sm:mb-6 md:mb-8 mx-4 sm:mx-8 md:mx-[50px] !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl font-bold">Mon abonnement</h1>

      {subscription && subscription.id ? (
        // Carte d'abonnement
        <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-[50px] bg-white rounded-[2rem] px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 shadow-sm min-h-[320px] sm:min-h-[380px] md:min-h-[420px] relative">
          {/* Image produit */}
          <div className="bg-[#e5e5e5] rounded-4xl w-full max-w-[300px] h-[200px] sm:h-[250px] md:h-[300px] lg:w-[300px] lg:h-[300px] min-w-[120px] flex-shrink-0 mx-auto lg:mx-0" />

          {/* Infos commande */}
          <div className="flex flex-col w-full gap-4 justify-between">
            <div>
              <p className="!text-xl sm:!text-2xl md:!text-2xl font-medium mb-2">
                {subscription.type?.label || "Abonnement"}
              </p>
              <p className="!text-xs sm:!text-sm md:!text-sm mb-1">
                Date de début :{" "}
                {subscription.start_date
                  ? new Date(subscription.start_date).toLocaleDateString("fr-FR")
                  : ""}
              </p>
              <p className="!text-xs sm:!text-sm md:!text-sm mb-1">
                Date de fin :{" "}
                {subscription.end_date
                  ? new Date(subscription.end_date).toLocaleDateString("fr-FR")
                  : ""}
              </p>
              <p className="!text-xs sm:!text-sm md:!text-sm mb-1">
                Prix : {subscription.type?.price ? `${subscription.type.price} €/${subscription.type.recurrence === 'monthly' ? 'mois' : 'trimestre'}` : ""}
              </p>
              <p className="!text-xs sm:!text-sm md:!text-sm mb-4">
                Statut : {statusLabel[subscription.status] || subscription.status || "en cours"}
              </p>
              
              {/* Affichage des mois offerts par cartes cadeaux */}
              {giftCardExtensions && giftCardExtensions.total_months_offered > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-green-600 mr-2">🎁</span>
                    <span className="font-semibold text-green-800 !text-sm sm:!text-base">
                      {giftCardExtensions.total_months_offered} mois offert{giftCardExtensions.total_months_offered > 1 ? 's' : ''} !
                    </span>
                  </div>
                  <p className="!text-xs sm:!text-sm text-green-700">
                    Grâce à vos cartes cadeaux, vous bénéficiez de {giftCardExtensions.total_months_offered} mois 
                    d'abonnement supplémentaire{giftCardExtensions.total_months_offered > 1 ? 's' : ''}.
                  </p>
                  {giftCardExtensions.details && giftCardExtensions.details.length > 0 && (
                    <details className="mt-2">
                      <summary className="!text-xs sm:!text-sm text-green-600 cursor-pointer hover:text-green-800">
                        Voir le détail des cartes utilisées
                      </summary>
                      <div className="mt-2 space-y-1">
                        {giftCardExtensions.details.map((detail, index) => (
                          <div key={index} className="!text-xs text-green-600 bg-green-100 rounded px-2 py-1">
                            {detail.type_name} ({detail.months} mois) - Code: {detail.code}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-2">
              {/* Informations d'abonnement */}
              <div className="min-w-[180px]">
                <div className="font-semibold mb-1 !text-sm sm:!text-base">Détails de l'abonnement</div>
                <div className="!text-xs sm:!text-sm">
                  <div className="mb-1">
                    Renouvellement automatique : {subscription.auto_renew ? "Activé" : "Désactivé"}
                  </div>
                  <div className="mb-1">
                    Récurrence : {subscription.type?.recurrence === 'monthly' ? 'Mensuel' : 'Trimestriel'}
                  </div>
                  {subscription.end_date && (
                    <div className="mb-1">
                      Prochaine facturation : {new Date(subscription.end_date).toLocaleDateString("fr-FR")}
                    </div>
                  )}
                </div>
              </div>

              {/* Paiement */}
              <div className="min-w-[180px]">
                <div className="font-semibold mb-1 !text-sm sm:!text-base">Paiement</div>
                <div className="!text-xs sm:!text-sm">
                  {subscription.payment ? (
                    <div>
                      {subscription.payment_method_type && subscription.payment_method_type.name
                        ? `Paiement ${subscription.payment.payment_method_type.name}`
                        : "Moyen de paiement inconnu"}
                    </div>
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
                  <br />
                  {user.phone || "Téléphone"}
                </div>
              </div>
            </div>

            {/* BOUTON aligné à droite */}
            <div className="flex flex-1 items-end justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-8">
              {subscription.status === 'active' && (
                <MainButton 
                text={isLoading ? "Annulation..." : "Se désabonner"}
                onClick={handleUnsubscribe}
                disabled={isLoading}
                >
                </MainButton>
              )}
              {subscription.status === 'cancelled' && (
                <p className="!text-xs sm:!text-sm text-red-600">Abonnement annulé</p>
              )}
              {subscription.status === 'expired' && (
                <MainButton 
                text={"Renouveler"}
                onClick={() => window.location.href = '/subscriptions'}
                >
                </MainButton>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-[50px] bg-white rounded-[2rem] px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-col items-center justify-center shadow-sm min-h-[180px] sm:min-h-[220px] relative text-center">
          <p className="!text-lg sm:!text-xl md:!text-xl font-medium mb-4">Pas encore abonné ?</p>
          <p className="!text-sm sm:!text-base md:!text-base mb-6">Parcourez nos différents abonnements et trouvez celui qui vous correspond !</p>
          <MainButton text="Voir les abonnements" onClick={() => window.location.href = '/subscriptions'} />
        </div>
      )}
    </div>
  );
}
