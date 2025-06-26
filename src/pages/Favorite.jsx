import { useEffect, useState } from "react";
import BoxCard from "../components/BoxCard";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/addOns/MainButton";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../hooks/useFavorites";
import { fetchData } from "../api";
import o_shape from "/images/picto/o_shape.svg";

export default function Favorites({ setShowCart }) {
  const [favoriteBoxes, setFavoriteBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const data = await fetchData("/boxes");
        
        // Filtrer les boîtes qui sont dans les favoris
        const favoriteBoxesData = data.filter(box => favorites.includes(box.id));
        setFavoriteBoxes(favoriteBoxesData);
      } catch (error) {
        console.error("Error fetching boxes:", error);
        setError("Une erreur est survenue lors du chargement des favoris.");
      } finally {
        setLoading(false);
      }
    };

    // Ne pas exécuter si favorites est encore vide au premier rendu
    if (favorites.length > 0) {
      fetchBoxes();
    } else {
      // Si aucun favori, on peut directement arrêter le loading
      setLoading(false);
      setFavoriteBoxes([]);
    }
  }, [favorites]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-loomibeige">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }  return (      <div className="bg-loomibeige min-h-screen relative px-3 xs:!px-4 sm:!px-6 md:!px-8 lg:!px-12 py-3 xs:!py-4 sm:!py-6 md:!py-8 overflow-hidden">
        {/* SVG décoratif */}
        <img 
          src={o_shape} 
          alt="" 
          className="absolute -left-4 xs:!-left-5 sm:!-left-8 md:!-left-10 top-[12%] xs:!top-[15%] sm:!top-[20%] md:!top-[25%] z-0 pointer-events-none w-[30vw] xs:!w-[35vw] sm:!w-[30vw] md:!w-[25vw] h-[30vw] xs:!h-[35vw] sm:!h-[30vw] md:!h-[25vw] max-w-[200px] xs:!max-w-[250px] sm:!max-w-[300px] md:!max-w-[350px] max-h-[200px] xs:!max-h-[250px] sm:!max-h-[300px] md:!max-h-[350px]"
        />

        <div className="relative z-10 w-full sm:!w-[90%] md:!w-[85%] lg:!w-[80%] mx-auto">
          {/* En-tête */}
          <div className="mb-4 xs:!mb-6 sm:!mb-8 text-center sm:!text-left">
            <h1 className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">Mes favoris</h1>
          </div>

          {/* Liste de favoris */}
          <div className="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 gap-3 xs:!gap-4 sm:!gap-6 md:!gap-8 justify-items-center">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 text-sm xs:!text-base sm:!text-lg py-6 xs:!py-8 sm:!py-12">
                Chargement...
              </div>
            ) : favoriteBoxes.length === 0 ? (
              <div className="col-span-full text-center py-6 xs:!py-8 sm:!py-12">
                <div className="text-gray-400 text-3xl xs:!text-4xl sm:!text-5xl md:!text-6xl mb-2 xs:!mb-3 sm:!mb-4">💝</div>
                <h2 className="text-lg xs:!text-xl sm:!text-2xl font-semibold text-gray-600 mb-2">Aucun favori</h2>
                <p className="text-xs xs:!text-sm sm:!text-base text-gray-500 mb-3 xs:!mb-4 sm:!mb-6 px-4">
                  Vous n'avez pas encore ajouté de boîtes à vos favoris.
                </p>
                <button
                  onClick={() => navigate('/boxes')}
                  className="bg-loomilightpink text-white px-3 xs:!px-4 sm:!px-6 py-2 xs:!py-2 sm:!py-3 rounded-lg xs:!rounded-xl hover:bg-loomipink transition-colors text-xs xs:!text-sm sm:!text-base"
                >
                  Découvrir nos boîtes
                </button>
              </div>
            ) : (
              favoriteBoxes.map((box) => (
                <div className="flex flex-col items-center w-full max-w-[240px] xs:!max-w-[260px] sm:!max-w-[280px] md:!max-w-[300px]" key={box.id}>
                  <BoxCard
                    key={box.id}
                    box={box}
                    isFavorite={isFavorite(box.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => navigate('/boxes/' + box.id)}
                  />
                  <div className="mt-2 xs:!mt-3 sm:!mt-4 w-full">
                    <MainButton
                      text="Ajouter au panier"
                      onClick={() => {
                        addToCart({ ...box, type: 'box' });
                        setShowCart && setShowCart(true);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
  );
}