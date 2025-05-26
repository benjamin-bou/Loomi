import { fetchData } from "../api";
import { postData } from "../api";
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import MainButton from "../components/addOns/MainButton";
import OrderStep1 from "./OrderStep1";

function OrderPage({ setShowLogin }) {
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(undefined);
  const [step, setStep] = useState(1);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const paymentMethods = [
    { key: 'visa', label: 'Visa' },
    { key: 'cb', label: 'Carte bancaire' },
    { key: 'applepay', label: 'Apple Pay' },
    { key: 'paypal', label: 'PayPal' },
  ];

  useEffect(() => {
    // Simule un résumé de commande à partir du panier (box, abonnement, carte cadeau)
    setOrderSummary(cart);
  }, [cart]);

  useEffect(() => {
    fetchData('/profile')
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handlePayment = () => {
    if ((!user || !user.id) && setShowLogin) {
      setShowLogin(true);
      return;
    }
    try {
      if (!orderSummary || orderSummary.length === 0) return;
      postData('/order', {
          items: cart,
          payment_method: selectedPayment,
      });
      clearCart();
      navigate('/profile/orders'); // Redirige vers la liste des commandes
    } catch {
      setError("Erreur lors du paiement. Veuillez réessayer.");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  // Étape 1 : Connexion & Livraison
  if (step === 1) {
    return <OrderStep1 user={user} setUser={setUser} onNext={() => setStep(2)} />;
  }

  // Étape 2 : Paiement (état existant)
  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="w-[calc(100vw-100px)] mx-[50px] py-[50px] flex flex-col md:flex-row gap-12">
        {/* Résumé de commande */}
        <div className="flex-1 bg-white rounded-[2rem] px-8 py-8 shadow-sm min-h-[420px] relative">
          <h2 className="text-2xl mb-6">Résumé de votre commande</h2>
          {orderSummary && orderSummary.length > 0 ? (
            <>
              <ul className="mb-6">
                {orderSummary.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-2">
                    <span className="font-semibold">{item.type === 'box' ? 'Box' : item.type === 'giftcard' ? 'Carte cadeau' : 'Abonnement'} :</span> {item.name} <span className="text-gray-500">x{item.quantity} ({Number((item.price || item.base_price) * item.quantity).toFixed(2)} €)</span>
                  </li>
                ))}
              </ul>
              <div className="absolute right-8 bottom-8 text-xl font-bold">
                Total : {orderSummary.reduce((sum, item) => sum + (item.price || item.base_price) * item.quantity, 0).toFixed(2)} €
              </div>
            </>
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </div>

        {/* Paiement */}
        <div className="w-full md:w-[400px] bg-white rounded-[2rem] px-8 py-8 shadow-sm flex flex-col gap-6 h-fit">
          <h2 className="text-2xl mb-6">Paiement</h2>
          <div className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
              <label key={method.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method.key}
                  checked={selectedPayment === method.key}
                  onChange={() => setSelectedPayment(method.key)}
                  className="accent-[#DB3D88]"
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
          <MainButton text="Payer" onClick={handlePayment} disabled={!orderSummary || orderSummary.length === 0} />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default OrderPage;
