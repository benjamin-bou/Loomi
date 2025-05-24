import MainButton from "../components/addOns/MainButton";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import Newsletter from "../components/Newsletter";
import { useNavigate } from "react-router-dom";

const articles = [
    {
      id: 1,
      date: "16 mai 2025",
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: true, // image/gris+blob pour le principal
      main: true,
    },
    {
      id: 2,
      date: "16 mai 2025",
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      date: "16 mai 2025",
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 4,
      date: "16 mai 2025",
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 5,
      date: "16 mai 2025",
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  
  export default function BlogPage() {
    const navigate = useNavigate();
    return (
      <>
      <MainHeader />
      <div className="bg-loomibeige min-h-screen font-montserrat px-10 py-8">
        <h1 className="text-4xl font-bold mb-10">Blog</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Grand article à gauche */}
          <div className="bg-white rounded-3xl p-8 flex-1 max-w-[730px] min-w-[350px] flex flex-col shadow-sm">
            <span className="text-lg mb-2">{articles[0].date}</span>
            <h2 className="text-3xl font-semibold mb-2">{articles[0].title}</h2>
            <p className="text-base mb-6">{articles[0].content}</p>
            <MainButton text="En savoir plus" onClick={() => navigate(`/blog/${articles[0].id}`)} className="w-[240px]"/>
            <div className="relative w-full mt-auto">
              {/* Image grise */}
              <div className="w-full h-48 bg-gray-300 rounded-3xl" />
              {/* Blob rose */}
              <div
                className="absolute -right-12 -top-10 w-40 h-40 bg-[#d63d87] z-10"
                style={{
                  borderRadius: "52% 48% 46% 54% / 59% 61% 39% 41%",
                }}
              />
            </div>
          </div>
          {/* Grid des petits articles à droite */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-w-[330px]">
            {articles.slice(1).map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[320px]"
              >
                <span className="text-lg mb-2">{art.date}</span>
                <h2 className="text-2xl font-semibold mb-2">{art.title}</h2>
                <p className="text-base mb-6">{art.content}</p>
                <MainButton text="En savoir plus" onClick={() => navigate(`/blog/${art.id}`)} className="w-auto"/>
              </div>
            ))}
          </div>
        </div>
      <Newsletter />
      </div>

      <Footer />
      </>
    );
  }
  