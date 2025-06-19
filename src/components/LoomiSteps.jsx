import subscription from "/images/picto/subscription.svg";
import box from "/images/picto/box_picto.svg";
import mailbox from "/images/picto/mailbox.svg";
import innovation from "/images/picto/innovation_picto.svg";

import subscription_pink from "/images/picto/subscription_pink.svg";
import box_pink from "/images/picto/box_picto_pink.svg";
import mailbox_pink from "/images/picto/mailbox_pink.svg";
import innovation_pink from "/images/picto/innovation_picto_pink.svg";

export default function LoomiSteps( {textColor, iconsColor} ) {

    const etapes = [
        { 
            label: "Je m'abonne", 
            icon: subscription,
            iconPink: subscription_pink 
        },
        { 
            label: "Je reçois ma box", 
            icon: mailbox,
            iconPink: mailbox_pink 
        },
        { 
            label: "Je découvre", 
            icon: box,
            iconPink: box_pink 
        },
        { 
            label: "Je crée", 
            icon: innovation,
            iconPink: innovation_pink 
        },
    ];return (
        <>
            <h2 className={`mb-8 md:mb-12 !text-3xl md:text-5xl lg:!text-[60px] text-${textColor ?? 'white'}`}>Comment ça marche ?</h2>
            <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-20 max-w-[1200px] w-[90%] md:w-[80%] mx-auto">
                {etapes.map((etape, index) => (                    <div
                        key={index}
                        className="flex flex-col items-center text-center w-36 md:w-40 lg:w-44"
                    >                        <div className="w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 mb-3 md:mb-4 flex items-center justify-center">
                            <img 
                                src={iconsColor === "pink" ? etape.iconPink : etape.icon} 
                                alt={etape.label} 
                                className="w-full h-full object-contain"
                                style={iconsColor === "pink" ? {} : (textColor ? {filter: `brightness(0) saturate(100%) ${textColor === 'white' ? 'invert(1)' : 'invert(0)'}`} : {filter: 'brightness(0) saturate(100%) invert(1)'})}
                            />
                        </div>
                        <p className={`text-sm md:text-base lg:text-lg font-medium text-${textColor ?? 'white'}`}>{etape.label}</p>
                    </div>
                ))}
            </div>
        </>
        
    );
}