import { fetchData } from "../api";
import { postData } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import Newsletter from "../components/Newsletter";
import MainButton from "../components/addOns/MainButton";
import OrderStep1 from "./OrderStep1";

function OrderPage({ setShowLogin }) {
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(undefined);  const [step, setStep] = useState(1);  const [giftCardValidationError, setGiftCardValidationError] = useState('');
  const { cart, clearCart, validateGiftCardInCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const paymentMethods = [
    { key: 'visa', label: 'Visa' },
    { key: 'cb', label: 'Carte bancaire' },
    { key: 'applepay', label: 'Apple Pay' },
    { key: 'paypal', label: 'PayPal' },
  ];  useEffect(() => {
    // Simule un résumé de commande à partir du panier (box, abonnement, carte cadeau)
    setOrderSummary(cart);
    
    // Valider les cartes cadeaux dans le panier
    const validateGiftCards = async () => {
      const giftCardItem = cart.find(item => item.type === 'giftcard_usage');
      if (giftCardItem) {
        const isValid = await validateGiftCardInCart();
        if (!isValid) {
          setGiftCardValidationError('La carte cadeau dans votre panier n\'est plus valide et a été supprimée.');
          setTimeout(() => setGiftCardValidationError(''), 5000);
        }
      }
    };
    
    validateGiftCards();
  }, [cart, validateGiftCardInCart]);

  useEffect(() => {
    fetchData('/profile')
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);
  console.log('Panier détaillé:', cart);  
  console.log('Résumé de la commande:', orderSummary);
  console.log('Cartes cadeaux dans le panier:', cart.filter(item => item.type === 'giftcard_usage'));
  console.log('Boxes dans le panier:', cart.filter(item => item.type === 'box'));
  console.log('Boxes payées avec carte cadeau:', cart.filter(item => item.type === 'box' && item.paidWithGiftCard));// Vérifier s'il y a une carte cadeau dans le panier
  const giftCardInCart = cart.find(item => item.type === 'giftcard_usage');
  const isGiftCardPayment = !!giftCardInCart;
  
  // Vérifier s'il y a des boxes payées avec carte cadeau
  const hasBoxPaidWithGiftCard = cart.some(item => item.type === 'box' && item.paidWithGiftCard);const handlePayment = async () => {
    if ((!user || !user.id) && setShowLogin) {
      setShowLogin(true);
      return;
    }
    try {
      if (!orderSummary || orderSummary.length === 0) return;
      
      // Récupérer la carte cadeau utilisée s'il y en a une
      const giftCardItem = cart.find(item => item.type === 'giftcard_usage');
      const hasNonFreeItems = cart.some(item => 
        item.type !== 'giftcard_usage' && 
        !(item.type === 'box' && item.paidWithGiftCard) &&
        (item.price || item.base_price) > 0
      );
      
      const paymentData = {
        items: cart,
        payment_method: hasNonFreeItems ? selectedPayment : null,
        gift_card_id: giftCardItem?.originalGiftCard?.id || null,
      };

      console.log('Données envoyées au backend:', paymentData);

      const response = await postData('/order', paymentData);
      
      if (response.success) {        // Préparer les données pour la page de félicitations
        const orderData = {
          id: response.order_id,
          items: cart,          total: orderSummary
            .filter(item => item.type !== 'giftcard_usage')
            .filter(item => !(item.type === 'box' && item.paidWithGiftCard)) // Exclure les boxes payées avec carte cadeau
            .filter(item => !(item.type === 'subscription' && item.paidWithGiftCard)) // Exclure les abonnements payés avec carte cadeau
            .reduce((sum, item) => {
              const price = item.price || item.base_price || 0;
              const quantity = item.quantity || 1;
              return sum + (price * quantity);
            }, 0)
            .toFixed(2),
          created_at: new Date().toISOString(),
          payment_method: isGiftCardPayment ? 'gift_card' : selectedPayment
        };
        
        // Sauvegarder les données dans localStorage
        localStorage.setItem('lastOrderData', JSON.stringify(orderData));
        
        clearCart();
        
        // Naviguer vers la page de succès
        navigate('/order-success');
      } else {
        setError("Erreur lors du paiement. Veuillez réessayer.");
        console.log('Erreur de paiement:', response.error);
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
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
      {giftCardValidationError && (
        <div className="w-full bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{giftCardValidationError}</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-[calc(100vw-100px)] mx-[50px] py-[50px] flex flex-col md:flex-row gap-12">
        {/* Résumé de commande */}
        <div className="flex-1 bg-white rounded-[2rem] px-8 py-8 shadow-sm min-h-[420px] relative">
          <h2 className="text-2xl mb-6">Résumé de votre commande</h2>
          {orderSummary && orderSummary.length > 0 ? (
            <>              <ul className="mb-6">
                {orderSummary
                  .filter(item => {
                    // Masquer l'affichage de la carte cadeau si elle est utilisée pour payer une box
                    if (item.type === 'giftcard_usage' && hasBoxPaidWithGiftCard) {
                      return false;
                    }
                    return true;
                  })
                  .map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === 'box' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              📦 Box
                            </span>
                          )}
                          {item.type === 'giftcard' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              🎁 Carte cadeau
                            </span>
                          )}
                          {item.type === 'giftcard_usage' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              🎫 Paiement par carte cadeau
                            </span>
                          )}
                          {item.type === 'subscription' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              🔄 Abonnement
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-lg">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </div>
                        )}                        {item.type === 'giftcard_usage' && (
                          <div className="text-sm text-green-600 mt-1">
                            Code: <span className="font-mono">{item.giftCardCode}</span>
                          </div>
                        )}                        {item.type === 'box' && item.paidWithGiftCard && (
                          <div className="text-sm text-green-600 mt-1 font-medium">
                            🎁 Box offerte avec votre carte cadeau
                            <div className="text-xs text-green-500 mt-1">
                              "{item.name}" - Prix original: {item.originalPrice}€
                            </div>
                          </div>
                        )}
                        {item.type === 'subscription' && item.paidWithGiftCard && (
                          <div className="text-sm text-green-600 mt-1 font-medium">
                            🎁 Abonnement offert avec votre carte cadeau
                            <div className="text-xs text-green-500 mt-1">
                              "{item.name}" - Prix original: {item.originalPrice || item.price}€
                            </div>
                          </div>
                        )}
                        {item.type === 'box' && !item.paidWithGiftCard && !isGiftCardPayment && (
                          <div className="text-sm text-gray-600 mt-1">
                            📦 Box achetée
                          </div>
                        )}
                      </div>                      <div className="text-right ml-4">                        <div className={`font-medium ${item.type === 'giftcard_usage' ? 'text-green-600' : (item.type === 'box' && item.paidWithGiftCard) ? 'text-green-600' : (item.type === 'subscription' && item.paidWithGiftCard) ? 'text-green-600' : 'text-gray-700'}`}>
                          {item.type === 'giftcard_usage' ? 'Gratuit' : 
                           (item.type === 'box' && item.paidWithGiftCard) ? 'Offert' :
                           (item.type === 'subscription' && item.paidWithGiftCard) ? 'Offert' :
                           `${((item.price || item.base_price || 0) * (item.quantity || 1)).toFixed(2)} €`}
                        </div>
                        <div className="text-sm text-gray-500">
                          Quantité: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>                <div className="absolute right-8 bottom-8 text-xl font-bold">                
                Total : {orderSummary
                  .filter(item => item.type !== 'giftcard_usage')
                  .filter(item => !(item.type === 'box' && item.paidWithGiftCard)) // Exclure les boxes payées avec carte cadeau
                  .filter(item => !(item.type === 'subscription' && item.paidWithGiftCard)) // Exclure les abonnements payés avec carte cadeau
                  .reduce((sum, item) => {
                    const price = item.price || item.base_price || 0;
                    const quantity = item.quantity || 1;
                    return sum + (price * quantity);
                  }, 0)
                  .toFixed(2)} €
              </div>
            </>
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </div>        <div className="w-full md:w-[400px] bg-white rounded-[2rem] px-8 py-8 shadow-sm flex flex-col gap-6 h-fit">
          <h2 className="text-2xl mb-6">Paiement</h2>
            {/* Affichage de la carte cadeau si présente */}
          {giftCardInCart && !hasBoxPaidWithGiftCard && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Carte cadeau utilisée</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-green-800">
                      {giftCardInCart.name}
                    </div>
                    <div className="text-sm text-green-600">
                      Code: <span className="font-mono">{giftCardInCart.giftCardCode}</span>
                    </div>
                  </div>
                  <div className="text-green-800 font-medium">
                    Gratuit
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Affichage spécial pour box offerte avec carte cadeau */}
          {hasBoxPaidWithGiftCard && giftCardInCart && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Box offerte</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-green-800">
                      🎁 Box offerte avec carte cadeau
                    </div>
                    <div className="text-sm text-green-600">
                      Code utilisé: <span className="font-mono">{giftCardInCart.giftCardCode}</span>
                    </div>
                  </div>
                  <div className="text-green-800 font-medium">
                    Gratuit
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Moyens de paiement - désactivés si carte cadeau */}
          <div className={`flex flex-col gap-4 ${isGiftCardPayment ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="text-lg font-medium">
              Choisir un moyen de paiement
            </h3>
            {paymentMethods.map((method) => (
              <label key={method.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method.key}
                  checked={selectedPayment === method.key}
                  onChange={() => setSelectedPayment(method.key)}
                  className="accent-[#DB3D88]"
                  disabled={isGiftCardPayment}
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
          
          <MainButton 
            text={isGiftCardPayment ? "Utiliser la carte cadeau" : "Payer"} 
            onClick={handlePayment} 
            disabled={!orderSummary || orderSummary.length === 0} 
          />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default OrderPage;
