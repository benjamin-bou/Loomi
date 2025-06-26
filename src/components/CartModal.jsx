import close from '/images/picto/close.svg';
// import trashIcon from '/images/picto/trash.svg';
import trashIcon from '/images/picto/search.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUtils';

function CartModal({ show, setShow }) {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || item.base_price) * item.quantity,
    0
  );

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#5f5f5f7d] z-40 transition-opacity duration-300 cursor-pointer ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShow(false)}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col px-6 pt-6 pb-8"
        style={{
          background: 'white',
          boxShadow: show ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
          width: show ? 400 : 0,
          opacity: show ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          pointerEvents: show ? 'auto' : 'none',
        }}
      >
        {/* Top bar */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Panier</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setShow(false)} className="p-2 cursor-pointer">
              <img src={close} alt="fermer" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenu du panier */}
        <div className="flex-1 overflow-y-auto mb-6">
          {cart.length === 0 ? (
            <div className="text-center mt-20 px-4">
              <h3 className="text-xl font-semibold mb-2">Panier vide</h3>
              <p className="text-sm text-gray-600 mb-6">
                Ton panier est encore vide, découvre tout ce que nous avons pour toi
              </p>
              <button
                onClick={() => {
                  navigate('/boxes');
                  setShow(false);
                }}
                className="bg-loomilightpink hover:bg-loomipink cursor-pointer transition duration-300 text-white px-6 py-3 rounded font-bold"
              >
                DÉCOUVRIR
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item, idx) => (
                <li key={idx} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Image de l'item */}
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100">
                      {item.type === 'box' && item.images && item.images.length > 0 ? (
                        <img 
                          src={getImageUrl(item.images[0].link)} 
                          alt={item.images[0].alt || item.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = "https://dummyimage.com/80x64/2EC4B6/ffffff&text=Box";
                          }}
                        />
                      ) : item.type === 'subscription' ? (
                        <img 
                          src="/images/boxes/box_couture_003.png" 
                          alt="Abonnement"
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = "https://dummyimage.com/80x64/FF9500/ffffff&text=Abo";
                          }}
                        />
                      ) : item.type === 'giftcard' ? (
                        <img 
                          src="/images/gift_cards_image_1.png" 
                          alt="Carte cadeau"
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = "https://dummyimage.com/80x64/9333EA/ffffff&text=Gift";
                          }}
                        />
                      ) : (
                        <img 
                          src="https://dummyimage.com/80x64/2EC4B6/ffffff&text=Item" 
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {item.type === 'giftcard' ? `Carte cadeau - ${item.name}` : 
                         item.type === 'subscription' ? (item.label || item.name) : 
                         item.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                          onClick={() => removeFromCart(item.id, false, item.type)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-bold">
                      {((item.price || item.base_price) * item.quantity).toFixed(2)}&nbsp;€
                    </div>
                    <button
                      className=""
                      onClick={() => removeFromCart(item.id, true, item.type)}
                    >
                      <img src={trashIcon} alt="Supprimer" className="min-h-5 min-w-5 cursor-pointer" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total + bouton checkout */}
        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          {/* Bouton valider la commande */}
          <button
            className="mt-8 w-full bg-[#DB3D88] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#b83272] transition cursor-pointer"
            onClick={() => {
              setShow(false);
              navigate('/order');
            }}
            disabled={cart.length === 0}
          >
            Valider et payer
          </button>
          </div>
        )}

      </div>
    </>
  );
}

export default CartModal;
