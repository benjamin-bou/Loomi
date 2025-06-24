import MainButton from "../components/addOns/MainButton";
import Newsletter from "../components/Newsletter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
import o_shape from "/images/picto/o_shape.svg";
import blog_image from "/images/blog_image.png";

export default function BlogPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchData("/articles");
        setArticles(data);
      } catch (err) {
        setError("Erreur lors du chargement des articles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="bg-loomibeige min-h-screen font-montserrat px-10 py-8">
        <h1 className="mb-10">Blog</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-loomibeige min-h-screen font-montserrat px-10 py-8">
        <h1 className="mb-10">Blog</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-loomibeige min-h-screen font-montserrat px-10 py-8">
        <h1 className="mb-10">Blog</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Aucun article disponible</p>
        </div>
      </div>
    );
  }

  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="bg-loomibeige min-h-screen font-montserrat px-10 py-8">
      <h1 className="mb-10">Blog</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Grand article à gauche */}
        <div className="bg-white rounded-3xl p-8 flex-1 max-w-[730px] min-w-[350px] flex flex-col shadow-sm">
          <span className="text-lg mb-2">{formatDate(mainArticle.created_at)}</span>
          <h2 className="text-3xl mb-2">{mainArticle.title}</h2>
          <p className="text-base mb-6">{mainArticle.excerpt}</p>
          <MainButton text="En savoir plus" onClick={() => navigate(`/blog/${mainArticle.id}`)} className="w-[240px]"/>
          <div className="relative w-full mt-auto">
            {/* Image blog */}
            <div className="w-full h-48 rounded-3xl overflow-hidden">
              <img src={mainArticle.image_url || blog_image} alt="Image blog principal" className="w-full h-full object-cover" />
            </div>
            {/* SVG o_shape */}
            <img 
              src={o_shape} 
              alt="Forme décorative" 
              className="absolute -right-12 -top-10 w-40 h-40 z-10"
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
        </div>
        
        {/* Grid des petits articles à droite */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-w-[330px]">
          {otherArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[320px]"
            >
              <span className="text-lg mb-2">{formatDate(article.created_at)}</span>
              <h2 className="text-2xl mb-2">{article.title}</h2>
              <p className="text-base mb-6">{article.excerpt}</p>
              <MainButton text="En savoir plus" onClick={() => navigate(`/blog/${article.id}`)} className="w-auto"/>
            </div>
          ))}
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
  