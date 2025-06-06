import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import arrowLeft from "/images/picto/slider/slider_arrow_left.svg";
import arrowRight from "/images/picto/slider/slider_arrow_right.svg";
import MainButton from "../components/addOns/MainButton";
import GiftCardActivation from "../components/GiftCardActivation";
import GiftCardsSkeleton from "../components/GiftCardsSkeleton";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useCart } from '../context/CartContext';
import o_shape from "/images/picto/o_shape.svg";

function NextArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-next z-20 flex items-center justify-center !right-[10px] sm:!right-[30px] md:!right-[60px] top-1/2 -translate-y-1/2`}
      onClick={onClick}
      style={{ ...style, width: 48, height: 48 }}
    >
      <img src={arrowRight} alt="next" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
    </div>
  );
}

function PrevArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-prev z-20 flex items-center justify-center !left-[10px] sm:!left-[30px] md:!left-[60px] top-1/2 -translate-y-1/2`}
      onClick={onClick}
      style={{ ...style, width: 48, height: 48 }}
    >
      <img src={arrowLeft} alt="prev" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
    </div>
  );
}

export default function GiftCards({ setShowCart, setShowLogin }) {
  const [giftCards, setGiftCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActivation, setShowActivation] = useState(false);
  const [user, setUser] = useState(null);
  const { addToCart, addActivatedGiftCard } = useCart();

  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 6000,
    dots: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    touchMove: true,
    touchThreshold: 8,
    waitForAnimate: false,
  };
  const slides = [
    {
      title: "La carte cadeau idéale !",
      desc: "Chaque mois, un projet créatif original parfait pour les esprits créatifs.",
      button: "Offrir"
    },
    {
      title: <>On vous à offert une carte cadeau ? <br/><br/>Activez la ici !</>,
      button: "Activer ma carte"
    }
  ];

  const handleActivationSuccess = (giftCard) => {
    addActivatedGiftCard(giftCard);
    // Optionnel: afficher une notification de succès
  };  useEffect(() => {
      setLoading(true);
      fetchData("/gift-cards")
        .then(data => {
          setGiftCards(data);
        })
        .catch(error => {
          console.error("Error fetching boxes:", error);
          setError("Une erreur est survenue lors du chargement des boîtes.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  useEffect(() => {
    // Récupérer les informations de l'utilisateur si connecté
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/profile')
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
        <p className="text-lg text-[#FA5D5D]">{error}</p>
      </div>
    );
  }  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 min-h-[600px] gap-12 sm:gap-16 md:gap-20">
        <section className="relative w-full flex justify-center">
          <Slider {...settings} className="w-full max-w-[1500px]">
            {slides.map((slide, idx) => (
              <div key={idx} className="flex justify-center items-center px-4 sm:px-6 md:px-10">
                <div className="bg-[#D9D9D9] w-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px] min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex flex-col justify-between items-center px-4 sm:px-8 md:px-24 py-12 sm:py-16 md:py-20">
                  <h2 className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl font-medium text-center mb-4 sm:mb-6 md:mb-8 mt-2">{slide.title}</h2>
                  <p className="!text-base sm:!text-lg md:!text-xl lg:!text-2xl text-center font-normal mb-6 sm:mb-7 md:mb-8 leading-snug max-w-2xl">{slide.desc}</p><MainButton
                    text={slide.button}
                    onClick={() => {
                      if (slide.button === "Activer ma carte") {
                        setShowActivation(true);                      } else {
                        // Défilement fluide vers la section des cartes cadeaux avec offset personnalisé
                        const giftCardsSection = document.querySelector('[data-section="gift-cards-list"]');
                        if (giftCardsSection) {
                          const elementPosition = giftCardsSection.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - 100;
                          
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}/>
                </div>
              </div>
            ))}
          </Slider>
        </section>        
        {/* Section liste des cartes cadeau */}
        <section className="w-full mt-16 px-4 md:px-20" data-section="gift-cards-list">
          {error && (
            <div className="text-red-500 text-center mb-8">{error}</div>
          )}
          {loading ? (
            <GiftCardsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {giftCards && giftCards.length > 0 ? (
                giftCards.map((giftCard, i) =>
                  i === giftCards.length - 1 ? (                    // Dernière card, plus large avec forme SVG décorative
                    <div key={giftCard.id || i} className="relative md:col-span-2 w-full">
                      {/* SVG o_shape décoratif */}
                      <img 
                        src={o_shape} 
                        alt="Forme décorative" 
                        className="hidden lg:block absolute left-50 -bottom-15 w-[140px] h-[140px] z-50"
                        style={{
                          transform: "rotate(-90deg)",
                        }}
                      />
                      <div className="bg-white rounded-[40px] flex flex-col items-center justify-between px-8 py-12 min-h-[320px] relative z-20">
                        <h3 className="text-2xl md:text-3xl font-medium text-center mb-4">{giftCard.name}</h3>
                        <p className="text-center text-base md:text-lg mb-6">{giftCard.description}</p>
                        <MainButton
                          text="Ajouter au panier"
                          className="w-full max-w-xs mt-2"
                          onClick={() => { 
                            addToCart({ ...giftCard, type: 'giftcard' });
                            setShowCart && setShowCart(true);
                          }}
                        />
                      </div>
                    </div>
                  ) : (                  <div
                      key={giftCard.id || i}
                      className="bg-white rounded-[40px] flex flex-col items-center justify-between px-8 py-12 min-h-[320px]"
                    >
                      <h3 className="text-2xl md:text-3xl font-medium text-center mb-4">{giftCard.name}</h3>
                      <p className="text-center text-base md:text-lg mb-6">{giftCard.description}</p>
                      <MainButton
                        text="Ajouter au panier"
                        className="w-full max-w-xs mt-2"
                        onClick={() => { 
                          addToCart({ ...giftCard, type: 'giftcard' });
                          setShowCart && setShowCart(true);
                        }}
                      />
                    </div>
                  )
                )
              ) : (
                <div className="col-span-2 text-center text-gray-500">Aucune carte cadeau disponible.</div>
              )}
            </div>
          )}
        </section>        <section className="px-4 sm:!px-6 md:!px-8">
          <div className="bg-loomilightpink text-black rounded-4xl my-6 sm:!my-8 md:!my-10 p-4 sm:!p-6 md:!p-8 grid grid-cols-1 md:grid-cols-2 w-full z-20 gap-6 sm:!gap-8 md:!gap-10">
            <div className="flex flex-col justify-end fmd:!h-[450px] p-4 sm:!p-6 md:!p-10 gap-3 sm:!gap-4 md:!gap-5">
              <h3 className="my-2 sm:!my-3 md:!my-4 text-white uppercase !text-sm sm:!text-base md:!text-lg lg:!text-xl">On vous a offert une carte cadeau ? Activez-la ici !</h3>
              <div className="flex flex-col mb-2 gap-4 sm:!gap-5 md:!gap-6">
                <MainButton
                  text="Activer ma carte"
                  className="bg-loomipink border-0 text-white w-full sm:!max-w-[250px] md:!max-w-[300px] !text-sm sm:!text-base"
                  onClick={() => setShowActivation(true)}
                />
              </div>
            </div>
            <div className="w-full h-[200px] sm:!h-[250px] md:!h-full flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded-xl sm:!rounded-2xl" />
            </div>
          </div>        
        </section>
      </div>
        {showActivation && (
        <GiftCardActivation
          onClose={() => setShowActivation(false)}
          onActivationSuccess={handleActivationSuccess}
          user={user}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
}
