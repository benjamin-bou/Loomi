import React from "react";

export default function LoomiHistorySection() {
  return (
    <div className="min-h-screen bg-loomibeige flex items-center justify-center mx-[50px]">
      <div className="bg-white rounded-[48px] w-[95vw] max-w-[1800px] max-h-[1000px] h-[90vh] p-12 flex flex-col md:flex-row gap-20 relative overflow-hidden shadow-lg">
        {/* Partie gauche - Texte */}
        <div className="flex-1 flex flex-col justify-start">
          <h1 className="mb-16">
            Notre histoire
          </h1>
          <div>
            <h2 className="mb-4 ">
              Lorem ipsum
            </h2>
            <p className="text-lg mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
              Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
              Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        {/* Partie droite - Image et forme rose */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Bloc carré gris arrondi */}
          <div className="w-full h-full bg-[#dbdbdb] rounded-[56px] relative z-10"></div>
          {/* Forme rose */}
          <div className="absolute left-1/3 bottom-[10px] z-20 w-[100vw] h-[20vw] max-h-[350px]" style={{ transform: "translateX(-60%)" }}>
            <svg width="100%" height="100%" viewBox="0 0 340 290" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M340 175C340 248 183.82 307.015 102.19 276.07C20.5596 245.125 1.23299e-05 208.963 1.23299e-05 135.5C1.23299e-05 62.0372 89.6024 1.70745 170 1.70745C250.398 1.70745 340 102 340 175Z" fill="#E62B88"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
