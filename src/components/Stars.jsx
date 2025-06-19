import React from "react";

// Utilitaire pour générer des étoiles avec couleur personnalisée et note possible en demi (ex: 4.5)
// Mode interactive pour la sélection de note dans les modals
const Stars = ({ 
  rating, 
  color = "#E62B88", 
  size = "responsive", // "responsive", "small", "medium", "large" ou nombre spécifique
  interactive = false, 
  onStarClick = null,
  spacing = "space-x-1 sm:space-x-2",
  allowHalfStars = false 
}) => {
  // Gestion des tailles responsives
  const getResponsiveSize = () => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small':
        return { base: 16, sm: 20, md: 24 };
      case 'medium':
        return { base: 20, sm: 28, md: 32 };
      case 'large':
        return { base: 28, sm: 36, md: 40 };
      case 'responsive':
      default:
        return { base: 20, sm: 28, md: 32 };
    }
  };

  const responsiveSize = getResponsiveSize();
  const isResponsive = typeof responsiveSize === 'object';
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
          fillOpacity = "1";        } else if (rating > i - 1 && rating < i) {
          // Demi-étoile
          return (
            <div key={i} className="relative">
              {isResponsive ? (
                <svg 
                  className={`w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 ${interactive ? "cursor-pointer transition-colors hover:scale-110" : ""}`}
                  viewBox="0 0 24 24"
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
              ) : (
                <svg 
                  width={responsiveSize} 
                  height={responsiveSize} 
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
              )}
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
        }        return (
          <div key={i} className="relative">
            {isResponsive ? (
              <svg 
                className={`w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 ${interactive ? "cursor-pointer transition-colors hover:scale-110" : ""}`}
                viewBox="0 0 24 24"
              >
                <path 
                  d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" 
                  fill={fillColor} 
                  fillOpacity={fillOpacity}
                />
              </svg>
            ) : (
              <svg 
                width={responsiveSize} 
                height={responsiveSize} 
                viewBox="0 0 24 24"
                className={interactive ? "cursor-pointer transition-colors hover:scale-110" : ""}
              >
                <path 
                  d="M12 .587l3.668 7.568L24 9.423l-6 5.979 1.416 8.242L12 18.896l-7.416 4.748L6 15.402 0 9.423l8.332-1.268z" 
                  fill={fillColor} 
                  fillOpacity={fillOpacity}
                />
              </svg>
            )}
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
