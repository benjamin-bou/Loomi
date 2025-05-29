import React from "react";

export default function BoxDetailsSkeleton() {
  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="w-[calc(100vw-100px)] mx-[50px] py-[50px]">
        {/* Route skeleton */}
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        
        {/* Détails principaux */}
        <div className="flex flex-col md:flex-row justify-between mt-4 w-full">
          {/* Images de la box skeleton */}
          <div className="grid grid-cols-2 gap-6 w-[58%]">
            <div className="col-span-1 h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-4xl"></div>
            <div className="col-span-1 h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-4xl"></div>
            <div className="col-span-2 h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-4xl"></div>
          </div>

          {/* Infos de la box skeleton */}
          <div className="w-[34%]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2 w-full">
                {/* Titre */}
                <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4"></div>
                {/* Catégorie */}
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/2"></div>
                {/* Prix */}
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/3"></div>
              </div>
              {/* Icône favori */}
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            
            {/* Description */}
            <div className="mt-14 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4"></div>
            </div>

            {/* Boutons skeleton */}
            <div className="mt-4 flex flex-col gap-5">
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl"></div>
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl"></div>
            </div>

            {/* Accordéon skeleton */}
            <div className="mt-13 space-y-7">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="w-[90%] border-b pb-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions skeleton */}
      <div className="p-[50px] mx-auto">
      <h2 className="text-2xl text-center mb-12">Vous aimerez aussi !</h2>
        <div className="flex justify-between gap-4 w-full">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-4xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
