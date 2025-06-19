export default function SubscriptionSkeleton() {
  return (
    <div className="bg-loomibeige relative px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 font-montserrat overflow-hidden pb-20 animate-pulse">
      {/* SVG l_shape en haut à droite - skeleton */}
      <div 
        className="absolute -right-5 sm:-right-8 md:-right-10 top-[2vw] z-0 pointer-events-none w-[25vw] sm:w-[30vw] h-[25vw] sm:h-[30vw] max-w-[300px] sm:max-w-[400px] md:max-w-[450px] max-h-[300px] sm:max-h-[400px] md:max-h-[450px] bg-gray-200 rounded-lg"
        style={{ transform: "rotate(-35deg)" }}
      />

      {/* Titre skeleton */}
      <div className="relative z-10 mb-4 sm:mb-6 md:mb-8 mx-4 sm:mx-8 md:mx-[50px]">
        <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gray-300 rounded-lg w-64 sm:w-80 md:w-96"></div>
      </div>

      {/* Carte d'abonnement skeleton */}
      <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-[50px] bg-white rounded-[2rem] px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 shadow-sm min-h-[320px] sm:min-h-[380px] md:min-h-[420px] relative">
        {/* Image produit skeleton */}
        <div className="bg-gray-200 rounded-4xl w-full max-w-[300px] h-[200px] sm:h-[250px] md:h-[300px] lg:w-[300px] lg:h-[300px] min-w-[120px] flex-shrink-0 mx-auto lg:mx-0" />

        {/* Infos commande skeleton */}
        <div className="flex flex-col w-full gap-4 justify-between">
          <div>
            {/* Titre skeleton */}
            <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded w-48 sm:w-64 mb-2"></div>
            
            {/* Informations skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 sm:w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-28 sm:w-36"></div>
              <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20 sm:w-28"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-2">
            {/* Informations d'abonnement skeleton */}
            <div className="min-w-[180px]">
              <div className="h-5 bg-gray-300 rounded w-36 sm:w-44 mb-1"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-40 sm:w-48"></div>
                <div className="h-3 bg-gray-200 rounded w-32 sm:w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-36 sm:w-44"></div>
              </div>
            </div>

            {/* Paiement skeleton */}
            <div className="min-w-[180px]">
              <div className="h-5 bg-gray-300 rounded w-24 sm:w-32 mb-1"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-32 sm:w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-28 sm:w-36"></div>
                <div className="h-3 bg-gray-200 rounded w-24 sm:w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-36 sm:w-44"></div>
                <div className="h-3 bg-gray-200 rounded w-20 sm:w-28"></div>
                <div className="h-3 bg-gray-200 rounded w-28 sm:w-36"></div>
              </div>
            </div>
          </div>

          {/* BOUTON skeleton */}
          <div className="flex flex-1 items-end justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-8">
            <div className="h-10 sm:h-12 bg-gray-300 rounded-lg w-32 sm:w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
