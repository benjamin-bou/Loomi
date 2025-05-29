import React from "react";

// Utilitaire pour générer des étoiles avec couleur personnalisée et note possible en demi (ex: 4.5)
// Mode interactive pour la sélection de note dans les modals
const Stars = ({ 
  rating, 
  color = "#E62B88", 
  size = 40, 
  interactive = false, 
  onStarClick = null,
  spacing = "space-x-2",
  allowHalfStars = false 
}) => {
  const handleStarClick = (starValue, isHalf = false) => {
    if (interactive && onStarClick) {
      const value = isHalf ? starValue - 0.5 : starValue;
      onStarClick(value);
    }
  };
  return (
    <div className={`flex ${spacing}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        let fillColor = color;
        let fillOpacity = "0.33";
        
        if (rating >= i) {
          // Pleine étoile
          fillOpacity = "1";
        } else if (rating > i - 1 && rating < i) {
          // Demi-étoile
          return (
            <div key={i} className="relative">
              <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24"
                className={interactive ? "cursor-pointer transition-colors hover:scale-110" : ""}
              >
                <defs>
                  <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor={color} />
                    <stop offset="50%" stopColor={color} stopOpacity="0.33" />
                  </linearGradient>
                </defs>
                <path 
                  d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" 
                  fill={`url(#half-${i})`} 
                />
              </svg>
              {interactive && allowHalfStars && (
                <>
                  <div 
                    className="absolute inset-0 w-1/2 cursor-pointer z-10"
                    onClick={() => handleStarClick(i, true)}
                    title={`${i - 0.5} étoiles`}
                  />
                  <div 
                    className="absolute inset-0 left-1/2 w-1/2 cursor-pointer z-10"
                    onClick={() => handleStarClick(i, false)}
                    title={`${i} étoiles`}
                  />
                </>
              )}
              {interactive && !allowHalfStars && (
                <div 
                  className="absolute inset-0 cursor-pointer z-10"
                  onClick={() => handleStarClick(i, false)}
                />
              )}
            </div>
          );
        }

        return (
          <div key={i} className="relative">
            <svg 
              width={size} 
              height={size} 
              viewBox="0 0 24 24"
              className={interactive ? "cursor-pointer transition-colors hover:scale-110" : ""}
            >
              <path 
                d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" 
                fill={fillColor} 
                fillOpacity={fillOpacity}
              />
            </svg>
            {interactive && allowHalfStars && (
              <>
                <div 
                  className="absolute inset-0 w-1/2 cursor-pointer z-10"
                  onClick={() => handleStarClick(i, true)}
                  title={`${i - 0.5} étoiles`}
                />
                <div 
                  className="absolute inset-0 left-1/2 w-1/2 cursor-pointer z-10"
                  onClick={() => handleStarClick(i, false)}
                  title={`${i} étoiles`}
                />
              </>
            )}
            {interactive && !allowHalfStars && (
              <div 
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => handleStarClick(i, false)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stars;
