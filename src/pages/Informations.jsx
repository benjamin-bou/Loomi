import { useEffect, useState } from "react";
import { fetchData } from "../api";
import o_shape from "/images/picto/o_shape.svg";

export default function Informations() {
  const [user, setUser] = useState({});

    useEffect(() => {
        const fetchInformations = async () => {
            try {
                const data = await fetchData("/informations");
                setUser(data);
            } catch (error) {
                console.error("Error fetching informations:", error);
            }
        };
        fetchInformations();
    }, []);    return(
        <div className="bg-loomibeige relative px-4 xs:!px-6 sm:!px-8 md:!px-12 lg:!px-16 pt-6 xs:!pt-8 sm:!pt-10 md:!pt-12 pb-12 xs:!pb-16 sm:!pb-20 overflow-hidden">
          {/* Élément décoratif SVG */}
          <img 
            src={o_shape}
            alt="Decoration" 
            className="absolute top-[15vh] right-[-40px] w-[60px] h-[60px] xs:!w-[80px] xs:!h-[80px] sm:!w-[100px] sm:!h-[100px] md:!w-[120px] md:!h-[120px] lg:!w-[140px] lg:!h-[140px] z-10 opacity-30"
            style={{ transform: "rotate(-45deg)" }}
          />
          
          <h1 className="mb-8 xs:!mb-10 sm:!mb-12 md:!mb-16 !text-xl xs:!text-2xl sm:!text-3xl md:!text-4xl font-bold text-center sm:!text-left relative z-20">Mes informations</h1>
          <div className="flex flex-col lg:!flex-row gap-8 xs:!gap-10 sm:!gap-12 md:!gap-16 lg:!gap-20 xl:!gap-32 relative z-20">
            {/* Bloc Contact */}
            <div className="flex-1">
              <h2 className="mb-4 xs:!mb-5 sm:!mb-6 !text-lg xs:!text-xl sm:!text-2xl md:!text-3xl font-semibold text-center sm:!text-left">Contact</h2>
              <div className="space-y-2 xs:!space-y-3 sm:!space-y-4 text-sm xs:!text-base sm:!text-lg md:!text-xl text-center sm:!text-left">
                <p className="break-words"><span className="font-medium">Nom :</span> {user.last_name}</p>
                <p className="break-words"><span className="font-medium">Prénom :</span> {user.first_name}</p>
                <p className="break-words"><span className="font-medium">Adresse e-mail :</span> {user.email}</p>
                <p className="break-words"><span className="font-medium">Téléphone :</span> {user.phone}</p>
              </div>
            </div>
            {/* Bloc Adresse de livraison */}
            <div className="flex-1">
              <h2 className="mb-4 xs:!mb-5 sm:!mb-6 !text-lg xs:!text-xl sm:!text-2xl md:!text-3xl font-semibold text-center sm:!text-left">Adresse de livraison</h2>
              <div className="space-y-2 xs:!space-y-3 sm:!space-y-4 text-sm xs:!text-base sm:!text-lg md:!text-xl text-center sm:!text-left">
                <p className="break-words"><span className="font-medium">Nom :</span> {user.last_name}</p>
                <p className="break-words"><span className="font-medium">Prénom :</span> {user.first_name}</p>
                <p className="break-words"><span className="font-medium">Adresse :</span> {user.address}</p>
                <p className="break-words"><span className="font-medium">Code Postal :</span> {user.zip_code} {user.city}</p>
                <p className="break-words">{user.country}</p>
              </div>
            </div>
          </div>
        </div>
    );
}