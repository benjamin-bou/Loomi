import { useState, useEffect } from 'react';
import MyGiftCards from '../components/MyGiftCards';
import GiftCardActivation from '../components/GiftCardActivation';
import MainButton from '../components/addOns/MainButton';
import { useCart } from '../context/CartContext';
import { fetchData } from '../api';
import l_shape from "/images/picto/l_shape.svg";

export default function MyGiftCardsPage({ setShowLogin }) {
  const [showActivation, setShowActivation] = useState(false);
  const [user, setUser] = useState(null);
  const { addActivatedGiftCard } = useCart();

  useEffect(() => {
    // Récupérer les informations de l'utilisateur si connecté
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/profile')
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleActivationSuccess = (giftCard) => {
    addActivatedGiftCard(giftCard);
  };  return (
    <div className="bg-[#FFF7F0] pb-8 sm:!pb-12 relative overflow-hidden">
      {/* Élément décoratif SVG */}
      <img 
        src={l_shape}
        alt="Decoration" 
        className="absolute top-[10vh] left-[-50px] w-[80px] h-[80px] sm:!w-[100px] sm:!h-[100px] md:!w-[120px] md:!h-[120px] lg:!w-[140px] lg:!h-[140px] z-10 opacity-30"
      />

      <div className="px-4 sm:!px-6 md:!px-8 lg:!px-12 py-6 sm:!py-8 md:!py-12 relative z-20">
        <div className="flex flex-col sm:!flex-row sm:!justify-between sm:!items-center mb-6 sm:!mb-8 text-center sm:!text-left">
          <h1 className="!text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl">Mes cartes cadeaux</h1>
        </div>

        <MyGiftCards />

        {showActivation && (
          <GiftCardActivation
            onClose={() => setShowActivation(false)}
            onActivationSuccess={handleActivationSuccess}
            user={user}
            setShowLogin={setShowLogin}
          />
        )}
      </div>
      
      <section className="px-4 sm:!px-6 md:!px-8 lg:!px-[10vw] xl:!px-[15vw] relative z-10">
        <div className="bg-loomilightpink text-black rounded-2xl sm:!rounded-3xl md:!rounded-4xl p-3 sm:!p-4 md:!p-6 lg:!p-8 w-full relative overflow-hidden">
          <div className="flex flex-col p-3 sm:!p-4 md:!p-6 lg:!p-8 gap-3 sm:!gap-4 md:!gap-5 text-center relative z-10">
            <h3 className="!text-xs sm:!text-sm md:!text-base lg:!text-lg text-white uppercase font-medium leading-tight">
              On vous a offert une carte cadeau ? Activez-la ici !
            </h3>
            <div className="flex flex-col items-center justify-center">
              <MainButton
                text="Activer ma carte"
                className="bg-loomipink border-0 text-white w-full max-w-[240px] xs:!max-w-[260px] sm:!max-w-[280px] md:!max-w-[300px] text-xs sm:!text-sm md:!text-base py-2 sm:!py-3"
                onClick={() => setShowActivation(true)}
              />
            </div>
          </div>
        </div>   
      </section>
    </div>
  );
}
