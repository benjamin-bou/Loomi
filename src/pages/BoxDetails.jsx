import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../api";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";
import favorite from "/images/picto/favorite.svg";
import favoriteFilled from "/images/picto/favorite_filled.svg";
import Newsletter from "../components/Newsletter";
import BoxDetailsSkeleton from "../components/BoxDetailsSkeleton";
import ReviewsList from "../components/ReviewsList";
import { useFavorites } from "../hooks/useFavorites";
import { getImageUrl } from "../utils/imageUtils";

function BoxPage({ setShowCart }) {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [relatedBoxes, setRelatedBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const accordionData = [
    {
      title: "Détails du produit",
      content: box?.description || "Ici s'affichent les détails du produit.",
      type: "text"
    },
    {
      title: "Avis client",
      content: null,
      type: "reviews"
    },
    {
      title: "Livraison et retour",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">📦 Livraison</h4>
            <p className="text-gray-600">{box?.delivery || "Informations de livraison non disponibles."}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">↩️ Retour</h4>
            <p className="text-gray-600">{box?.return_policy || "Informations de retour non disponibles."}</p>
          </div>
        </div>
      ),
      type: "html"
    }
  ];

  useEffect(() => {
    setLoading(true);
    fetchData(`/boxes/${id}`)
      .then(data => { setBox(data)})
      .catch(err => {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des détails de la boîte.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setRelatedLoading(true);
    fetchData(`/boxes`)
      .then(data => setRelatedBoxes(
        data.filter(b => b.id !== parseInt(id)).slice(0, 4)
      ))
      .catch(err => {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des boîtes suggérées.");
      })
      .finally(() => {
        setRelatedLoading(false);
      });
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  if (loading) {
    return <BoxDetailsSkeleton />;
  }
  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="px-4 xs:!px-6 sm:!px-8 md:!px-12 lg:!px-[50px] py-4 xs:!py-6 sm:!py-8 md:!py-[50px]">
        {/* Route */}
        <div className="mb-3 xs:!mb-4 sm:!mb-6">
          <p className="text-xs xs:!text-sm sm:!text-base">
            <span className="cursor-pointer hover:underline" onClick={() => navigate('/boxes')}>
              Nos box
            </span> / {box.name}
          </p>
        </div>

        {/* Détails principaux */}
        <div className="flex flex-col lg:!flex-row justify-between mt-3 xs:!mt-4 w-full gap-4 xs:!gap-6 sm:!gap-8 lg:!gap-12">          {/* Images de la box */}
          <div className="w-full lg:!w-[58%]">
            <div className="grid grid-cols-1 sm:!grid-cols-2 gap-2 xs:!gap-3 sm:!gap-4 md:!gap-6">
              {box.images && box.images.length > 0 ? (
                <>
                  {/* Image principale - toujours la première image de la boîte */}
                  <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src={getImageUrl(box.images[0].link)}
                      alt={box.images[0].alt || box.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box";
                      }}
                    />
                  </div>
                  
                  {/* Image secondaire - fixe selon la catégorie */}
                  <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src={getImageUrl(box.category?.short_name === 'DIY' ? '/images/boxes/orange_boxes_lot.png' : '/images/boxes/pink_boxes_lot.png')}
                      alt={`Collection de boîtes ${box.category?.short_name || 'créatives'}`}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box";
                      }}
                    />
                  </div>
                  
                  {/* Image large en bas - toujours box_couture_003 */}
                  <div className="col-span-1 sm:!col-span-2 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src={getImageUrl('/images/boxes/box_couture_003.png')}
                      alt="Atelier couture créatif"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box";
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Fallback - première image grise */}
                  <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src="https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box"
                      alt={box.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Fallback - deuxième image selon la catégorie */}
                  <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src={getImageUrl(box.category?.short_name === 'DIY' ? '/images/boxes/orange_boxes_lot.png' : '/images/boxes/pink_boxes_lot.png')}
                      alt={`Collection de boîtes ${box.category?.short_name || 'créatives'}`}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box";
                      }}
                    />
                  </div>
                  
                  {/* Fallback - troisième image fixe */}
                  <div className="col-span-1 sm:!col-span-2 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 rounded-2xl xs:!rounded-3xl md:!rounded-4xl overflow-hidden">
                    <img 
                      src={getImageUrl('/images/boxes/box_couture_003.png')}
                      alt="Atelier couture créatif"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/400x300/D9D9D9/D9D9D9&text=Box";
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Infos de la box */}
          <div className="w-full lg:!w-[34%] mt-4 xs:!mt-6 lg:!mt-0">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col flex-1">
                <h2 className="text-2xl md:text-3xl lg:!text-[36px] lg:leading-[36px] text-[#1B1B1B]">{box.name}</h2>
                <p className="text-base md:text-lg lg:!text-[18px] text-[#666] mt-1">{box.category?.short_name}</p>
                <p className="text-base md:text-lg lg:!text-[18px] mt-2">
                  {box?.base_price ? Number(box.base_price).toFixed(2).replace('.', ',') : ''} €
                </p>
              </div>
              <img
                src={isFavorite(parseInt(id)) ? favoriteFilled : favorite}
                alt="favorite"
                className="w-6 h-6 md:w-7 lg:w-8 md:h-7 lg:h-8 ml-4 cursor-pointer select-none transition-all duration-200 flex-shrink-0"
                onClick={() => toggleFavorite(parseInt(id))}
              />
            </div>
            <p className="mt-6 md:mt-8 lg:mt-14 text-[#333] text-justify font-normal text-sm md:text-base">
              {box.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
            </p>

            {/* Boutons */}
            <div className="mt-4 md:mt-6 flex flex-col gap-3 md:gap-4 lg:gap-5">
              <button
                onClick={() => {
                  addToCart({ ...box, type: 'box' });
                  setShowCart && setShowCart(true);
                }}
                className="neulis text-sm md:text-[15px] border border-black py-2 md:py-2.5 rounded-xl hover:text-loomilightpink hover:border-loomilightpink hover:cursor-pointer transition-all duration-300"
              >
                Ajouter au panier
              </button>
              <button className="neulis text-sm md:text-[15px] bg-[#DB3D88] text-white py-2 md:py-2.5 rounded-xl hover:bg-[#b83272] hover:cursor-pointer transition">
                S'abonner
              </button>
            </div>

            {/* Accordéon infos */}
            <div className="mt-8 md:mt-10 lg:mt-13 text-sm">
              {accordionData.map((item, idx) => (
                <div key={idx} className="w-full md:w-[90%] border-b my-5 md:my-7 pb-2 tracking-[0.5px]">
                  <div
                    className="flex justify-between items-center cursor-pointer select-none text-sm md:text-[16px]"
                    onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  >
                    <span>{item.title}</span>
                    <span className="float-right mr-3 flex items-center h-6 w-6 relative">
                      <span className={`transition-transform duration-300 block h-[1.5px] w-3 bg-[#1B1B1B] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${openAccordion === idx ? 'rotate-45 translate-y-1' : ''}`}></span>
                      <span className={`transition-transform duration-300 block h-[1.5px] w-3 bg-[#1B1B1B] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${openAccordion === idx ? '-rotate-45 translate-y-1' : 'rotate-90'}`}></span>
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === idx ? (item.type === "reviews" ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-96 opacity-100 mt-2') : 'max-h-0 opacity-0'}`}
                  >
                    <div className={`text-[#666] text-sm md:text-[15px] pr-4 ${item.type === "reviews" ? 'max-h-[450px] overflow-y-auto custom-scrollbar' : ''}`}>
                      {item.type === "reviews" ? (
                        <ReviewsList boxId={parseInt(id)} />
                      ) : item.type === "html" ? (
                        item.content
                      ) : (
                        item.content
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section "Vous aimerez aussi" */}
      <div className="mx-4 md:mx-8 lg:mx-[50px] py-6 md:py-8 lg:py-[50px]">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-10 lg:mb-12">Vous aimerez aussi !</h2>
        {relatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-3xl md:rounded-4xl"></div>
            ))}
          </div>
        ) : relatedBoxes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full">
            {relatedBoxes.map((related, index) => (
              <div 
                key={index} 
                onClick={() => navigate(`/boxes/${related.id}`)} 
                className="w-full h-64 md:h-80 lg:h-96 rounded-3xl md:rounded-4xl cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
              >
                {related.images && related.images.length > 0 ? (
                  <img
                    src={getImageUrl(related.images[0].link)}
                    alt={related.images[0].alt || related.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // En cas d'erreur, on affiche une div grise au lieu d'une image externe
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback div grise (cachée par défaut, affichée en cas d'erreur) */}
                <div 
                  className="w-full h-full bg-gray-300 flex items-center justify-center"
                  style={{ display: (!related.images || related.images.length === 0) ? 'flex' : 'none' }}
                >
                  <span className="text-gray-600 text-lg font-medium">{related.name}</span>
                </div>

                {/* Overlay avec le nom et la catégorie en haut centré */}
                <div className="absolute top-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-sm md:text-base drop-shadow-lg">{related.name}</h3>
                  {related.category && (
                    <p className="text-xs md:text-sm opacity-90 drop-shadow-lg">{related.category.short_name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

export default BoxPage;
