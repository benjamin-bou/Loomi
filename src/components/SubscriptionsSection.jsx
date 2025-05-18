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
        <section className="relative h-[145vw] flex items-center overflow-hidden flex-col">
        {/* Cercle rose */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vw] aspect-square bg-loomilightpink rounded-full z-0"
          style={{ minWidth: "900px" }}
        />
      
        {/* Texte autour du cercle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[165vw] aspect-square z-10 pointer-events-none animate-spin-slow"
          style={{ minWidth: "900px" }}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M500,500 m-400,0 a400,400 0 1,1 800,0 a400,400 0 1,1 -800,0"
                fill="none"
              />
            </defs>
            <text fill="#F4AECC" fontSize="10" letterSpacing="2">
              <textPath href="#circlePath" startOffset="0">
                {textForCircle}
              </textPath>
            </text>
          </svg>
        </div>
  
        {/* Contenu principal */}
        <div className="relative z-20 mx-auto px-4 py-[20vw] text-center">
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
          <div className="flex flex-wrap justify-between gap-8">
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
        </div>
      </section>
    );
  };
  
  export default SubscriptionsSection;