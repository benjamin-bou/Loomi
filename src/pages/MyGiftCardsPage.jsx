import { useState } from 'react';
import MyGiftCards from '../components/MyGiftCards';
import GiftCardActivation from '../components/GiftCardActivation';
import MainButton from '../components/addOns/MainButton';
import { useCart } from '../context/CartContext';

export default function MyGiftCardsPage() {
  const [showActivation, setShowActivation] = useState(false);
  const { addActivatedGiftCard } = useCart();

  const handleActivationSuccess = (giftCard) => {
    addActivatedGiftCard(giftCard);
  };

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Mes cartes cadeaux</h1>
          <MainButton
            text="Activer une carte"
            onClick={() => setShowActivation(true)}
            className="bg-[#DB3D88] text-white"
          />
        </div>

        <MyGiftCards />

        {showActivation && (
          <GiftCardActivation
            onClose={() => setShowActivation(false)}
            onActivationSuccess={handleActivationSuccess}
          />
        )}
      </div>
    </div>
  );
}
