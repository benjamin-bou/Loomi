import React from "react";

export default function OrderStep1Skeleton() {
  return (
    <div className="flex flex-col py-15 bg-[#FFF7F0] items-center gap-15">
      <div className="flex items-center justify-center">
        {/* Bloc login à gauche skeleton */}
        <div className="bg-white rounded-l-2xl shadow-md p-8 w-full max-w-md flex flex-col justify-center">
          {/* Titre skeleton */}
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-1/2 mx-auto mb-6"></div>
          
          {/* Champs de login skeleton */}
          <div className="space-y-4">
            <div className="h-10 min-w-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
          </div>
          
          {/* Liens skeleton */}
          <div className="flex justify-between mt-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-20"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-24"></div>
          </div>
        </div>

        {/* Trait vertical */}
        <div className="h-[500px] w-[2px] bg-gray-200 mx-0 md:mx-8" />

        {/* Bloc informations de livraison à droite skeleton */}
        <div className="bg-white rounded-r-2xl shadow-md p-8 w-full max-w-md flex flex-col justify-center">
          {/* Titre skeleton */}
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4 mx-auto mb-6"></div>
          
          {/* Champs de livraison skeleton */}
          <div className="space-y-4 min-w-80">
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Bouton continuer skeleton */}
      <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl w-64"></div>
    </div>
  );
}
