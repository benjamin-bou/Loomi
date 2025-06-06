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
    <div className="flex flex-col bg-loomibeige">      
      {/* Hero section */}
      <section>
        <div className="bg-[#D9D9D9] text-white py-6 xs:!py-8 sm:!py-12 md:!py-16 lg:!py-20 px-4 xs:!px-6 sm:!px-8 md:!px-6 rounded-xl xs:!rounded-2xl sm:!rounded-[20px] md:!rounded-[30px] m-2 xs:!m-3 sm:!m-4 h-[300px] xs:!h-[350px] sm:!h-[400px] md:!h-[500px] lg:!h-[635px]">
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 xs:!gap-4 sm:!gap-6 md:!gap-8">
            <img src={logo_phase_1} alt="Logo" className="w-4/5 xs:!w-3/4 sm:!w-2/3 md:!w-1/2 max-w-[200px] xs:!max-w-[240px] sm:!max-w-[280px] md:!max-w-[300px]" />
          </div>
        </div>

        {/* Boxes */}
        <div className="flex flex-col mt-6 xs:!mt-8 sm:!mt-12 md:!mt-16 px-4 xs:!px-6 sm:!px-8 md:!px-[50px]">
          <h2 className="text-left mb-3 xs:!mb-4 sm:!mb-6 md:!mb-8 text-lg xs:!text-xl sm:!text-2xl md:!text-3xl font-medium">Nos Box</h2>
          <BoxCarousel 
            boxes={boxes}
            slidesToShow={3}
          />
          <button onClick={() => navigate('/boxes')} className="px-6 xs:!px-7 sm:!px-8 md:!px-6 py-2 xs:!py-2.5 sm:!py-3 border border-black rounded-xl text-black text-sm xs:!text-base md:!text-lg hover:cursor-pointer transition mt-8 xs:!mt-10 sm:!mt-12 md:!mt-15 mx-auto w-32 xs:!w-36 sm:!w-40 md:!w-50">
            Découvrir
          </button>
        </div>
        <SubscriptionsSection/>
      </section>
      <LoomiHistorySection />
      <div className="px-2 xs:!px-3 sm:!px-4">
        <ReviewsSection />
      </div>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

export default App;
