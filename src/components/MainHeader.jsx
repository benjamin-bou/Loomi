import search from "/images/picto/search.svg";
import user from "/images/picto/user.svg";
import shoppingCart from "/images/picto/shopping-cart.svg";

const MainHeader = () => {
  return (
    <header className="w-full shadow-md">
      {/* Partie haute */}
      <div className="flex justify-between items-center px-20 py-6 bg-white">
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
        <p className="cursor-pointer">Loomi</p>

        {/* Icônes utilisateur et panier */}
        <div className="flex items-center gap-4">
          <img src={user} alt="user" className="w-6 h-6 cursor-pointer" />
          <img src={shoppingCart} alt="shopping cart" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Barre de navigation */}
      <nav className="bg-pink-200">
        <ul className="flex justify-center gap-12 py-3 text-black font-medium">
          <li><a href="#">Nos box</a></li>
          <li><a href="#">Nos abonnements</a></li>
          <li><a href="#">Cartes cadeaux</a></li>
          <li><a href="#">À propos</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
