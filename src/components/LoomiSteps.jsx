export default function LoomiSteps( textColor) {

    const etapes = [
        { label: "Je m’abonne", icon: "📝" },
        { label: "Je reçois ma box", icon: "📦" },
        { label: "Je découvre", icon: "🔍" },
        { label: "Je crée", icon: "🎨" },
      ];

    return (
        <>
            <h2 className="mb-6 md:mb-10 text-3xl md:text-5xl lg:!text-[60px]" style={textColor ? {color: textColor} : {color: "white"}}>Comment ça marche ?</h2>
            <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-8 mb-10 md:mb-20 max-w-[1800px] w-[90%] md:w-[70%] mx-auto">
                {etapes.map((etape, index) => (                <div
                    key={index}
                    className="flex flex-col items-center text-center w-20 md:w-32"
                    style={textColor ? {color: textColor} : {color: "white"}}
                >
                    <div className="w-[20vw] md:w-[15vw] h-[20vw] md:h-[15vw] max-w-[100px] max-h-[100px] bg-gray-300 rounded-3xl md:rounded-4xl mb-2 flex items-center justify-center text-lg md:text-2xl">
                    {etape.icon}
                    </div>
                    <p className="text-xs md:text-sm">{etape.label}</p>
                </div>
                ))}
            </div>
        </>
        
    );
}