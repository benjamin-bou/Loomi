import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BoxPage() {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [relatedBoxes, setRelatedBoxes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/boxes/${id}`)
      .then(res => setBox(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/boxes")
      .then(res => setRelatedBoxes(res.data.filter(b => b.id !== parseInt(id))))
      .catch(err => console.error(err));
  }, [id]);

  if (!box) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#5B2B95]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-10 px-4">
      {/* Détails principaux */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          {/* <img
            src={`/images/${box.image}`}
            alt={box.name}
            className="rounded-2xl shadow-md w-full max-w-sm mx-auto"
          /> */}
          <img src="https://dummyimage.com/400x300/2EC4B6/ffffff&text=Boite" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#5B2B95] mb-4">{box.name}</h1>
          <p className="text-[#5B2B95] mb-6 text-lg">{box.description}</p>
          <p className="text-2xl font-semibold text-[#FA5D5D] mb-6">Prix : {box.base_price} €</p>
          <button className="bg-[#FA5D5D] text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-[#e14d4d] transition">
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Liste du contenu */}
      {box.items && box.items.length > 0 && (
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold text-[#5B2B95] mb-4">Ce que contient la boîte :</h2>
          <ul className="list-disc pl-6 text-[#5B2B95] text-lg space-y-2">
          {box.items.map((item) => (
              <li key={item.id}>
              {item.name} - {item.pivot.quantity} pièce(s)
              </li>
          ))}
          </ul>
      </div>
      )}

      {/* Avis clients */}
      {box.reviews && box.reviews.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold text-[#5B2B95] mb-6">Avis des utilisateurs</h2>
          <div className="space-y-6">
            {box.reviews.map((review, index) => (
              <div key={index} className="bg-[#F4EFFF] p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-[#5B2B95]">{review.username}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[#5B2B95]">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {relatedBoxes.length > 0 && (
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#5B2B95] mb-6">Vous aimerez aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedBoxes.slice(0, 3).map((related) => (
              <Link to={`/boxes/${related.id}`} key={related.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
                <img
                  src={`/images/${related.image}`}
                  alt={related.name}
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold text-[#5B2B95] mb-2">{related.name}</h3>
                <p className="text-[#FA5D5D] font-medium">{related.base_price} €</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoxPage;
