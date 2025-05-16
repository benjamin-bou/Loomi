import React from "react";
import MainHeader from "./components/MainHeader";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import BoxCarousel from "./components/BoxCarousel";

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Navbar */}
      <MainHeader />

      {/* Hero section */}
      <section className="bg-loomibeige">
      <div className="bg-[#D9D9D9] text-white py-16 px-6 rounded-[30px] m-4 h-[635px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
          <img src={logo_phase_1} alt="Logo" className="w-1/2" />

        </div>
      </div>
      </section>

      {/* Abonnement */}
      <BoxCarousel />

    </div>
  );
}

export default App;
