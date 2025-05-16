import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "./api";
import MainHeader from "./components/MainHeader";
import { useCart } from './context/CartContext';
import { useNavigate } from "react-router-dom";
import favorite from "/images/picto/favorite.svg";

function BoxPage() {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [relatedBoxes, setRelatedBoxes] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`/boxes/${id}`)
      .then(data => setBox(data))
      .catch(err => {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des détails de la boîte.");
      });
  }, [id]);

  console.log(box);

  useEffect(() => {
    fetchData(`/boxes`)
      .then(data => setRelatedBoxes(
      data.filter(b => b.id !== parseInt(id)).slice(0, 4)
      ))
      .catch(err => {
      console.error(err);
      setError("Une erreur est survenue lors du chargement des boîtes suggérées.");
      });
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  if (!box) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#5B2B95]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <MainHeader />
      <div className="w-[calc(100vw-100px)] m-[50px]">
      {/* Route */}
      <div>
        <p>Nos box / {box.name}</p>
      </div>
      {/* Détails principaux */}
      <div className="flex flex-col md:flex-row justify-between mt-4 w-full">
        {/* Images de la box */}
        <div className="grid grid-cols-2 gap-6 w-[58%]">
          <div className="col-span-1 h-96 bg-gray-300 rounded-4xl"></div>
          <div className="col-span-1 h-96 bg-gray-300 rounded-4xl"></div>
          <div className="col-span-2 h-96 bg-gray-300 rounded-4xl"></div>
        </div>

        {/* Infos de la box */}
        <div className="w-[34%]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="!text-[36px] leading-[36px] text-[#1B1B1B]">{box.name}</h2>
              <p className="!text-[18px] text-[#666] mt-1">{box.category}</p>
              <p className="!text-[18px] mt-2">{box?.base_price ? Number(box.base_price).toFixed(2).replace('.', ',') : ''} €</p>
            </div>
            <img src={favorite} alt="favorite" className="w-8 h-8 ml-4 cursor-pointer select-none" />
          </div>
          <p className="mt-14 text-[#333] text-justify font-normal">
            {box.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
          </p>

          {/* Boutons */}
          <div className="mt-4 flex flex-col gap-5">
            <button
              onClick={() => addToCart(box)}
              className="neulis text-[15px] border border-black py-2 rounded-xl hover:text-loomilightpink hover:border-loomilightpink hover:cursor-pointer transition-all duration-300"
            >
              Ajouter au panier
            </button>
            <button className="neulis text-[15px] bg-[#DB3D88] text-white py-2 rounded-xl hover:bg-[#b83272] hover:cursor-pointer transition">
              S’abonner
            </button>
          </div>

          {/* Accordéon infos */}
          <div className="mt-13 text-sm">
            <div className="text-[16px] w-[90%] border-b my-7 pb-2 tracking-[0.5px]">Détails du produit <span className="float-right mr-3">+</span></div>
            <div className="text-[16px] w-[90%] border-b my-7 pb-2 tracking-[0.5px]">Avis client <span className="float-right mr-3">+</span></div>
            <div className="text-[16px] w-[90%] border-b my-7 pb-2 tracking-[0.5px]">Livraison et retour <span className="float-right mr-3">+</span></div>
          </div>
        </div>
      </div>

      </div>

        {/* Suggestions */}
        {relatedBoxes.length > 0 && (
          <div className="p-[50px] mx-auto">
            <h2 className="text-2xl text-center mb-12">Vous aimerez aussi !</h2>
            <div className="flex justify-between gap-4 w-full">
              {relatedBoxes.map((related) => (
                <div onClick={() => navigate(`/boxes/${related.id}`)} className="col-span-1 w-full h-96 bg-gray-300 rounded-4xl">
                  {/* <img
                    src={`/images/${related.image}`}
                    alt={related.name}
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                  /> */}
                  </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default BoxPage;
