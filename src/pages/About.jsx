import LoomiSteps from "../components/LoomiSteps";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";
import o_shape from "/images/picto/o_shape.svg";
import l_shape from "/images/picto/l_shape.svg";

export default function About() {
  const [relatedBoxes, setRelatedBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchData(`/boxes`)
        .then(data => setRelatedBoxes(data.slice(0, 4)))
        .catch(err => console.error(err));
    }, []);    return (
        <div className="bg-loomibeige min-h-screen font-montserrat relative overflow-x-hidden px-[50px] pt-10">
          {/* SVG l_shape en haut à droite */}
          <img 
            src={l_shape} 
            alt="Forme décorative haut" 
            className="absolute -right-1 top-10 z-0 pointer-events-none w-[170px] h-[460px] max-w-[520px] max-h-[300px]"
            style={{ transform: "rotate(-112deg)" }}
          />
    
          {/* Première section : Le concept */}
          <section className="relative z-10 max-w-4xl mb-16">
            <h1 className="mb-6">Le concept Loomi</h1>
            <p className="mb-3 text-base leading-relaxed">
              Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br/><br/>
              Why do we use it?
            </p>
            <p className="text-base leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </section>
    
          {/* Bloc Notre histoire (2 colonnes) */}
          <section className="relative z-10 flex flex-col lg:flex-row gap-12">
            {/* Colonne texte */}
            <div className="flex-1 min-w-0">
              <h2 className="mb-8">Notre histoire</h2>
              <div className="mb-8">
                <h3 className="font-medium mb-2">Pourquoi ce projet&nbsp;?</h3>
                <p className="text-base leading-relaxed mb-4">
                  Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Notre équipe</h3>
                <p className="text-base leading-relaxed">
                  Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />
                  Why do we use it? Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>
              </div>
            </div>            {/* Colonne visuelle droite */}
            <div className="flex-1 flex flex-col items-end relative min-w-[350px]">
              {/* Bloc gris arrondi */}
              <div className="w-[600px] h-[600px] bg-[#d8d8d8] rounded-3xl flex items-end justify-center mb-8" />
              {/* SVG o_shape devant le bloc gris */}
              <img 
                src={o_shape} 
                alt="Forme décorative" 
                className="absolute right-[-50px] bottom-1/4 z-10 pointer-events-none w-[290px] h-[260px]"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </section>
          <div className="flex flex-col justify-center items-center my-20">
          <LoomiSteps textColor={"black"}/>
          <div className="p-[50px] mx-auto w-[calc(100vw-100px)]">
            <h2 className="text-2xl text-center mb-12">Découvrez nos box !</h2>
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {relatedBoxes.map((related, index) => (
                <div key={index} className="w-[250px] h-[350px] bg-gray-300 rounded-4xl cursor-pointer" onClick={() => navigate(`/boxes/${related.id}`)}></div>
              ))}
            </div>
          </div>
          </div>
        </div>
      );
}