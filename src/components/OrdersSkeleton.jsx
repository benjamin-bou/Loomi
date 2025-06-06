import React from "react";
import OrderCardSkeleton from "./OrderCardSkeleton";

export default function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:!gap-8 md:!gap-10 relative z-10 w-full sm:!w-[95%] md:!w-[90%] lg:!w-[85%]">
      {/* Afficher 3 cartes de commande skeleton */}
      {Array(3).fill(0).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}
