import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BoxCarousel({ boxes, slidesToShow }) {

  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    speed: 1000,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    pauseOnHover: true,
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
        }

    ]
  };

  console.log(boxes);
  

  return (
    <>
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl text-center mb-6">Vous aimerez aussi</h2>
        {boxes && boxes.length >= 0 && (
        <Slider {...settings}>
          {boxes.map((box, index) => {
            return (
              <div key={index} className="px-2">
                <div className="h-96 bg-gray-300 rounded-4xl w-full">
                </div>
              </div>
            )
          })}
        </Slider>
        )}

      </div>
    </>
  );
}

export default BoxCarousel;
