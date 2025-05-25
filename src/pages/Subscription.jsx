import { fetchData } from "../api";
import MainButton from "../components/addOns/MainButton";
import { useEffect, useState } from "react";

export default function Orders() {
  const statusLabel = {
    pending: "En cours",
    delivered: "Annulé",
  };

  const [subscription, setSubscription] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetchData("/my-subscription");
      setSubscription(data.subscription);
      setUser(data.user);
    };
    fetchOrders();
  }, []);

  const handleUnsubscribe = () => {
    // Ajoute ici la logique de désabonnement
    alert("Désabonnement !");
  };

  return (
      <div className="bg-loomibeige relative px-8 py-8 font-montserrat overflow-hidden pb-20">
        {/* Forme blob en haut à droite */}
        <div
          className="absolute -right-10 top-[2vw] z-0 pointer-events-none bg-[#d63d87] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
          style={{
            borderRadius: "52% 48% 41% 59% / 50% 35% 65% 50%",
          }}
        />

        {/* Titre */}
        <h1 className="relative z-10 mb-8 mx-[50px]">Mon abonnement</h1>

        {/* Carte d'abonnement */}
        <div className="mx-[50px] bg-white rounded-[2rem] px-8 py-8 flex flex-col md:flex-row gap-8 shadow-sm w-3/4 min-h-[420px] relative">
          {/* Image produit */}
          <div className="bg-[#e5e5e5] rounded-4xl w-[300px] h-[300px] min-w-[120px] flex-shrink-0" />

          {/* Infos commande */}
          <div className="flex flex-col w-full gap-4 justify-between">
            <div>
              <p className="text-2xl font-medium mb-2">
                {subscription.name || "Abonnement Mystère"}
              </p>
              <p className="text-sm mb-1">
                Date de début :{" "}
                {subscription.created_at
                  ? new Date(subscription.created_at).toLocaleDateString("fr-FR")
                  : ""}
              </p>
              <p className="text-sm mb-4">
                Statut : {statusLabel[subscription.status] || subscription.status || "en cours"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-2">
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
                </div>
              </div>
            </div>

            {/* BOUTON aligné à droite */}
            <div className="flex flex-1 items-end justify-end mt-8">
              <MainButton 
              text={"Se désabonner"}
              onClick={handleUnsubscribe}
              >
              </MainButton>
            </div>
          </div>
        </div>
      </div>
  );
}
