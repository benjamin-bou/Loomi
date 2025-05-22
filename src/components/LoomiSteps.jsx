export default function LoomiSteps( textColor) {

    const etapes = [
        { label: "Je m’abonne", icon: "📝" },
        { label: "Je reçois ma box", icon: "📦" },
        { label: "Je découvre", icon: "🔍" },
        { label: "Je crée", icon: "🎨" },
      ];

    return (
        <>
            <h2 className="mb-10 !text-[60px]" style={textColor ? {color: textColor} : {color: "white"}}>Comment ça marche ?</h2>
            <div className="flex flex-wrap justify-between gap-8 mb-20 max-w-[1800px] w-[70%] mx-auto">
                {etapes.map((etape, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center text-center w-32"
                    style={textColor ? {color: textColor} : {color: "white"}}
                >
                    <div className="w-[15vw] h-[15vw] bg-gray-300 rounded-4xl mb-2 flex items-center justify-center text-2xl">
                    {etape.icon}
                    </div>
                    <p className="text-sm">{etape.label}</p>
                </div>
                ))}
            </div>
        </>
        
    );
}