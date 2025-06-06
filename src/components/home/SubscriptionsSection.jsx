import LoomiSteps from "../LoomiSteps";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import l_shape from "/images/picto/l_shape.svg";
import o_shape from "/images/picto/o_shape.svg";

const SubscriptionsSection = () => {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setFontSize(8);  // Mobile
      } else if (width < 1024) {
        setFontSize(12); // Tablet
      } else {
        setFontSize(16); // Desktop
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);
  const abonnements = [
    {
      title: "ABONNEMENT MENSUEL",
      description:
        "Recevez une boîte du catalogue tous les mois afin de découvrir une nouvelle passion",
    },
    {
      title: "ABONNEMENT MYSTÈRE",
      description:
        "Recevez une boîte mystère tous les 3 mois (cette boîte ne figurera aux autres box découvertes ensuite.)",
    },
  ];

  // Génération dynamique du texte pour le cercle
  const circleText = "BOX CRÉATIVE • ";
  const repeatTextToLength = (str, minLength) => {
    let result = "";
    while (result.length < minLength) {
      result += str;
    }
    return result;
  };
  const textForCircle = repeatTextToLength(circleText, 500);

  return (
    <>      <section className="relative block mt-[10vh] md:mt-[15vh] min-h-[180vw] md:min-h-[145vw] overflow-hidden flex-col items-center justify-center">
        {/* Cercle rose */}
        <div
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 h-[90%] aspect-square bg-loomilightpink rounded-full z-0"
          style={{ minWidth: "300px" }}
        />

        {/* Texte autour du cercle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] aspect-square z-10 pointer-events-none animate-spin-slow"
        >
          <svg viewBox="0 0 1200 1200" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M600,600 m-500,0 a500,500 0 1,1 1000,0 a500,500 0 1,1 -1000,0"
                fill="none"
              />
            </defs>            <text fill="#F4AECC" fontSize={fontSize} letterSpacing="2">
              <textPath href="#circlePath" startOffset="0">
                {textForCircle}
              </textPath>
            </text>
          </svg>
        </div>        {/* ✅ Contenu principal décalé vers le bas */}
        <div className="relative z-20 mt-[30vw] md:mt-[20vw] mx-8 md:mx-[50px] w-[calc(100%-4rem)] md:w-[calc(100%-100px)] pb-[50px] md:pb-[100px] text-center">
          <h2 className="pt-16 md:pt-32 lg:pt-0 font-normal text-white mb-8 md:mb-30 text-3xl md:text-5xl lg:!text-[60px]">Nos abonnements</h2>          <div className="relative flex flex-col lg:flex-row justify-around items-stretch gap-6 md:gap-10 lg:gap-[calc(11vw)] mb-20 md:mb-40 mx-0 xl:mx-[calc(10vw-50px)]">
            {/* SVG l_shape gauche - collé à la carte mensuelle */}
            <img
              src={l_shape}
              alt="L shape decoration"
              className="hidden lg:block absolute -left-16 top-3/4 -translate-y-1/2 w-[153px] h-[411px] z-50"
            />            {/* SVG o_shape droite - collé à la carte mystère */}
            <img
              src={o_shape}
              alt="O shape decoration"
              className="hidden lg:block absolute -right-10 top-2/3 w-[160px] h-[147px] z-50"
            />{/* Cartes abonnements */}
            <div className="relative z-20 flex-1 flex flex-col items-center">
              <div className="bg-white text-black rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-md flex flex-col items-center justify-between w-full gap-6 md:gap-10 h-[500px] md:h-[650px]">
                <h3 className="text-center text-2xl md:!text-4xl">{abonnements[0].title}</h3>
                <p className="text-center text-base md:text-lg px-2">{abonnements[0].description}</p>
                <div className="w-4/5 lg:w-80 h-40 md:h-60 bg-gray-300 rounded-3xl md:rounded-4xl" />
                <button 
                onClick={() => navigate("/subscriptions")}
                className="px-4 md:px-6 py-2 border border-black rounded-xl text-black text-lg md:text-xl hover:cursor-pointer transition w-4/5 lg:w-60 h-12 md:h-15">
                  Découvrir
                </button>
              </div>
            </div>
            <div className="relative z-20 flex-1 flex flex-col items-center">
              <div className="bg-white text-black rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-md flex flex-col items-center justify-between w-full gap-6 md:gap-10 h-[500px] md:h-[650px]">
                <h3 className="text-center text-2xl md:!text-4xl">{abonnements[1].title}</h3>
                <p className="text-center text-base md:text-lg px-2">{abonnements[1].description}</p>
                <div className="w-4/5 lg:w-80 h-40 md:h-60 bg-gray-300 rounded-3xl md:rounded-4xl" />
                <button 
                onClick={() => navigate("/subscriptions")}
                className="px-4 md:px-6 py-2 border border-black rounded-xl text-black text-lg md:text-xl hover:cursor-pointer transition w-4/5 lg:w-60 h-12 md:h-15">
                  Découvrir
                </button>
              </div>
            </div>
          </div>          {/* Étapes */}
          <LoomiSteps textColor="white" />{/* Section carte cadeaux */}
          <div className="relative z-20 w-full py-10 md:py-20">
            <div className="flex flex-col md:flex-row justify-around items-center mx-auto z-10 relative gap-6 md:gap-10">
              {/* Bloc gauche */}
              <div className="relative bg-[#D9D9D9] rounded-[30px] md:rounded-[40px] w-full h-[300px] md:h-[500px] flex justify-center items-start pt-8 md:pt-12 mb-4 md:mb-0 shadow-lg overflow-hidden">
                <img
                  src="https://dummyimage.com/400x300/D9D9D9/D9D9D9&text="
                  alt="Carte cadeaux"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-[30px] md:rounded-[40px]"
                />
                <h2 className="relative !text-2xl md:text-4xl font-semibold text-black z-10 ml-4 md:ml-6 mt-4 md:mt-6">
                  Carte cadeaux
                </h2>
              </div>

              {/* Bloc droit */}
              <div className="bg-white rounded-[30px] md:rounded-[40px] w-full h-full md:h-[500px] p-6 md:p-8 flex flex-col md:justify-end shadow-lg">
                <div>
                  <h2 className="!text-xl md:text-3xl font-semibold mb-3 md:mb-4">UN CADEAU ORIGINAL ?</h2>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                    Vous cherchez une idée originale et pleine de surprises ? Faites plaisir à vos proches avec notre carte cadeau !
                  </p>
                  <button 
                  onClick={() => navigate("/gift-cards")}
                  className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white font-medium py-2 px-4 md:px-6 rounded-full text-sm md:text-base">
                    Découvrir
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default SubscriptionsSection;
