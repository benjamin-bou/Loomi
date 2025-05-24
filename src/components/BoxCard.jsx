import favorite from "/images/picto/favorite.svg";
import favoriteFilled from "/images/picto/favorite_filled.svg";

export default function BoxCard({ box, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <div 
        onClick={onClick}
        className="bg-white rounded-4xl flex flex-col items-center text-center w-[350px] h-[380px] min-w-[280px] max-w-[280px] relative hover:cursor-pointer"
      >
        <button
          type="button"
          className="absolute top-5 right-5 z-10 focus:outline-none hover:cursor-pointer"
          onClick={e => { e.stopPropagation(); onToggleFavorite(box.id); }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <img
            src={isFavorite ? favoriteFilled : favorite}
            alt="Favori"
            className="w-8 h-8"
          />
        </button>
        {/* <img
          src={`/images/${box.image}`}
          alt={`Boîte ${box.name}`}
          className="w-full h-full rounded-xl"
        /> */}
        <img src="https://dummyimage.com/400x300/#2EC4B6/ffffff&text=" className="w-full h-full rounded-4xl" />
      </div>
      <div className="flex flex-col">
        <h4 className="!text-3xl font-light">{box.name}</h4>
        <p>{box.category?.short_name || "Catégorie non spécifiée"}</p>
        <p>{box.base_price?.replace('.', ',')} €</p>
      </div>
    </div>
  );
}
