import {
    FaInstagram,
    FaPinterestP,
    FaTiktok,
    FaYoutube,
    FaFacebookF,
    FaCcVisa,
    FaCcApplePay,
    FaCcPaypal,
  } from "react-icons/fa";
  import { useEffect, useRef, useState } from "react";
  import logo from "/images/picto/logo_phase_3.svg";
  import { useNavigate } from "react-router-dom";
  import { getTokenPayload } from "../api";
  
  const Footer = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      // Vérifier l'authentification
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
      setIsAuthenticated(!!payload);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const footer = footerRef.current;
        const logo = logoRef.current;
  
        if (!footer || !logo) return;
  
        const rect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        // Footer visible à l’écran
        if (rect.top < windowHeight && rect.bottom > 0) {
          const totalHeight = rect.height;
          const visibleHeight = windowHeight - rect.top;
          const ratio = Math.min(Math.max(visibleHeight / totalHeight, 0), 1);
  
          // Le logo ne remonte qu'à 80% (20% reste caché)
          logo.style.transform = `translateY(${100 - ratio * 60}%)`;
          logo.style.opacity = ratio * 0.5;
        }
      };      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);    // Fonctions de navigation conditionnelle
    const handleMyOrdersClick = () => {
      if (isAuthenticated) {
        navigate('/profile/orders');
        window.scrollTo({top:0, left:0, behavior:'smooth'});
      } else {
        setShowLogin(true);
      }
    };

    const handleTrackPackageClick = () => {
      if (isAuthenticated) {
        navigate('/profile/deliveries');
        window.scrollTo({top:0, left:0, behavior:'smooth'});
      } else {
        setShowLogin(true);
      }
    };

    const handleReturnOrderClick = () => {
      if (isAuthenticated) {
        navigate('/profile/orders');
        window.scrollTo({top:0, left:0, behavior:'smooth'});
      } else {
        setShowLogin(true);
      }
    };
  
    return (      <footer
        ref={footerRef}
        className="relative bg-white px-4 sm:!px-6 md:!px-8 pt-12 sm:!pt-16 pb-12 sm:!pb-16 text-[#1B1B1B] overflow-hidden z-10"
      >
        {/* Logo animé sous le contenu */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 overflow-hidden z-0 w-full pointer-events-none">
          <img
            ref={logoRef}
            src={logo}
            alt="Logo"
            className="w-[100vw] transition-transform duration-200 ease-out opacity-30"
            style={{ transform: "translateY(100%)", opacity: 0 }}
          />
        </div>
        {/* Contenu classique */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xs:!grid-cols-2 md:!grid-cols-4 gap-6 sm:!gap-8 md:!gap-10 mb-12 sm:!mb-16">            <div className="text-center sm:!text-left">
              <h3 className="font-bold !text-base sm:!text-lg mb-3 sm:!mb-4">Aide et contact</h3>
              <ul className="space-y-2 !text-xs sm:!text-sm">
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={handleMyOrdersClick}>Ma commande</li>
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={handleTrackPackageClick}>Suivre mon colis</li>
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={handleReturnOrderClick}>Retourner ma commande</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>            <div className="text-center sm:!text-left">
              <h3 className="font-bold !text-base sm:!text-lg mb-3 sm:!mb-4">Offres</h3>
              <ul className="space-y-2 !text-xs sm:!text-sm">
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={() => { navigate('/boxes'); window.scrollTo({top:0, left:0, behavior:'smooth'}); }}>Nos box</li>
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={() => { navigate('/subscriptions'); window.scrollTo({top:0, left:0, behavior:'smooth'}); }}>Nos abonnements</li>
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={() => { navigate('/gift-cards'); window.scrollTo({top:0, left:0, behavior:'smooth'}); }}>Carte cadeaux</li>
              </ul>
            </div>            <div className="text-center sm:!text-left">
              <h3 className="font-bold !text-base sm:!text-lg mb-3 sm:!mb-4">À propos</h3>
              <ul className="space-y-2 !text-xs sm:!text-sm">
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={() => { navigate('/about'); window.scrollTo({top:0, left:0, behavior:'smooth'}); }}>Notre marque</li>
                <li className="cursor-pointer hover:text-loomipink transition-colors" onClick={() => { navigate('/about'); window.scrollTo({top:0, left:0, behavior:'smooth'}); }}>Nos engagements</li>
              </ul>
            </div>            <div className="text-center sm:!text-left">
              <h3 className="font-bold !text-base sm:!text-lg mb-3 sm:!mb-4">Suivez nous !</h3>
              <div className="flex items-center gap-3 sm:!gap-4 !text-lg sm:!text-xl md:!text-2xl justify-center sm:!justify-start">
                <FaInstagram 
                  className="cursor-pointer hover:text-loomipink transition-colors" 
                  onClick={() => window.open('https://www.instagram.com/box.loomi/?hl=fr', '_blank')} 
                />
                <FaPinterestP 
                  className="cursor-pointer hover:text-loomipink transition-colors" 
                  />
                <FaTiktok 
                  className="cursor-pointer hover:text-loomipink transition-colors" 
                />
                <FaYoutube 
                  className="cursor-pointer hover:text-loomipink transition-colors" 
                  onClick={() => window.open('https://www.youtube.com/@LOOMIBOX', '_blank')}
                />
                <FaFacebookF className="cursor-pointer hover:text-loomipink transition-colors" />
              </div>
            </div>
          </div>          <div className="flex flex-col md:!flex-row justify-center md:!justify-between items-center text-center gap-6 sm:!gap-8">
            <div>
              <h3 className="font-bold !text-base sm:!text-lg mb-2 sm:!mb-3">Paiements sécurisés</h3>
              <div className="flex items-center justify-center gap-3 sm:!gap-4 !text-2xl sm:!text-3xl">
                <FaCcVisa className="hover:text-loomipink transition-colors" />
                <FaCcApplePay className="hover:text-loomipink transition-colors" />
                <FaCcPaypal className="hover:text-loomipink transition-colors" />
              </div>
            </div>
            <div className="mb-auto">
              <h3 className="font-bold !text-base sm:!text-lg">Livraisons en France</h3>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
