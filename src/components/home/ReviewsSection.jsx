import React from "react";

// Utilitaire pour générer des étoiles avec couleur personnalisée et note possible en demi (ex: 4.5)
const Stars = ({ rating, color = "#E62B88", size = 40 }) => {
  return (
    <div className="flex space-x-2">
      {[1,2,3,4,5].map((i) => {
        if (rating >= i) {
          // Pleine étoile
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color}>
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z"/>
            </svg>
          );
        }
        if (rating > i - 1 && rating < i) {
          // Demi-étoile
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24">
              <defs>
                <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor={color} />
                  <stop offset="50%" stopColor={color} stopOpacity="0.33" />
                </linearGradient>
              </defs>
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" fill={`url(#half-${i})`} />
            </svg>
          );
        }
        // Étoile grise (même couleur que color mais opacité 33%)
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" fill={color} fillOpacity="0.33"/>
          </svg>
        );
      })}
    </div>
  );
};

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
    <section className="pt-12 mb-2 px-2">
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
