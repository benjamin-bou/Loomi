import React from "react";
import OrderCardSkeleton from "./OrderCardSkeleton";

export default function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-10 relative z-10 w-[85%]">
      {/* Afficher 3 cartes de commande skeleton */}
      {Array(3).fill(0).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}
