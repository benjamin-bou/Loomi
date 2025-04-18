// src/App.jsx
import React from "react";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div className="font-sans bg-[var(--loomibeige)] min-h-screen flex flex-col">
      {/* Navbar */}
      <MainHeader />

      {/* Hero section */}
      <section className="bg-[#2EC4B6] text-white py-16 px-6 rounded-[4rem] m-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Apprenez de nouvelles passions
            </h2>
            <button className="bg-[var(--loomilightpink)] text-white font-semibold text-lg px-6 py-3 rounded-full">
              Acheter une boîte
            </button>
          </div>
          <div className="flex-1">
            <img
              src="/images/kit-tricot.png"
              alt="Kit tricot"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Abonnement */}
      <section className="bg-[#FAD9BE] py-20 px-6 rounded-[4rem] m-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-4xl font-bold text-[#5B2B95] mb-4">Abonnez-vous</h3>
            <p className="text-[#5B2B95] text-lg mb-6">
              Recevez chaque mois une boîte pour découvrir une activité créative
            </p>
            <button className="bg-[#5B2B95] text-white font-semibold text-lg px-6 py-3 rounded-full mb-8">
              Voir les options
            </button>
            <img
              src="/images/kit-couture.png"
              alt="Kit couture"
              className="rounded-3xl shadow-xl"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/kit-savon.png"
              alt="Kit savon"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
