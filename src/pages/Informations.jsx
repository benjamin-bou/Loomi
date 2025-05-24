import { useEffect, useState } from "react";
import { fetchData } from "../api";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";

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
    }, []);
    
    return(
      <>
        <MainHeader />
        <div className="bg-loomibeige relative px-8 pt-8 pb-20 overflow-hidden">
          <h1 className="mb-16">Mes informations</h1>
          <div className="flex flex-col md:flex-row gap-12 md:gap-32">
            {/* Bloc Contact */}
            <div className="flex-1">
              <h2 className="mb-6">Contact</h2>
              <div className="space-y-3 text-lg">
                <p>Nom : {user.last_name}</p>
                <p>Prénom : {user.first_name}</p>
                <p>Adresse e mail : {user.email}</p>
                <p>Téléphone : {user.phone}</p>
              </div>
            </div>
            {/* Bloc Adresse de livraison */}
            <div className="flex-1">
              <h2 className="mb-6">Adresse de livraison</h2>
              <div className="space-y-3 text-lg">
                <p>Nom : {user.last_name}</p>
                <p>Prénom : {user.first_name}</p>
                <p>Adresse : {user.address}</p>
                <p>Code Postal : {user.zip_code} {user.city}</p>
                <p>{user.country}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}