import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import Newsletter from "../components/Newsletter";
import filterIcon from "/images/picto/filter.svg";
import { useNavigate } from "react-router-dom";
import BoxCard from "../components/BoxCard";
import BoxCardSkeleton from "../components/BoxCardSkeleton";
import { useFavorites } from "../hooks/useFavorites";


function BoxesList() {
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const navigate = useNavigate();  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredBoxes = filter === 'ALL' ? boxes : boxes.filter(box => box.category.short_name.toLowerCase() === filter.toLowerCase());
  useEffect(() => {
    setLoading(true);
    fetchData("/boxes")
      .then(data => {
        setBoxes(data);
      })
      .catch(error => {
        console.error("Error fetching boxes:", error);
        setError("Une erreur est survenue lors du chargement des boîtes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }
  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-[50px]">
      <h2 className="mt-6 md:mt-10 mb-4 md:mb-5 text-xl md:text-2xl lg:text-3xl text-start self-start">
        Nos box
      </h2>      <div className="flex flex-col md:flex-row items-start md:items-center w-full mb-4 md:mb-5 gap-3 md:gap-6">
        <div className="flex items-center gap-3 md:gap-6">
          <p className="text-lg md:!text-2xl">Filtres</p>
          <img src={filterIcon} alt="Filtre" className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className={`border rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-2 text-sm md:text-base min-w-[140px] md:min-w-[180px] cursor-pointer ${filter === 'ALL' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('ALL')}>
            Voir tout
          </button>
          <button className={`border rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-2 text-sm md:text-base min-w-[140px] md:min-w-[180px] cursor-pointer ${filter === 'activité manuelle' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('activité manuelle')}>
            Box&nbsp;activité&nbsp;manuelle
          </button>
          <button className={`border rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-2 text-sm md:text-base min-w-[140px] md:min-w-[180px] cursor-pointer ${filter === 'DIY' ? 'bg-loomilightpink text-white' : ''}`} onClick={() => setFilter('DIY')}>
            Box DIY
          </button>
        </div>
      </div>      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mx-auto max-w-[1470px]">
        {loading && (
          // Affichage des skeletons pendant le chargement
          <>
            {Array(6).fill(0)?.map((_, index) => (
              <React.Fragment key={`skeleton-${index}`}>
                <BoxCardSkeleton />                
                {index === 1 && (
                  <>
                    {/* Image promotionnelle responsive */}                    <div className="w-full max-w-[580px] lg:max-w-[600px] xl:max-w-[580px] h-[250px] md:h-[300px] lg:h-[320px] xl:h-[300px] flex items-center justify-center basis-full md:basis-auto">
                      <div className="w-full h-full bg-gray-200 rounded-3xl md:rounded-4xl animate-pulse"></div>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </>
        )}
          {!loading && filteredBoxes.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center h-[300px] basis-full">
            <p className="text-lg text-[#FA5D5D]">Aucune boîte trouvée pour ce filtre.</p>
          </div>
        )}
          {!loading && filteredBoxes.length > 0 && filteredBoxes?.map((box, idx) => (
          <React.Fragment key={box.id}>
            <BoxCard
              box={box}
              isFavorite={isFavorite(box.id)}
              onToggleFavorite={toggleFavorite}
              onClick={() => navigate(`/boxes/${box.id}`)}
            />            {idx === 1 && (
              <>
                {/* Image promotionnelle responsive */}                <div className="w-full max-w-[580px] lg:max-w-[600px] xl:max-w-[580px] h-[250px] md:h-[300px] lg:h-[320px] xl:h-[300px] flex items-center justify-center basis-full md:basis-auto">
                  <img src="https://dummyimage.com/700x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-3xl md:rounded-4xl object-cover" alt="spéciale" />
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Section d'abonnement responsive */}
      <div className="bg-loomilightpink h-[200px] md:h-[250px] lg:h-[300px] w-full rounded-3xl md:rounded-4xl flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10 mt-8 md:mt-12 lg:mt-15 mx-4 md:mx-8 lg:mx-0 p-4 md:p-6 lg:p-8">
        <h2 className="max-w-4/5 md:max-w-3/5 text-white text-center !text-[20px] md:!text-xl lg:!text-2xl px-4">Une box à découvrir chaque mois, directement chez vous</h2>
        <button className="bg-loomipink text-white rounded-xl md:rounded-2xl p-2 md:p-3 w-[160px] md:w-[180px] text-sm md:text-base hover:bg-opacity-90 transition-colors">
          Abonnez-vous
        </button>
      </div>
      </div>

      <Newsletter />
    </div>
  );
}

export default BoxesList;
