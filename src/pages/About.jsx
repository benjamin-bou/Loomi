import LoomiSteps from "../components/LoomiSteps";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";
import o_shape from "/images/picto/o_shape.svg";
import l_shape from "/images/picto/l_shape.svg";
import about_image from "/images/about_image.png";

export default function About() {
  const [relatedBoxes, setRelatedBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchData(`/boxes`)
        .then(data => setRelatedBoxes(data.slice(0, 4)))
        .catch(err => console.error(err));
    }, []);    return (
        <div className="bg-loomibeige min-h-screen font-montserrat relative overflow-x-hidden px-4 sm:!px-6 md:!px-8 lg:!px-[50px] pt-6 sm:!pt-8 md:!pt-10">
          {/* SVG l_shape en haut à droite */}
          <img 
            src={l_shape} 
            alt="Forme décorative haut" 
            className="absolute -right-1 top-6 sm:!top-8 md:!top-10 z-0 pointer-events-none w-[100px] h-[200px] sm:!w-[120px] sm:!h-[280px] md:!w-[140px] md:!h-[350px] lg:!w-[170px] lg:!h-[460px] max-w-[520px] max-h-[300px]"
            style={{ transform: "rotate(-112deg)" }}
          />
    
          {/* Première section : Le concept */}
          <section className="relative z-10 max-w-4xl mb-8 sm:!mb-12 md:!mb-16">
            <h1 className="mb-4 sm:!mb-5 md:!mb-6 !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl">Le concept Loomi</h1>            <p className="mb-3 !text-sm sm:!text-base leading-relaxed">
              Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br/><br/>
              Why do we use it?
            </p>
            <p className="!text-sm sm:!text-base leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </section>          {/* Bloc Notre histoire (2 colonnes) */}
          <section className="relative z-10 flex flex-col lg:flex-row gap-6 sm:!gap-8 md:!gap-10 lg:!gap-12">
            {/* Colonne texte */}
            <div className="flex-1 min-w-0">
              <h2 className="mb-6 sm:!mb-7 md:!mb-8 !text-lg sm:!text-xl md:!text-2xl lg:!text-3xl">Notre histoire</h2>
              <div className="mb-6 sm:!mb-7 md:!mb-8">
                <h3 className="font-medium mb-2 !text-base sm:!text-lg md:!text-xl">Pourquoi ce projet&nbsp;?</h3>
                <p className="!text-sm sm:!text-base leading-relaxed mb-4">
                  Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>              </div>
              <div>
                <h3 className="font-medium mb-2 !text-base sm:!text-lg md:!text-xl">Notre équipe</h3>
                <p className="!text-sm sm:!text-base leading-relaxed">
                  Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />
                  Why do we use it? Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>
              </div>
            </div>            
            {/* Colonne visuelle droite */}
            <div className="flex-1 flex flex-col items-center lg:items-end relative min-w-0 lg:!min-w-[350px]">
              {/* Image about */}
              <div className="w-full max-w-[300px] h-[300px] sm:!max-w-[400px] sm:!h-[400px] md:!max-w-[500px] md:!h-[500px] lg:!w-[600px] lg:!h-[600px] rounded-2xl sm:!rounded-3xl flex items-end justify-center mb-6 sm:!mb-7 md:!mb-8 overflow-hidden">
                <img src={about_image} alt="À propos de Loomi" className="w-full h-full object-cover" />
              </div>
              {/* SVG o_shape devant l'image' */}
              <img 
                src={o_shape} 
                alt="Forme décorative" 
                className="absolute right-0 lg:!right-[-50px] -bottom-1/4 z-10 pointer-events-none w-[120px] h-[100px] sm:!w-[180px] sm:!h-[160px] md:!w-[220px] md:!h-[200px] lg:!w-[290px] lg:!h-[260px]"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>          
            </section>
          <div className="flex flex-col justify-center items-center my-12 sm:!my-16 md:!my-20">
          <LoomiSteps textColor={"black"}/>
          <div className="p-4 sm:!p-6 md:!p-8 lg:!p-[50px] mx-auto w-full">
            <h2 className="!text-lg sm:!text-xl md:!text-2xl text-center mb-8 sm:!mb-10 md:!mb-12">Découvrez nos box !</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:!gap-6 md:!gap-8 w-full justify-items-center">
              {relatedBoxes.map((related, index) => (
                <div key={index} className="w-full max-w-[250px] h-[300px] sm:!h-[320px] md:!h-[350px] bg-gray-300 rounded-3xl sm:!rounded-4xl cursor-pointer" onClick={() => navigate(`/boxes/${related.id}`)}></div>
              ))}
            </div>
          </div>
          </div>
        </div>
      );
}