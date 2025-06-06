import favorite from "/images/picto/favorite.svg";
import favoriteFilled from "/images/picto/favorite_filled.svg";

export default function BoxCard({ box, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8">      <div 
        onClick={onClick}
        className="bg-white rounded-3xl md:rounded-4xl flex flex-col items-center text-center w-[280px] md:w-[280px] lg:w-[300px] xl:w-[280px] h-[300px] md:h-[300px] lg:h-[320px] xl:h-[300px] relative hover:cursor-pointer"
      >
        <button
          type="button"
          className="absolute top-3 right-3 md:top-4 lg:top-5 md:right-4 lg:right-5 z-10 focus:outline-none hover:cursor-pointer"
          onClick={e => { e.stopPropagation(); onToggleFavorite(box.id); }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <img
            src={isFavorite ? favoriteFilled : favorite}
            alt="Favori"
            className="w-6 h-6 md:w-7 lg:w-8 md:h-7 lg:h-8"
          />
        </button>
        {/* <img
          src={`/images/${box.image}`}
          alt={`Boîte ${box.name}`}
          className="w-full h-full rounded-xl"
        /> */}
        <img src="https://dummyimage.com/400x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-3xl md:rounded-4xl" />
      </div>      <div className="flex flex-col gap-1">
        <h4 className="text-lg md:text-xl lg:text-2xl xl:text-xl font-light">{box.name}</h4>
        <p className="text-xs md:text-sm lg:text-base xl:text-sm">{box.category?.short_name || "Catégorie non spécifiée"}</p>
        <p className="text-xs md:text-sm lg:text-base xl:text-sm">{box.base_price?.replace('.', ',')} €</p>
      </div>
    </div>
  );
}
