import React from "react";

export default function BoxCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="bg-white rounded-4xl flex flex-col items-center text-center w-[350px] h-[380px] min-w-[280px] max-w-[280px] relative">
        {/* Skeleton pour le bouton favori */}
        <div className="absolute top-5 right-5 z-10">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Skeleton pour l'image avec effet shimmer */}
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-4xl"></div>
      </div>
      
      {/* Skeleton pour les informations */}
      <div className="flex flex-col gap-2">
        {/* Titre */}
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4"></div>
        {/* Catégorie */}
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/2"></div>
        {/* Prix */}
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/3"></div>
      </div>
    </div>
  );
}
