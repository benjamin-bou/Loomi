import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import MainHeader from "./components/MainHeader";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import favorite from "/images/picto/favorite.svg";
import favoriteFilled from "/images/picto/favorite_filled.svg";
import filterIcon from "/images/picto/filter.svg";
import { useNavigate } from "react-router-dom";


function BoxesList() {
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredBoxes = filter === 'ALL' ? boxes : boxes.filter(box => box.category === filter);


  useEffect(() => {
    fetchData("/boxes")
      .then(data => {
        setBoxes(data);
      })
      .catch(error => {
        console.error("Error fetching boxes:", error);
        setError("Une erreur est survenue lors du chargement des boîtes.");
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  if (!boxes) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#5B2B95]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <MainHeader />

      <div className="flex flex-col items-center justify-center mx-[50px]">
      <h2 className="mt-10 mb-5 text-start self-start">
        Nos box
      </h2>

      <div className="flex items-center w-full mb-5 gap-6">
        <p className="!text-2xl">Filtres</p>
        <img src={filterIcon} alt="Filtre" className="w-8 h-8 cursor-pointer" />
        <button className={`border rounded-2xl px-3 py-2 min-w-[180px] cursor-pointer ${filter === 'ALL' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('ALL')}>
          Voir tout
        </button>
        <button className={`border rounded-2xl px-3 py-2 min-w-[180px] cursor-pointer ${filter === 'activité manuelle' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('activité manuelle')}>
          Box&nbsp;activité&nbsp;manuelle
        </button>
        <button className={`border rounded-2xl px-3 py-2 min-w-[180px] cursor-pointer ${filter === 'DIY' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('DIY')}>
          Box DIY
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {filteredBoxes.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-[300px]">
            <p className="text-lg text-[#FA5D5D]">Aucune boîte trouvée pour ce filtre.</p>
          </div>
        )}
        {filteredBoxes.length > 0 && filteredBoxes.map((box, idx) => (
          <React.Fragment key={box.id}>
            <div className="flex flex-col gap-3 mb-8">
            <div 
            onClick={() => navigate(`/boxes/${box.id}`)}
            className="bg-white rounded-4xl flex flex-col items-center text-center w-[350px] h-[380px] min-w-[280px] max-w-[280px] relative hover:cursor-pointer">
              <button
                type="button"
                className="absolute top-5 right-5 z-10 focus:outline-none hover:cursor-pointer"
                onClick={(e) => {e.stopPropagation() ;toggleFavorite(box.id)}}
                aria-label={favorites.includes(box.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                <img
                  src={favorites.includes(box.id) ? favoriteFilled : favorite}
                  alt="Favori"
                  className="w-8 h-8"
                  />
              </button>
                  {/* <img
                    src={`/images/${box.image}`}
                    alt={`Boîte ${box.name}`}
                    className="w-full h-full rounded-xl"
                  /> */}
              <img src="https://dummyimage.com/400x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-4xl"/>
            </div>
            <div className="flex flex-col">
              <h4 className="!text-3xl font-light">{box.name}</h4>
              <p>{box.category || "Catégorie non spécifiée"}</p>
              <p>{box.base_price.replace('.', ',')} €</p>
            </div>
            </div>
            {idx === 1 && (
              <div className="w-[710px] h-[380px] min-w-[580px] max-w-[580px] flex items-center justify-center">
                <img src="https://dummyimage.com/700x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-4xl object-cover" alt="spéciale" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-loomilightpink h-[300px] w-full rounded-4xl flex flex-col justify-center items-center gap-10 mt-15">
        <h2 className="max-w-3/5 text-white text-center">Une box à découvrir chaque mois, directement chez vous</h2>
        <button className="bg-loomipink text-white rounded-2xl p-3 w-[180px]">
          Abonnez-vous
        </button>
      </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default BoxesList;
