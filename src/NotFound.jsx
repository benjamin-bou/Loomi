import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF7F0] text-center px-6 py-12">
      <h1 className="text-7xl font-bold text-[#FA5D5D] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-[#5B2B95] mb-4">
        Oups ! Cette page est introuvable.
      </h2>
      <p className="text-[#5B2B95] mb-8 max-w-md">
        Il semble que vous soyez tombé sur une page qui n'existe pas. Revenez à l'accueil pour découvrir nos boîtes !
      </p>
      <Link to="/" className="bg-[#FA5D5D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e14d4d] transition">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFound;
