import React from "react";

export default function BoxCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8">
      <div className="bg-white rounded-3xl md:rounded-4xl flex flex-col items-center text-center w-[280px] md:w-[320px] lg:w-[350px] h-[300px] md:h-[340px] lg:h-[380px] relative">
        {/* Skeleton pour le bouton favori */}
        <div className="absolute top-3 right-3 md:top-4 lg:top-5 md:right-4 lg:right-5 z-10">
          <div className="w-6 h-6 md:w-7 lg:w-8 md:h-7 lg:h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Skeleton pour l'image avec effet shimmer */}
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-3xl md:rounded-4xl"></div>
      </div>
      
      {/* Skeleton pour les informations */}
      <div className="flex flex-col gap-1 md:gap-2">
        {/* Titre */}
        <div className="h-5 md:h-6 lg:h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4"></div>
        {/* Catégorie */}
        <div className="h-3 md:h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/2"></div>
        {/* Prix */}
        <div className="h-3 md:h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/3"></div>
      </div>
    </div>
  );
}
