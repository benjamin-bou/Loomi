import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../Login";
import search from "/images/picto/search.svg";
import hamburger from "/images/picto/hamburger.svg";
import user from "/images/picto/user.svg";
import shoppingCart from "/images/picto/shopping-cart.svg";
import favorite from "/images/picto/favorite.svg";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import logo_phase_2 from "/images/picto/logo_phase_2.svg";
import logo_phase_3 from "/images/picto/logo_phase_3.svg";
import { getTokenPayload } from "../api";
import { useEffect } from "react";
import { useCart } from '../context/CartContext';

const MainHeader = ({ setShowLogin, setShowCart, setShowNav }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();


  useEffect(() => {
    // Vérifie la présence d'un token dans le localStorage pour déterminer l'authentification
    const token = localStorage.getItem('token');
    let payload = null;
    if (token) {
      try {
        payload = getTokenPayload();
      } catch (e) {
        console.error("Token invalide ou expiré", e);
        payload = null;
      }
    }
    if (payload) {
      setIsAuthenticated(true);
      setUserName(payload.firstName || "Se connecter");
    } else {
      setIsAuthenticated(false);
      setUserName("Se connecter");
    }
  }, [setShowLogin]);

  const handleUserClick = () => {
    const payload = getTokenPayload();
    if (isAuthenticated && payload) {
      navigate(payload.role === "admin" ? "/admin" : "/profile");
    } else {
      setShowLogin(true);
    }
  };
  const handleCartClick = () => {
      setShowCart(true);
  }

  const handleHamburgerClick = () => {
      setShowNav(true);
  }

  // Choix du logo selon la route
  let logoToShow = logo_phase_1;
  if (["/boxes", "/boxeslist", "/boxdetails", "/subscriptions", "/gift-cards"].some(path => location.pathname.startsWith(path))) {
    logoToShow = logo_phase_2;
  } else if (["/profile", "/orders", "/subscription", "/favorites", "/informations"].some(path => location.pathname.startsWith(path))) {
    logoToShow = logo_phase_3;
  }
  // Ajoutez d'autres conditions selon vos besoins

  return (
    <header className="w-full">
      {/* Partie haute */}
      <div className="bg-white h-[70px] md:h-[111px] flex justify-between items-center px-4 md:px-[50px]">
        <div className="flex justify-between items-center bg-white w-full">          
          {/* Recherche / Hamburger */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Recherche"
              className="border-b border-black outline-none focus:border-gray-600 hidden md:flex"
            />            
            {/* Icône hamburger sur mobile */}
            <img src={hamburger} alt="menu" className="w-4 h-4 cursor-pointer select-none md:hidden" onClick={handleHamburgerClick} />
            {/* Icône recherche sur desktop */}
            <img src={search} alt="search" className="w-4 h-4 cursor-pointer select-none hidden md:block" />
          </div>

          {/* Logo ou image centrale */}
          <a href="/"><img src={logoToShow} alt="logo" className="h-[25px] md:h-[50px] cursor-pointer select-none" /></a>

          {/* Icônes utilisateur et panier */}
          <div className="flex items-center gap-1 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2 cursor-pointer select-none" onClick={handleUserClick}>
              <img src={user} alt="user" className="w-4 h-4  md:w-8 md:h-8 cursor-pointer select-none"/>
              <p className="font-bold cursor-pointer select-none !text-xs !md:text-md">{userName || "Se connecter"}</p>
            </div>
            <div className="flex items-center gap-1 md:gap-4 relative">
              <img
                src={favorite}
                alt="favorite"
                className="w-4 h-4 md:w-8 md:h-8 cursor-pointer select-none"
                onClick={() => navigate("/profile/favorites")}
              />
              <img
                src={shoppingCart}
                onClick={handleCartClick}
                alt="shopping cart"
                className="w-4 h-4 md:w-8 md:h-8 cursor-pointer select-none"
              />
              {cart.length > 0 && (
                <div
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5  md:w-8 md:h-8 flex items-center justify-center"
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  {cart.length}
                </div>
              )}
            </div>
          </div>
        </div>      
      </div>

      {/* Barre de navigation - masquée sur mobile (< 768px) */}
      <nav className="hidden md:flex bg-loomilightpink h-[63px] items-center justify-center">
        <ul className="flex justify-center gap-12 text-white font-medium">
          <li><a className="neulis font-light nav-underline" href="/boxes">Nos box</a></li>
          <li><a className="neulis font-light nav-underline" href="/subscriptions">Nos abonnements</a></li>
          <li><a className="neulis font-light nav-underline" href="/gift-cards">Cartes cadeaux</a></li>
          <li><a className="neulis font-light nav-underline" href="/about">À propos</a></li>
          <li><a className="neulis font-light nav-underline" href="/blog">Blog</a></li>
        </ul>
      </nav>

      {/* Bandeau de connexion */}
      {/* AuthModal et CartModal sont maintenant dans App.jsx */}
    </header>
  );
};

export default MainHeader;
