import MainHeader from "../components/MainHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import arrowLeft from "/images/picto/slider/slider_arrow_left.svg";
import arrowRight from "/images/picto/slider/slider_arrow_right.svg";
import MainButton from "../components/addOns/MainButton";
import Footer from "../components/Footer";

function NextArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-next z-20 flex items-center justify-center !right-[60px] top-1/2 -translate-y-1/2`}
      onClick={onClick}
      style={{ ...style, width: 48, height: 48 }}
    >
      <img src={arrowRight} alt="next" className="w-12 h-12" />
    </div>
  );
}

function PrevArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-prev z-20 flex items-center justify-center !left-[60px] top-1/2 -translate-y-1/2`}
      onClick={onClick}
      style={{ ...style, width: 48, height: 48 }}
    >
      <img src={arrowLeft} alt="prev" className="w-12 h-12" />
    </div>
  );
}

export default function GiftCards() {
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

  return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <MainHeader />

      <div className="flex flex-col items-center justify-center px-10 py-12 min-h-[600px] gap-20">
        <section className="relative w-full flex justify-center">
          <Slider {...settings} className="w-full max-w-[1500px]">
            {slides.map((slide, idx) => (
              <div key={idx} className="flex justify-center items-center px-10">
                <div className="bg-[#D9D9D9] w-full rounded-[40px] min-h-[400px] md:min-h-[500px] flex flex-col justify-between items-center px-4 md:px-24 py-20">
                  <h2 className="text-4xl md:text-5xl font-medium text-center mb-8 mt-2">{slide.title}</h2>
                  <p className="text-xl md:text-2xl text-center font-normal mb-8 leading-snug max-w-2xl">{slide.desc}</p>
                  <MainButton
                    text={slide.button}
                    onClick={() => {
                      console.log("Button clicked!");
                    }}/>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        {/* Section liste des cartes cadeau */}
        <section className="w-full max-w-6xl mt-16 px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "1 BOX",
                desc: (
                  <>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
                    <span className="block mt-2">Box mystère ou box activité manuelle ou box DIY</span>
                  </>
                ),
                onClick: () => { console.log("Ajout 1 BOX au panier"); }
              },
              {
                title: "ABONNEMENT DE 3 MOIS",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                onClick: () => { console.log("Ajout Abonnement 3 mois au panier"); }
              },
              {
                title: "ABONNEMENT DE 6 MOIS",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                onClick: () => { console.log("Ajout Abonnement 6 mois au panier"); }
              },
              {
                title: "ABONNEMENT DE 1 AN",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                onClick: () => { console.log("Ajout Abonnement 1 an au panier"); }
              }
            ].map((offer, i) => (
              <div
                key={i}
                className="bg-white rounded-[40px] flex flex-col items-center justify-center px-8 py-12 min-h-[320px]"
              >
                <h3 className="text-2xl md:text-3xl font-medium text-center mb-4">{offer.title}</h3>
                <p className="text-center text-base md:text-lg mb-6">{offer.desc}</p>
                <MainButton
                  text="Ajouter au panier"
                  className="w-full max-w-xs mt-2"
                  onClick={offer.onClick}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="relative w-full flex px-20">
          {/* Forme rose foncé */}
          <div
            className="hidden lg:block absolute left-50 -bottom-15 w-[140px] h-[140px] bg-loomipink z-50"
            style={{
              borderRadius: "52% 48% 46% 54% / 59% 61% 39% 41%",
              transform: "rotate(10deg)",
            }}
          />
          <div
            className="bg-white rounded-[40px] w-full flex flex-col items-center justify-center px-8 py-12 min-h-[320px]"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-center mb-4">Abonnement 1 AN BOX MYSTÈRE</h3>
            <p className="text-center text-base md:text-lg mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <MainButton
              text="Ajouter au panier"
              className="w-full max-w-xs mt-2"
              onClick={console.log("Ajout Abonnement 1 an au panier")}
            />
          </div>
        </section>
        <section>
          <div className="bg-loomilightpink text-black rounded-4xl my -10 p-4 grid grid-cols-2 w-full z-20 gap-10">
            <div className="flex flex-col justify-end h-[450px] p-10 gap-5">
              <h3 className="my-4 text-white uppercase">On vous a offert une carte cadeau ? Activez-la ici !</h3>
              <div className="flex flex-col mb-2 gap-6">
                <MainButton
                  text="Activer ma carte"
                  className="bg-loomipink border-0 text-white max-w-[300px]"
                  onClick={() => { console.log("Activation carte cadeau"); }}
                />
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded-2xl" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
