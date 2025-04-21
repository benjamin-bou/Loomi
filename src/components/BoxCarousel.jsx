import React from "react";

const items = [1, 2, 3, 4, 5, 6];

function BoxCarousel() {
  return (
    <div className="px-6 py-12">
      <h2 className="text-4xl font-semibold mb-8">Nos box</h2>


      <div className="flex justify-center mt-8">
        <button className="border border-black px-6 py-2 rounded-full font-medium">
          Découvrir
        </button>
      </div>
    </div>
  );
}

export default BoxCarousel;
