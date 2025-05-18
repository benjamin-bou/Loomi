import React from "react";
import MainHeader from "./components/MainHeader";
import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import BoxCarousel from "./components/BoxCarousel";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import { useEffect, useState } from "react";
import { fetchData } from "./api";
import { useNavigate } from "react-router-dom";
import SubscriptionsSection from "./components/SubscriptionsSection";

function App() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchData(`/boxes`)
        .then(data => setBoxes(data))
        .catch(err => console.error(err));
    }, []);

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

        {/* Boxes */}
        <div className="flex flex-col mt-16 px-[50px]">
          <h2 className="text-left mb-8">Nos Box</h2>
          <BoxCarousel 
            boxes={boxes}
            slidesToShow={3}
          />
          <button onClick={() => navigate('/boxes')} className="px-6 py-2 border border-black rounded-xl bg-[#fcf5ef] text-black text-lg hover:bg-black hover:text-white hover:cursor-pointer transition mt-15 mx-auto w-50">
            Découvrir
          </button>
        </div>
        <SubscriptionsSection/>
      </section>

    {/* Newsletter */}
    <Newsletter />
    {/* Footer */}
    <Footer />
    </div>
  );
}

export default App;
