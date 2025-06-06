import React from "react";
import o_shape from "/images/picto/o_shape.svg";

export default function LoomiHistorySection() {
  return (
    <div className="bg-loomibeige flex items-center justify-center mx-8 lg:mx-[50px]">
      <div className="bg-white rounded-[24px] md:rounded-[36px] lg:rounded-[48px] w-[95vw] max-w-[1800px] min-h-[500px] md:min-h-[600px] lg:max-h-[1000px] lg:h-[90vh] p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 relative overflow-hidden shadow-lg">        {/* Partie gauche - Texte */}
        <div className="flex-1 flex flex-col justify-start">
          <h1 className="mb-6 md:mb-10 lg:mb-16 text-2xl md:text-4xl lg:text-5xl font-bold">
            Notre histoire
          </h1>
          <div>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl font-semibold">
              Lorem ipsum
            </h2>
            <p className="text-sm md:text-base lg:text-lg mb-2 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br className="hidden md:block" />
              <span className="md:hidden"> </span>Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.<br className="hidden md:block" />
              <span className="md:hidden"> </span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br className="hidden md:block" />
              <span className="md:hidden"> </span>Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>        {/* Partie droite - Image et forme rose */}
        <div className="flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
          {/* Bloc carré gris arrondi */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-full bg-[#dbdbdb] rounded-[32px] md:rounded-[44px] lg:rounded-[56px] relative z-10"></div>          {/* Forme rose avec o_shape */}
          <div className="absolute left-1/4 md:left-1/3 bottom-[5px] md:bottom-[10px] z-20 w-[80vw] md:w-[100vw] h-[15vw] md:h-[20vw] max-h-[200px] md:max-h-[350px] -translate-x-1/2 md:-translate-x-[60%]">
            <img 
              src={o_shape} 
              alt="O shape decoration" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
