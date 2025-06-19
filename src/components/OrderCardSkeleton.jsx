import React from "react";

export default function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl sm:!rounded-[2rem] px-4 sm:!px-6 md:!px-8 py-4 sm:!py-6 md:!py-8 flex flex-col md:flex-row gap-4 sm:!gap-6 md:!gap-8 shadow-sm">
      {/* Image produit skeleton */}
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl w-[100px] h-[100px] sm:!w-[120px] sm:!h-[120px] min-w-[100px] sm:!min-w-[120px] flex-shrink-0 mx-auto md:mx-0" />

      {/* Infos commande skeleton */}
      <div className="flex flex-col w-full gap-2">
        {/* Titre et numéro de commande */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 sm:!mb-3">
          <div className="h-5 sm:!h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-48 sm:!w-64 mx-auto md:mx-0"></div>
        </div>        
        {/* Date et statut */}
        <div className="space-y-1 mb-2 sm:!mb-4">
          <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-40 sm:!w-48 mx-auto md:mx-0"></div>
          <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-44 sm:!w-56 mx-auto md:mx-0"></div>
          <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-42 sm:!w-52 mx-auto md:mx-0"></div>
        </div>

        {/* Bloc Livraison + Paiement */}
        <div className="flex flex-col md:flex-row gap-4 sm:!gap-6 md:!gap-8 mt-2">
          {/* Livraison skeleton */}
          <div className="flex-1 min-w-0 md:min-w-[180px]">
            <div className="h-4 sm:!h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-28 sm:!w-32 mb-1 mx-auto md:mx-0"></div>
            <div className="space-y-1">
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-32 sm:!w-40 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-36 sm:!w-44 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-28 sm:!w-36 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-16 sm:!w-20 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-20 sm:!w-28 mx-auto md:mx-0"></div>
            </div>
          </div>
          
          {/* Paiement skeleton */}
          <div className="flex-1 min-w-0 md:min-w-[180px]">
            <div className="h-4 sm:!h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-16 sm:!w-20 mb-1 mx-auto md:mx-0"></div>
            <div className="space-y-1">
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-40 sm:!w-48 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-32 sm:!w-40 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-36 sm:!w-44 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-28 sm:!w-36 mx-auto md:mx-0"></div>
              <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-16 sm:!w-20 mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>

        {/* Contenu de la commande skeleton */}
        <div className="mt-3 sm:!mt-4 mb-2">          <div className="h-4 sm:!h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-32 sm:!w-40 mb-1 mx-auto md:mx-0"></div>
          <div className="space-y-1">
            <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-40 sm:!w-52 ml-4 mx-auto md:mx-0"></div>
            <div className="h-3 sm:!h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-36 sm:!w-48 ml-4 mx-auto md:mx-0"></div>
          </div>
        </div>

        {/* Montant total skeleton */}
        <div className="mt-3 sm:!mt-4 text-center md:text-right">
          <div className="h-5 sm:!h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-24 sm:!w-32 mx-auto md:ml-auto"></div>
        </div>
      </div>
    </div>
  );
}
