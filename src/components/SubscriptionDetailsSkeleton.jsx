export default function SubscriptionDetailsSkeleton() {
  return (
    <div className="bg-[#FFF7F0] min-h-screen animate-pulse">
      <div className="w-[calc(100vw-100px)] mx-[50px] py-[50px]">
        {/* Route skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-64"></div>
        </div>

        {/* Détails principaux */}
        <div className="flex flex-col md:flex-row justify-between mt-4 w-full">
          {/* Images skeleton */}
          <div className="grid grid-cols-2 gap-6 md:w-[58%]">
            <div className="col-span-1 h-96 bg-gray-300 rounded-4xl"></div>
            <div className="col-span-1 h-96 bg-gray-300 rounded-4xl"></div>
            <div className="col-span-2 h-96 bg-gray-300 rounded-4xl"></div>
          </div>

          {/* Infos de l'abonnement skeleton */}
          <div className="md:w-[34%]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {/* Titre skeleton */}
                <div className="h-9 bg-gray-300 rounded w-64 mb-1"></div>
                {/* Type skeleton */}
                <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                {/* Prix skeleton */}
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
            </div>

            {/* Description skeleton */}
            <div className="mt-14 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Boutons skeleton */}
            <div className="mt-4 flex flex-col gap-5">
              <div className="h-10 bg-gray-300 rounded-xl"></div>
              <div className="h-10 bg-gray-300 rounded-xl"></div>
            </div>

            {/* Accordéon skeleton */}
            <div className="mt-13 text-sm">
              {[1, 2, 3].map((item, idx) => (
                <div key={idx} className="w-[90%] border-b my-7 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions skeleton */}
      <div className="p-[50px] mx-auto">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-12"></div>
        <div className="flex justify-between gap-4 w-full">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="col-span-1 w-full h-96 bg-gray-300 rounded-4xl"></div>
          ))}
        </div>
      </div>

      {/* Newsletter skeleton */}
      <div className="bg-gray-200 h-64"></div>
    </div>
  );
}
