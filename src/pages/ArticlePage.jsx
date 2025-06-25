import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api";
import o_shape from "/images/picto/o_shape.svg";
import article_image from "/images/article_image.png";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchData(`/articles/${id}`);
        setArticle(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }  }, [id]);

  if (loading) {
    return (
      <div className="bg-loomibeige min-h-screen font-montserrat py-0 px-[50px] pb-20">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-loomibeige min-h-screen font-montserrat py-0 px-[50px] pb-20">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-600">{error || "Article non trouvé"}</p>
        </div>
      </div>
    );
  }  return (
    <div className="bg-loomibeige min-h-screen font-montserrat py-0 px-4 sm:px-8 lg:px-[50px] pb-20">
      {/* Titre */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat text-center mb-8 lg:mb-12 pt-12 lg:pt-20 text-black">
        {article.title}
      </h1>

      {/* Contenu principal avec image flottante */}
      <div className="mx-auto relative">        
        {/* Image flottante en haut à droite - cachée sur mobile, visible sur desktop */}
        <div className="hidden xl:block xl:float-right xl:ml-16 xl:mb-16 xl:mt-6 relative">
          <div className="w-[600px] h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img src={article.image_url || article_image} alt="Image article" className="w-full h-full object-cover" />
          </div>
          <img
            src={o_shape} 
            alt="Forme décorative" 
            className="absolute right-[-100px] bottom-[-40px] w-72 h-72 z-10"
            style={{ transform: "rotate(-90deg)" }}
          />
        </div>

        {/* Image sur desktop medium (lg) */}
        <div className="hidden lg:block xl:hidden lg:float-right lg:ml-12 lg:mb-12 lg:mt-4 relative">
          <div className="w-[450px] h-[380px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img src={article.image_url || article_image} alt="Image article" className="w-full h-full object-cover" />
          </div>
          <img
            src={o_shape} 
            alt="Forme décorative" 
            className="absolute right-[-70px] bottom-[-30px] w-56 h-56 z-10 opacity-90"
            style={{ transform: "rotate(-90deg)" }}
          />
        </div>

        {/* Image sur tablette et mobile - pleine largeur */}
        <div className="block lg:hidden mb-8 px-4">
          <div className="w-full max-w-lg mx-auto h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative">
            <img src={article.image_url || article_image} alt="Image article" className="w-full h-full object-cover" />
            <img
              src={o_shape} 
              alt="Forme décorative" 
              className="absolute right-[-30px] bottom-[-20px] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 z-10 opacity-90"
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
        </div>

        {/* Extrait en introduction */}
        <p className="text-lg sm:text-xl lg:text-2xl text-black mb-8 lg:mb-12 leading-relaxed font-medium px-4 lg:px-0">
          {article.excerpt}
        </p>
        
        {/* Contenu principal qui s'enroule autour de l'image */}
        <div className="px-4 lg:px-0">
          <div 
            className="prose prose-lg max-w-none text-black [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-black [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-justify [&>p]:text-base lg:[&>p]:text-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        
        {/* Clear float pour éviter les problèmes de layout */}
        <div className="clear-both"></div>
      </div>
    </div>
  );
}
