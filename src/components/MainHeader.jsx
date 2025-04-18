import search from "/images/picto/search.svg";
import user from "/images/picto/user.svg";
import shoppingCart from "/images/picto/shopping-cart.svg";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";

const MainHeader = () => {
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
          <img src={search} alt="search" className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Logo ou image centrale */}
        {/* <a onClick={() => window.location.href = "/"}><p className="cursor-pointer">Loomi</p></a> */}
        <a href="/"><img src={logo_phase_1} alt="logo" className="h-[100px] cursor-pointer" /></a>

        {/* Icônes utilisateur et panier */}
        <div className="flex items-center gap-4">
          <img src={user} alt="user" className="w-6 h-6 cursor-pointer" />
          <img src={shoppingCart} alt="shopping cart" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      </div>

      {/* Barre de navigation */}
      <nav className="bg-loomilightpink bg-[var(--loomilightpink)] h-[63px] flex items-center justify-center">
        <ul className="flex justify-center gap-12 text-black font-medium">
          <li><a href="/boxes">Nos box</a></li>
          <li><a href="/subscriptions">Nos abonnements</a></li>
          <li><a href="/gift-cards">Cartes cadeaux</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
