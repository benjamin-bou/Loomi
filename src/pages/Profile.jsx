import { fetchData } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

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
    navigate("/");
  };

  return (
    <>
    <div className="bg-[#FFF7F0] relative overflow-x-hidden">
        {/* Forme rose SVG à droite */}
        <div
          className="absolute -right-10 top-[30%] z-0 pointer-events-none bg-loomipink w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
          style={{
            borderRadius: "52% 48% 41% 59% / 50% 35% 65% 50%"
          }}
        >
        </div>
      {/* Contenu principal */}
      <div className="relative z-10 px-14 pt-14 ">
        <h2 className="text-5xl font-bold mb-2">Bienvenue, {userName}</h2>
        <p className="text-xl mb-10">
          Vous êtes connecté(e) avec l’adresse e-mail : <span className="font-medium">{email}</span>
        </p>

        {/* Grille de cartes */}
        <div className="flex flex-wrap gap-8 mb-20 justify-center lg:justify-start lg:max-w-4/5">
          <ProfileCard title="Mes commandes" onClick={() => navigate("/profile/orders")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Mon abonnement" onClick={() => navigate("/profile/subscription")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Mes favoris" onClick={() => navigate("/profile/favorites")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Mes informations" onClick={() => navigate("/profile/informations")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
          <ProfileCard title="Newsletter">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </ProfileCard>
        </div>
      <p className="!text-2xl underline cursor-pointer mb-20" onClick={handleLogout}>Déconnexion</p>
      </div>
    </div>
    </>
  );
}
