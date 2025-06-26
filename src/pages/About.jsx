import LoomiSteps from "../components/LoomiSteps";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";
import o_shape from "/images/picto/o_shape.svg";
import l_shape from "/images/picto/l_shape.svg";
import about_image from "/images/about_image.png";
import { getImageUrl } from "../utils/imageUtils";

export default function About() {
  const [relatedBoxes, setRelatedBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchData(`/boxes`)
        .then(data => setRelatedBoxes(data.slice(0, 4)))
        .catch(err => console.error(err));
    }, []);    
    return (
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
            Loomi, c’est l’envie de redonner goût à l’apprentissage manuel et créatif à travers des boîtes thématiques prêtes à l’emploi. Chaque box contient tout le nécessaire pour découvrir ou approfondir une activité artisanale : tricot, fabrication de savon, calligraphie, couture, etc.
Que vous soyez débutant ou passionné, Loomi vous accompagne pas à pas avec des instructions claires, du matériel de qualité et une expérience ludique.
Vous pouvez choisir entre un achat unique ou un abonnement mensuel pour recevoir chaque mois une nouvelle activité et cultiver votre curiosité.
            </p>
            <p className="!text-sm sm:!text-base leading-relaxed">
              
            </p>
          </section>          {/* Bloc Notre histoire (2 colonnes) */}
          <section className="relative z-10 flex flex-col lg:flex-row gap-6 sm:!gap-8 md:!gap-10 lg:!gap-12">
            {/* Colonne texte */}
            <div className="flex-1 min-w-0">
              <h2 className="mb-6 sm:!mb-7 md:!mb-8 !text-lg sm:!text-xl md:!text-2xl lg:!text-3xl">Notre histoire</h2>
              <div className="mb-6 sm:!mb-7 md:!mb-8">
                <h3 className="font-medium mb-2 !text-base sm:!text-lg md:!text-xl">Pourquoi ce projet&nbsp;?</h3>
                <p className="!text-sm sm:!text-base leading-relaxed mb-4">
                Loomi est né d’un constat simple : nous passons trop de temps derrière nos écrans et trop peu à créer de nos mains.
Nous voulions proposer une alternative ludique, accessible et inspirante, pour aider chacun à renouer avec le plaisir de faire soi-même.
C’est en échangeant avec des passionnés, des éducateurs et des artisans que nous avons façonné cette idée : offrir une box complète, belle et utile, qui donne envie de se lancer, seul ou en famille.
                </p>              
                </div>
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
            <h2 className="!text-lg sm:!text-xl md:!text-2xl text-center mb-8 sm:!mb-10 md:!mb-12">Découvrez nos box !</h2>            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:!gap-6 md:!gap-8 w-full justify-items-center">
              {relatedBoxes.map((box, index) => (
                <div 
                  key={box.id || index} 
                  className="w-full max-w-[250px] h-[380px] sm:!h-[400px] md:!h-[420px] bg-gray-100 rounded-3xl cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group relative" 
                  onClick={() => navigate(`/boxes/${box.id}`)}
                >
                  {/* Image de la box - prend toute la taille */}
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img 
                      src={getImageUrl(box.images?.[0].link)} 
                      alt={box.title || `Box ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://dummyimage.com/300x420/e5e5e5/999999?text=Box";
                      }}
                    />
                  </div>
                  
                  {/* Overlay avec titre et catégorie en haut */}
                  <div className="absolute top-0 left-0 right-0 p-6 text-center">
                    <h3 className=" text-lg sm:!text-xl mb-2 uppercase tracking-wide">
                      {box.name || `BOX ${index + 1}`}
                    </h3>
                    <p className="text-xs font-medium">
                      {box.category?.name || "Activité manuelle"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      );
}