import { fetchData } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import o_shape from "/images/picto/o_shape.svg";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await fetchData("/profile");
      setUserName(data.first_name);
      setEmail(data.email);
    };
    fetchProfile();
  }, []);

  // Déconnexion : supprime le token et redirige
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Recharge la page pour mettre à jour l'état de l'application
    navigate("/");
  };
  return (
    <>
    <div className="bg-[#FFF7F0] relative overflow-x-hidden min-h-screen">
        {/* SVG o_shape à droite */}        <img 
          src={o_shape} 
          alt="Forme décorative" 
          className="absolute -right-6 xs:!-right-8 sm:!-right-10 md:!-right-12 top-[20%] xs:!top-[25%] sm:!top-[30%] z-0 pointer-events-none w-[25vw] h-[25vw] xs:!w-[28vw] xs:!h-[28vw] sm:!w-[30vw] sm:!h-[30vw] max-w-[300px] max-h-[300px] xs:!max-w-[350px] xs:!max-h-[350px] sm:!max-w-[400px] sm:!max-h-[400px] md:!max-w-[450px] md:!max-h-[450px] opacity-80"
          style={{ transform: "rotate(-90deg)" }}
        />
      {/* Contenu principal */}
      <div className="relative z-10 px-4 xs:!px-6 sm:!px-8 md:!px-12 lg:!px-14 pt-8 xs:!pt-10 sm:!pt-12 md:!pt-14 pb-8 xs:!pb-12 sm:!pb-16">
        <h2 className="text-xl xs:!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl font-bold mb-2 xs:!mb-3 sm:!mb-4 text-center sm:!text-left">
          Bienvenue, {userName}
        </h2>
        <p className="!text-md mb-10">
          Vous êtes connecté(e) avec l’adresse e-mail : <span className="font-medium">{email}</span>
        </p>

        {/* Grille de cartes */}
        <div className="flex flex-wrap gap-8 mb-20 justify-center lg:justify-start lg:max-w-4/5">
          <ProfileCard title="Mes commandes" onClick={() => navigate("/profile/orders")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Mon abonnement" onClick={() => navigate("/profile/subscription")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>          <ProfileCard title="Mes livraisons" onClick={() => navigate("/profile/deliveries")}>
            Consultez l'historique de toutes vos livraisons : boîtes achetées individuellement et boîtes reçues via vos abonnements.
          </ProfileCard>
          <ProfileCard title="Mes favoris" onClick={() => navigate("/profile/favorites")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Mes cartes cadeaux" onClick={() => navigate("/profile/gift-cards")}>
            Consultez et gérez vos cartes cadeaux activées. Utilisez-les pour vos prochaines commandes.
          </ProfileCard>
          <ProfileCard title="Mes informations" onClick={() => navigate("/profile/informations")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Newsletter">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
        </div>
      <p className="!text-md md:!text-xl underline cursor-pointer mb-20 hover:text-loomipink transition-colors" onClick={handleLogout}>Déconnexion</p>
      </div>
    </div>
    </>
  );
}
