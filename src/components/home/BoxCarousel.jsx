import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";
import arrowLeft from "/images/picto/slider/slider_arrow_left.svg";
import arrowRight from "/images/picto/slider/slider_arrow_right.svg";
import LoadingImage from "../addOns/LoadingImage";
import { useNavigate } from "react-router-dom";

// Ajout d'un style global pour masquer les ::before des flèches slick
const style = document.createElement('style');
style.innerHTML = `
  .slick-prev:before, .slick-next:before {
    display: none !important;
    content: none !important;
  }
`;
document.head.appendChild(style);

function NextArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { slideCount, currentSlide, ...rest } = props;
  return (
    <div {...rest} className="slick-arrow slick-next !right-10 z-20 flex items-center justify-center">
      <img src={arrowRight} alt="next" style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', maxWidth: '30px', maxHeight: '30px', objectFit: 'contain' }} />
    </div>
  );
}

function PrevArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { slideCount, currentSlide, ...rest } = props;
  return (
    <div {...rest} className="slick-arrow slick-prev !left-8 z-20 flex items-center justify-center">
      <img src={arrowLeft} alt="prev" style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', maxWidth: '30px', maxHeight: '30px', objectFit: 'contain' }} />
    </div>
  );
}

function BoxCarousel({ boxes, slidesToShow }) {
  const navigate = useNavigate();

  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: slidesToShow,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    swipeToSlide: true, // permet de swiper plusieurs slides
    draggable: true, // permet de drag avec la souris
    touchMove: true, // permet le swipe tactile
    touchThreshold: 8, // plus sensible au swipe
    waitForAnimate: false, // permet de cliquer plusieurs fois rapidement
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: slidesToShow
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        }

    ]
  };

  return (
    <>
      <div className="mt-8">
        <Slider {...settings}>
          {Array.isArray(boxes) && boxes.length > 0
            ? boxes.map((box, index) => (
                <div key={index} className="px-2">
                  <div 
                  className="relative h-96 rounded-4xl overflow-hidden w-full cursor-pointer"
                  onClick={() => navigate(`/boxes/${box.id}`)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://dummyimage.com/400x300/D9D9D9/D9D9D9&text= "
                      alt={box.name}
                    />
                    <div className="absolute top-0 left-0 w-full flex flex-col items-center mt-8 text-black text-center px-4">
                      <h2 className="text-[28px] font-light">{box.name}</h2>
                      <p className="text-sm mt-1">{box?.category?.short_name}</p>
                    </div>
                  </div>
                </div>
              ))
            : [1, 2, 3].map((i) => (
                <div key={i} className="px-2">
                  <div className="relative h-96 rounded-4xl overflow-hidden w-full flex items-center justify-center">
                    <LoadingImage loaderClassName={"h-full w-full"} />
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </>
  );
}

export default BoxCarousel;
