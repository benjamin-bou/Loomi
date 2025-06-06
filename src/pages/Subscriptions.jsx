import { useEffect } from "react";
import LoomiSteps from "../components/LoomiSteps";
import ReviewsSection from "../components/home/ReviewsSection";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api";
import l_shape from "/images/picto/l_shape.svg";
import double_o_shape from "/images/picto/double_o_shape.svg";

export default function Subscriptions() {
  const navigate = useNavigate();
  const abonnements = [
    {
      title: "ABONNEMENT MENSUEL",
      description:
        "Recevez une boîte du catalogue tous les mois afin de découvrir une nouvelle passion",
      id: 1,
    },
    {
      title: "ABONNEMENT MYSTÈRE",
      description:
        "Recevez une boîte mystère tous les 3 mois (cette boîte ne figurera aux autres box découvertes ensuite.)",
      id: 2,
    },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await fetchData("/subscriptions");
      if (!data) {
        console.error("Erreur lors du chargement des abonnements.");
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="bg-[#FFF7F0] min-h-screen pb-10">
      <div className="flex flex-col items-center justify-center mx-[50px] mb-32">
        <h2 className="mt-10 mb-20 text-start self-start">Nos abonnements</h2>        
        {/* ABONNEMENT MENSUEL */}
        <div className="relative w-full max-w-6xl mb-30 flex">
          {/* SVG l_shape à gauche */}
          <img 
            src={l_shape} 
            alt="Forme décorative gauche" 
            className="hidden lg:block absolute -left-30 -bottom-30 w-[153px] h-[411px] z-50"
          />
          {/* Carte */}
          <div className="bg-white text-black rounded-4xl p-4 grid grid-cols-2 w-full z-20 gap-10">
            <div className="flex flex-col justify-center items-center">
              <h3 className="my-4 text-center">{abonnements[0].title}</h3>
              <article className="text-center w-4/5 mb-6">
                <p>Vous souhaitez profiter de Loomi chaque mois, en toute simplicité ?</p>
                <p>Optez pour notre abonnement mensuel.</p> <br/>
                <p>Recevez votre box directement chez vous, sans engagement, tous les mois, à la façon des chaque mois une nouvelle découverte.</p>
              </article>
              <div className="flex flex-col justify-center mb-2 gap-6">
                <p className="!text-3xl !font-medium">prix € / MOIS</p>
                <button onClick={() => navigate(`${abonnements[0].id}`)} className="px-4 py-2 border rounded-xl cursor-pointer">
                  S’abonner
                </button>
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded-2xl" />
            </div>
          </div>
        </div>        
        {/* ABONNEMENT MYSTÈRE */}
        <div className="relative w-full max-w-6xl mb-30 flex">
          {/* SVG double_o_shape à droite */}
          <img 
            src={double_o_shape} 
            alt="Forme décorative droite" 
            className="hidden lg:block absolute right-0 bottom-0 w-[300px] h-[300px] z-50 transform translate-y-1/2"
          />
          {/* Carte */}
          <div className="bg-white text-black rounded-4xl p-4 grid grid-cols-2 w-full z-20 gap-10">
            <div className="flex flex-col justify-center items-center">
              <h3 className="my-4 text-center">{abonnements[1].title}</h3>
              <article className="text-center w-4/5 mb-6">
                <p>Recevoir une boîte mystère tous les 3 mois (cette boîte ne figurera aux autres box découvertes ensuite.)</p>
                <p>Aimez les surprises et l&apos;inattendu ? Découvrez notre Box Mystère : une expérience unique à chaque envoi.</p>
                <br />
                <p>Recevez une surprise supplémentaire chaque mois. Laissez la curiosité faire le premier pas.</p>
              </article>
              <div className="flex flex-col justify-center mb-2 gap-6">
                <p className="!text-3xl !font-medium">33,21 € / 3 MOIS</p>
                <button onClick={() => navigate(`${abonnements[1].id}`)} className="px-4 py-2 border rounded-xl cursor-pointer">
                  S’abonner
                </button>
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded-2xl" />
            </div>
          </div>
        </div>
        {/* Étapes */}
        <LoomiSteps textColor={"#000000"}/>
        {/* Avis */}
        <ReviewsSection />
      </div>
    </div>
  );
}
