import { useEffect, useState } from "react";
import BoxCard from "../components/BoxCard";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/addOns/MainButton";
import { useCart } from "../context/CartContext";

const favoriteBoxesData = {
    favorites: [
      {
        id: 1,
        name: "Box couture",
        short_description: "Tout pour apprendre le tricot, laine et aiguilles inclus.",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        base_price: "39.90"
      },
      {
        id: 2,
        name: "Box couture",
        short_description: "Créez vos savons artisanaux avec ce kit complet.",
        image_url: "https://images.unsplash.com/photo-1519864600265-abb23847ef12?auto=format&fit=crop&w=400&q=80",
        base_price: "29.90"
      },
      {
        id: 3,
        name: "Box couture",
        short_description: "Apprenez à dessiner vos premiers personnages manga.",
        image_url: "https://images.unsplash.com/photo-1528747045269-390fe33c19d3?auto=format&fit=crop&w=400&q=80",
        base_price: "45.00"
      },
      {
        id: 4,
        name: "Box couture",
        short_description: "Tout pour cultiver vos premières herbes aromatiques en appartement.",
        image_url: "",
        base_price: "34.90"
      },
      {
        id: 5,
        name: "Box Broderie Moderne",
        short_description: "Initiez-vous à la broderie avec des modèles tendance.",
        image_url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        base_price: "27.50"
      }
    ]
  };

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFavorites = async () => {
    //   const data = await fetchData("/favorite-boxes");
        // Pour les tests, on utilise des données statiques
        const data = favoriteBoxesData; // Remplacez par fetchData si besoin
      setFavorites(data.favorites || []);
    };
    fetchFavorites();
  }, []);

  return (
      <div className="bg-loomibeige min-h-screen relative px-8 py-8 overflow-hidden">
        <h1 className="relative z-10 mb-8 mx-[50px]">Mes favoris</h1>

        {/* Liste de favoris */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 mx-[50px] mb-10">
          {favorites.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">Aucun favori trouvé.</div>
          ) : (
            favorites.map((box) => (
              <div className="flex flex-col items-start mb-10" key={box.id}>
              <BoxCard
                key={box.id}
                box={box}
                isFavorite={true}
                onToggleFavorite={() => console.log(`Toggle favorite for box ${box.id}`)}
                onClick={() => navigate('/boxes/' + box.id)}
                />
              <MainButton
                text="Ajouter au panier"
                onClick={() => addToCart({ ...box, type: 'box' })}
                />
              </div>
            ))
          )}
        </div>
      </div>
  );
}