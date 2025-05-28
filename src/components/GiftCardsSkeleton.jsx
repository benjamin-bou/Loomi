import React from "react";

export default function GiftCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Première carte skeleton */}
      <div className="bg-white rounded-[40px] flex flex-col items-center justify-between px-8 py-12 min-h-[320px]">
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4 mb-4"></div>
        <div className="space-y-2 mb-6 w-full">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-2/3 mx-auto"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl w-full max-w-xs mt-2"></div>
      </div>

      {/* Deuxième carte skeleton */}
      <div className="bg-white rounded-[40px] flex flex-col items-center justify-between px-8 py-12 min-h-[320px]">
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4 mb-4"></div>
        <div className="space-y-2 mb-6 w-full">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-2/3 mx-auto"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl w-full max-w-xs mt-2"></div>
      </div>

      {/* Troisième carte skeleton (plus large) */}
      <div className="relative md:col-span-2 w-full">
        <div className="bg-white rounded-[40px] flex flex-col items-center justify-between px-8 py-12 min-h-[320px] relative z-20">
          <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-2/3 mb-4"></div>
          <div className="space-y-2 mb-6 w-full max-w-md">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-full"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded w-3/4 mx-auto"></div>
          </div>
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl w-full max-w-xs mt-2"></div>
        </div>
      </div>
    </div>
  );
}
