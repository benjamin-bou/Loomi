import { fetchData } from "../api";
import MainButton from "../components/addOns/MainButton";
import { useEffect, useState } from "react";

export default function Orders() {
  const statusLabel = {
    active: "Actif",
    paused: "En pause",
    cancelled: "Annulé",
    expired: "Expiré",
    pending: "En cours",
    delivered: "Livré",
  };

  const [subscription, setSubscription] = useState({});
  const [user, setUser] = useState({});  useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetchData("/my-subscription");
      console.log("Subscription data:", data);
      setSubscription(data?.subscription || {});
      setUser(data?.user || {});
    };
    fetchOrders();
  }, []);

  const handleUnsubscribe = () => {
    if (confirm("Êtes-vous sûr de vouloir annuler votre abonnement ? Cette action est irréversible.")) {
      // TODO: Implémenter la logique de désabonnement via API
      alert("Fonctionnalité de désabonnement à implémenter !");
    }
  };

  return (
    <div className="bg-loomibeige relative px-8 py-8 font-montserrat overflow-hidden pb-20">
      {/* Forme blob en haut à droite */}
      <div
        className="absolute -right-10 top-[2vw] z-0 pointer-events-none bg-[#d63d87] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
        style={{
          borderRadius: "52% 48% 41% 59% / 50% 35% 65% 50%",
        }}
      />      {/* Titre */}
      <h1 className="relative z-10 mb-8 mx-[50px]">Mon abonnement</h1>

      {subscription && subscription.id ? (
        // Carte d'abonnement
        <div className="mx-[50px] bg-white rounded-[2rem] px-8 py-8 flex flex-col md:flex-row gap-8 shadow-sm min-h-[420px] relative">          {/* Image produit */}
          <div className="bg-[#e5e5e5] rounded-4xl w-[300px] h-[300px] min-w-[120px] flex-shrink-0" />

          {/* Infos commande */}
          <div className="flex flex-col w-full gap-4 justify-between">
            <div>
              <p className="text-2xl font-medium mb-2">
                {subscription.type?.label || "Abonnement"}
              </p>
              <p className="text-sm mb-1">
                Date de début :{" "}
                {subscription.start_date
                  ? new Date(subscription.start_date).toLocaleDateString("fr-FR")
                  : ""}
              </p>
              <p className="text-sm mb-1">
                Date de fin :{" "}
                {subscription.end_date
                  ? new Date(subscription.end_date).toLocaleDateString("fr-FR")
                  : ""}
              </p>              <p className="text-sm mb-1">
                Prix : {subscription.type?.price ? `${subscription.type.price} €/${subscription.type.recurrence === 'monthly' ? 'mois' : 'trimestre'}` : ""}
              </p>
              <p className="text-sm mb-4">
                Statut : {statusLabel[subscription.status] || subscription.status || "en cours"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-2">
              {/* Informations d'abonnement */}
              <div className="min-w-[180px]">
                <div className="font-semibold mb-1">Détails de l'abonnement</div>
                <div className="text-sm">
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
                <div className="font-semibold mb-1">Paiement</div>
                <div className="text-sm">
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
                </div>              </div>
            </div>

            {/* BOUTON aligné à droite */}
            <div className="flex flex-1 items-end justify-end mt-8">
              {subscription.status === 'active' && (
                <MainButton 
                text={"Se désabonner"}
                onClick={handleUnsubscribe}
                >
                </MainButton>
              )}
              {subscription.status === 'cancelled' && (
                <p className="text-sm text-red-600">Abonnement annulé</p>
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
        <div className="mx-[50px] bg-white rounded-[2rem] px-8 py-8 flex flex-col items-center justify-center shadow-sm min-h-[220px] relative text-center">
          <p className="text-xl font-medium mb-4">Pas encore abonné ?</p>
          <p className="text-base mb-6">Parcourez nos différents abonnements et trouvez celui qui vous correspond !</p>
          <MainButton text="Voir les abonnements" onClick={() => window.location.href = '/subscriptions'} />
        </div>
      )}
    </div>
  );
}
