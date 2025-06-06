import logo_phase_1 from "/images/picto/logo_phase_1.svg";
import BoxCarousel from "../components/home/BoxCarousel";
import Newsletter from "../components/Newsletter";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";
import SubscriptionsSection from "../components/home/SubscriptionsSection";
import LoomiHistorySection from "../components/home/LoomiHistorySection";
import ReviewsSection from "../components/home/ReviewsSection";

function App() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchData(`/boxes`)
        .then(data => setBoxes(data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className="flex flex-col bg-loomibeige">      {/* Hero section */}
      <section>
        <div className="bg-[#D9D9D9] text-white py-8 md:py-16 px-8 md:px-6 rounded-[20px] md:rounded-[30px] m-2 md:m-4 h-[400px] md:h-[635px]">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-8">
              <img src={logo_phase_1} alt="Logo" className="w-3/4 md:w-1/2 max-w-[300px]" />

          </div>
        </div>

        {/* Boxes */}
        <div className="flex flex-col mt-8 md:mt-16 px-8 md:px-[50px]">
          <h2 className="text-left mb-4 md:mb-8 text-2xl md:text-3xl">Nos Box</h2>
          <BoxCarousel 
            boxes={boxes}
            slidesToShow={3}
          />
          <button onClick={() => navigate('/boxes')} className="px-8 md:px-6 py-2 border border-black rounded-xl text-black text-base md:text-lg hover:cursor-pointer transition mt-15 mx-auto w-40 md:w-50">
            Découvrir
          </button>
        </div>
        <SubscriptionsSection/>
      </section>
      <LoomiHistorySection />
      <div className="px-4">
      <ReviewsSection />
      </div>

    {/* Newsletter */}
    <Newsletter />
    </div>
  );
}

export default App;
