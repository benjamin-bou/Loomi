import { useEffect, useState } from "react";
import LoomiSteps from "../components/LoomiSteps";
import ReviewsSection from "../components/home/ReviewsSection";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api";
import l_shape from "/images/picto/l_shape.svg";
import double_o_shape from "/images/picto/double_o_shape.svg";
import motif_1 from "/images/motif_1.svg";
import motif_2 from "/images/motif_2.svg";

export default function Subscriptions() {
  const navigate = useNavigate();
  const [abonnements, setAbonnements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await fetchData("/subscriptions");
        if (data) {
          setAbonnements(data);
        } else {
          console.error("Erreur lors du chargement des abonnements.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des abonnements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);
  return (
    <div className="bg-[#FFF7F0] min-h-screen pb-10">
      <div className="flex flex-col items-center justify-center mx-4 sm:mx-8 lg:mx-[50px] mb-16 sm:mb-24 lg:mb-32">
        <h2 className="mt-6 sm:mt-8 lg:mt-10 mb-10 sm:mb-16 lg:mb-20 text-start self-start !text-2xl sm:text-3xl lg:text-4xl">Nos abonnements</h2>
        
        {loading ? (
          <div className="text-center py-20">
            <p>Chargement des abonnements...</p>
          </div>
        ) : abonnements.length === 0 ? (
          <div className="text-center py-20">
            <p>Aucun abonnement disponible pour le moment.</p>
          </div>
        ) : (
          abonnements.map((abonnement, index) => (
            <div key={abonnement.id} className="relative w-full max-w-6xl mb-16 sm:mb-24 lg:mb-30 flex">
              {/* SVG décoratif */}
              {index === 0 && (
                <img 
                  src={l_shape} 
                  alt="Forme décorative gauche" 
                  className="hidden xl:block absolute -left-30 -bottom-30 w-[153px] h-[411px] z-50"
                />
              )}
              {index === 1 && (
                <img 
                  src={double_o_shape} 
                  alt="Forme décorative droite" 
                  className="hidden xl:block absolute right-0 bottom-0 w-[300px] h-[300px] z-50 transform translate-y-1/2"
                />
              )}
              
              {/* Carte */}
              <div className="bg-white text-black rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 w-full z-20 gap-6 sm:gap-8 lg:gap-10">
                <div className={`flex flex-col justify-center items-center ${index === 0 ? 'order-2 lg:order-1' : 'order-1 lg:order-1'}`}>
                  <h3 className="my-4 text-center !text-xl sm:text-2xl lg:text-3xl font-semibold">{abonnement.label.toUpperCase()}</h3>
                  <article className="text-center w-full sm:w-4/5 mb-6 !text-sm sm:text-base lg:text-lg">
                    {abonnement.description.split('\n').map((line, i) => 
                      line.trim() ? <p key={i}>{line.trim()}</p> : <br key={i} />
                    )}
                  </article>
                  <div className="flex flex-col justify-center mb-2 gap-4 sm:gap-6">
                    <p className="!text-2xl sm:text-3xl font-medium">
                      {abonnement.price}€ / {abonnement.recurrence === 'monthly' ? 'MOIS' : '3 MOIS'}
                    </p>
                    <button 
                      onClick={() => navigate(`${abonnement.id}`)} 
                      className="px-6 py-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      S'abonner
                    </button>
                  </div>
                </div>            
                <div className={`w-full h-48 sm:h-64 lg:h-full flex justify-center items-center ${index === 0 ? 'order-1 lg:order-2' : 'order-2 lg:order-2'}`}>
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={index === 0 ? motif_1 : motif_2} 
                      alt={`Motif ${abonnement.label.toLowerCase()}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Étapes */}
        <LoomiSteps textColor={"#000000"} iconsColor={"pink"}/>
        {/* Avis */}
        <ReviewsSection />
      </div>
    </div>
  );
}
