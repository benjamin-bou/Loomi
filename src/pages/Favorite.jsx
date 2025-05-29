import { useEffect, useState } from "react";
import BoxCard from "../components/BoxCard";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/addOns/MainButton";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../hooks/useFavorites";
import { fetchData } from "../api";

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
        console.log("Favorites in useEffect:", favorites);
        const data = await fetchData("/boxes");
        console.log("All boxes fetched:", data);
        
        // Filtrer les boîtes qui sont dans les favoris
        const favoriteBoxesData = data.filter(box => favorites.includes(box.id));
        console.log("Filtered favorite boxes:", favoriteBoxesData);
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
  }
  return (
      <div className="bg-loomibeige min-h-screen relative px-8 py-8 overflow-hidden">
        <h1 className="relative z-10 mb-8 mx-[50px]">Mes favoris</h1>

        {/* Liste de favoris */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 mx-[50px] mb-10">
          {loading ? (
            <div className="text-center text-gray-500 text-lg">Chargement...</div>
          ) : favoriteBoxes.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">Aucun favori trouvé.</div>
          ) : (
            favoriteBoxes.map((box) => (
              <div className="flex flex-col items-start mb-10" key={box.id}>
              <BoxCard
                key={box.id}
                box={box}
                isFavorite={isFavorite(box.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => navigate('/boxes/' + box.id)}
                />              <MainButton
                text="Ajouter au panier"
                onClick={() => {
                  addToCart({ ...box, type: 'box' });
                  setShowCart && setShowCart(true);
                }}
                />
              </div>
            ))
          )}
        </div>
      </div>
  );
}