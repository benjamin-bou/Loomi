import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import MainHeader from "./components/MainHeader";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

function BoxesList() {
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData("/boxes")
      .then(data => {
        setBoxes(data);
        console.log("Boxes fetched:", data);
      })
      .catch(error => {
        console.error("Error fetching boxes:", error);
        setError("Une erreur est survenue lors du chargement des boîtes.");
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }

  if (!boxes) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#5B2B95]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <MainHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {boxes.map((box) => (
          <div key={box.id} className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
            {/* <img
              src={`/images/${box.image}`} // Ex: "kit-tricot.png"
              alt={`Boîte ${box.name}`}
              className="w-full max-w-[220px] rounded-xl mb-4"
            /> */}
            <img src="https://dummyimage.com/400x300/2EC4B6/ffffff&text=Boite" />

            <h2 className="text-2xl font-semibold text-[#5B2B95] mb-2">
              {box.name}
            </h2>
            <p className="text-[#5B2B95] mb-4">{box.description}</p>
            <button
              className="bg-[#FA5D5D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#e04d4d] transition"
              onClick={() => window.location.href = `/boxes/${box.id}`}
            >
              Voir le produit
            </button>
          </div>
        ))}
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default BoxesList;
