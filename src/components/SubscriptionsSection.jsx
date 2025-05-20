const SubscriptionsSection = () => {
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

  const etapes = [
    { label: "Je m’abonne", icon: "📝" },
    { label: "Je reçois ma box", icon: "📦" },
    { label: "Je découvre", icon: "🔍" },
    { label: "Je crée", icon: "🎨" },
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
    <>
      <section className="relative block mt-[15vh] min-h-[145vw] overflow-hidden flex-col items-center justify-center">
        {/* Cercle rose */}
        <div
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 h-[90%] aspect-square bg-loomilightpink rounded-full z-0"
          style={{ minWidth: "900px" }}
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
            </defs>
            <text fill="#F4AECC" fontSize="14" letterSpacing="2">
              <textPath href="#circlePath" startOffset="0">
                {textForCircle}
              </textPath>
            </text>
          </svg>
        </div>

        {/* ✅ Contenu principal décalé vers le bas */}
        <div className="relative z-20 mt-[20vw] mx-[50px] w-[calc(100%-100px)] pb-[100px] text-center">
          <h2 className="font-normal text-white mb-14 text-3xl">Nos abonnements</h2>

          {/* Cartes abonnements */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 mb-30">
            {abonnements.map((abo, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-3xl p-10 shadow-md flex flex-col items-center justify-between w-full max-w-md mx-auto gap-10"
              >
                <h3 className="text-center text-lg">{abo.title}</h3>
                <p className="text-center text-sm">{abo.description}</p>
                <div className="w-60 h-40 bg-gray-300 rounded-3xl" />
                <button className="px-6 py-2 border border-black rounded-xl text-black text-lg hover:bg-black hover:text-white hover:cursor-pointer transition w-40">
                  Découvrir
                </button>
              </div>
            ))}
          </div>

          {/* Étapes */}
          <h2 className="text-white mb-10 text-2xl">Comment ça marche ?</h2>
          <div className="flex flex-wrap justify-between gap-8 mb-20 max-w-[1800px] mx-auto">
            {etapes.map((etape, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-white text-center w-32"
              >
                <div className="w-40 h-40 bg-gray-300 rounded-3xl mb-2 flex items-center justify-center text-2xl">
                  {etape.icon}
                </div>
                <p className="text-sm leading-snug">{etape.label}</p>
              </div>
            ))}
          </div>

          {/* Section carte cadeaux */}
          <div className="relative z-20 w-full px-4 py-20">
            <div className="flex flex-col md:flex-row justify-around items-center mx-auto z-10 relative gap-10">
              {/* Bloc gauche */}
              <div className="relative bg-[#D9D9D9] rounded-[40px] w-full h-[500px] flex justify-center items-start pt-12 mb-8 md:mb-0 shadow-lg overflow-hidden">
                <img
                  src="https://dummyimage.com/400x300/D9D9D9/D9D9D9&text="
                  alt="Carte cadeaux"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-[40px]"
                />
                <h2 className="relative text-4xl font-semibold text-black z-10 ml-6 mt-6">
                  Carte cadeaux
                </h2>
              </div>

              {/* Bloc droit */}
              <div className="bg-white rounded-[40px] w-full h-[500px] p-8 flex flex-col justify-end shadow-lg">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">UN CADEAU ORIGINAL ?</h2>
                  <p className="text-gray-700 mb-6">
                    Vous cherchez une idée originale et pleine de surprises ? Faites plaisir à vos proches avec notre carte cadeau !
                  </p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-full">
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
