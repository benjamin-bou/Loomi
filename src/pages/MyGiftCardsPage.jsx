import { useState, useEffect } from 'react';
import MyGiftCards from '../components/MyGiftCards';
import GiftCardActivation from '../components/GiftCardActivation';
import MainButton from '../components/addOns/MainButton';
import { useCart } from '../context/CartContext';
import { fetchData } from '../api';

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
  };

  return (
    <div className="bg-[#FFF7F0] pb-12">
      <div className="mx-[50px] px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="">Mes cartes cadeaux</h1>
        </div>

        <MyGiftCards />        {showActivation && (
          <GiftCardActivation
            onClose={() => setShowActivation(false)}
            onActivationSuccess={handleActivationSuccess}
            user={user}
            setShowLogin={setShowLogin}
          />
        )}
      </div>
      <section className="mx-[20vw]">
      <div className="bg-loomilightpink text-black rounded-4xl my -10 p-4 w-full z-20 gap-10">
        <div className="flex flex-col p-10 gap-5">
          <h3 className="my-4 text-white uppercase text-center">On vous a offert une carte cadeau ? Activez-la ici !</h3>
          <div className="flex flex-col mb-2 gap-6 justify-center items-center">                
            <MainButton
              text="Activer ma carte"
              className="bg-loomipink border-0 text-white max-w-[300px]"
              onClick={() => setShowActivation(true)}
            />
          </div>
        </div>
      </div>   
      </section>
    </div>
  );
}
