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
      content: box?.details || "Ici s'affichent les détails du produit.",
      type: "text"
    },
    {
      title: "Avis client",
      content: null,
      type: "reviews"
    },
    {
      title: "Livraison et retour",
      content: box?.delivery || "Ici s'affichent les informations de livraison et de retour.",
      type: "text"
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
        <div className="flex flex-col lg:!flex-row justify-between mt-3 xs:!mt-4 w-full gap-4 xs:!gap-6 sm:!gap-8 lg:!gap-12">
          {/* Images de la box */}
          <div className="w-full lg:!w-[58%]">
            <div className="grid grid-cols-1 sm:!grid-cols-2 gap-2 xs:!gap-3 sm:!gap-4 md:!gap-6">
              <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 bg-gray-300 rounded-2xl xs:!rounded-3xl md:!rounded-4xl"></div>
              <div className="col-span-1 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 bg-gray-300 rounded-2xl xs:!rounded-3xl md:!rounded-4xl"></div>
              <div className="col-span-1 sm:!col-span-2 h-40 xs:!h-48 sm:!h-56 md:!h-64 lg:!h-96 bg-gray-300 rounded-2xl xs:!rounded-3xl md:!rounded-4xl"></div>
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
                className="w-full h-64 md:h-80 lg:h-96 bg-gray-300 rounded-3xl md:rounded-4xl cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                {/* <img
                  src={`/images/${related.image}`}
                  alt={related.name}
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                /> */}
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
