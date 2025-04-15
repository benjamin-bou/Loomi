import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function BoxesList() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/boxes")
      .then(response => {
        setBoxes(response.data);
        console.log("Boxes fetched:", response.data);
      })
      .catch(error => {
        console.error("Error fetching boxes:", error);
      });
  }, []);

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <Navbar />

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
    </div>
  );
}

export default BoxesList;
