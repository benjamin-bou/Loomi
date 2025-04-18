import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import search from "/images/picto/search.svg";
import user from "/images/picto/user.svg";
import shoppingCart from "/images/picto/shopping-cart.svg";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import { getTokenPayload } from "../api";
import { useEffect } from "react";

const MainHeader = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();


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
            <img src={shoppingCart} alt="shopping cart" className="w-8 h-8 cursor-pointer select-none" />
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
        <Login 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        />
        {/* // <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col p-8 animate-slide-in">
        //   <button className="self-end text-xl mb-4" onClick={handleClose}>&times;</button>
        //   <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        //   <form className="flex flex-col gap-4">
        //     <input type="email" placeholder="Email" className="border p-2 rounded" />
        //     <input type="password" placeholder="Mot de passe" className="border p-2 rounded" />
        //     <button type="submit" className="bg-loomilightpink text-white py-2 rounded">Se connecter</button>
        //   </form>
        // </div> */}
      
    </header>
  );
};

export default MainHeader;
