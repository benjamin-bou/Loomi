import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import search from "/images/picto/search.svg";
import user from "/images/picto/user.svg";
import shoppingCart from "/images/picto/shopping-cart.svg";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import { getTokenPayload } from "../api";
import { useEffect } from "react";
import AuthModal from "./AuthModal";
import CartModal from "./CartModal";
import { useCart } from '../context/CartContext';

const MainHeader = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();


  useEffect(() => {
    // Vérifie la présence d'un token dans le localStorage pour déterminer l'authentification
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(getTokenPayload()?.firstName || "Se connecter");
    }
  }, [showLogin]);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate(getTokenPayload().role == "admin" ? "/admin" : "/profile");
    } else {
      setShowLogin(true);
    }
  };

  const handleCartClick = () => {
      setShowCart(true);
  }

  return (
    <header className="w-full shadow-md">
      {/* Partie haute */}
      <div className="bg-white h-[111px] flex justify-between items-center px-[50px]">
        <div className="flex justify-between items-center bg-white w-full">
          {/* Recherche */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Recherche"
              className="border-b border-black outline-none focus:border-gray-600"
            />
            <img src={search} alt="search" className="w-4 h-4 cursor-pointer select-none" />
          </div>

          {/* Logo ou image centrale */}
          <a href="/"><img src={logo_phase_1} alt="logo" className="h-[100px] cursor-pointer select-none" /></a>

          {/* Icônes utilisateur et panier */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleUserClick}>
              <img src={user} alt="user" className="w-8 h-8 cursor-pointer select-none"/>
              <p className="font-bold cursor-pointer select-none">{userName || "Se connecter"}</p>
            </div>
            <div className="flex items-center gap-4 relative">
              <img
                src={shoppingCart}
                onClick={handleCartClick}
                alt="shopping cart"
                className="w-8 h-8 cursor-pointer select-none"
              />
              {cart.length > 0 && (
                <div
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  {cart.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barre de navigation */}
      <nav className="bg-loomilightpink h-[63px] flex items-center justify-center">
        <ul className="flex justify-center gap-12 text-black font-medium">
          <li><a href="/boxes">Nos box</a></li>
          <li><a href="/subscriptions">Nos abonnements</a></li>
          <li><a href="/gift-cards">Cartes cadeaux</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>

      {/* Bandeau de connexion */}
        <AuthModal 
        show={showLogin}
        setShow={setShowLogin}
        />
      {/* Bandeau de panier */}
        <CartModal 
        show={showCart} 
        setShow={setShowCart} 
        />
    </header>
  );
};

export default MainHeader;
