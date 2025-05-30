import React from "react";
import Stars from "../Stars";

const avis = [
  {
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
    author: "Lorem Ipsum",
  },
  {
    rating: 4.5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
    author: "Lorem Ipsum",
  },
  {
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
    author: "Lorem Ipsum",
  },
];

export default function AvisSection() {
  return (
    <section className="pt-12 mb-2 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <h2 className="text-center mb-4">
          Ils en parlent mieux que nous !
        </h2>
        {/* Sous-titre */}
        <p className="text-center mb-14 max-w-3/5 mx-auto">
          Découvrez les avis de nos clients et leurs retours sur nos box et tutos créatifs. Inspirez-vous de leurs expériences et partagez la vôtre !
        </p>

        {/* Cartes */}
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          {avis.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-[48px] p-10 flex flex-col items-start gap-8 w-full md:w-1/3 shadow-sm"
            >
              <Stars rating={a.rating} />
              <p className="text-lg font-[Montserrat]">{a.text}</p>
              <span className="font-[Montserrat] mt-auto">{a.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
