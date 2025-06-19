import favorite from "/images/picto/favorite.svg";
import favoriteFilled from "/images/picto/favorite_filled.svg";

export default function BoxCard({ box, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="flex flex-col gap-1 xs:!gap-2 sm:!gap-2 md:!gap-3 mb-4 xs:!mb-6 md:!mb-8">
      <div 
        onClick={onClick}
        className="bg-white rounded-2xl xs:!rounded-3xl md:!rounded-4xl flex flex-col items-center text-center w-[240px] xs:!w-[260px] sm:!w-[280px] md:!w-[280px] lg:!w-[300px] xl:!w-[280px] h-[260px] xs:!h-[280px] sm:!h-[300px] md:!h-[300px] lg:!h-[320px] xl:!h-[300px] relative hover:cursor-pointer"
      >
        <button
          type="button"
          className="absolute top-2 right-2 xs:!top-3 xs:!right-3 md:!top-4 lg:!top-5 md:!right-4 lg:!right-5 z-10 focus:outline-none hover:cursor-pointer"
          onClick={e => { e.stopPropagation(); onToggleFavorite(box.id); }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <img
            src={isFavorite ? favoriteFilled : favorite}
            alt="Favori"
            className="w-5 h-5 xs:!w-6 xs:!h-6 md:!w-7 lg:!w-8 md:!h-7 lg:!h-8"
          />
        </button>
        {/* <img
          src={`/images/${box.image}`}
          alt={`Boîte ${box.name}`}
          className="w-full h-full rounded-xl"
        /> */}
        <img src="https://dummyimage.com/400x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-2xl xs:!rounded-3xl md:!rounded-4xl object-cover" />
      </div>

      <div className="flex flex-col gap-0.5 xs:!gap-1 px-1 xs:!px-0">
        <h4 className="text-base xs:!text-lg md:!text-xl lg:!text-2xl xl:!text-xl font-light leading-tight">{box.name}</h4>
        <p className="text-xs xs:!text-xs md:!text-sm lg:!text-base xl:!text-sm text-gray-600">{box.category?.short_name || "Catégorie non spécifiée"}</p>
        <p className="text-xs xs:!text-xs md:!text-sm lg:!text-base xl:!text-sm font-medium">{box.base_price?.replace('.', ',')} €</p>
      </div>
    </div>
  );
}
