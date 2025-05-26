import { useEffect, useState } from "react";
import { fetchData } from "../api";
import MainButton from "../components/addOns/MainButton";
import { useNavigate } from "react-router-dom";

export default function OrderStep1({ user, setUser, onNext }) {
  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    address: user?.address || "",
    zipcode: user?.zipcode || "",
    city: user?.city || "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchData('/profile')
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifie que tous les champs sont remplis
    if (!form.first_name || !form.last_name || !form.address || !form.zipcode || !form.city) {
      setError("Merci de remplir tous les champs de livraison.");
      return;
    }
    // Ici tu peux faire un appel API pour enregistrer les infos si besoin
    setUser({ ...user, ...form });
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF7F0]">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">1. Connexion & Livraison</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Prénom" className="border rounded p-2" />
          <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Nom" className="border rounded p-2" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse" className="border rounded p-2" />
          <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Code postal" className="border rounded p-2" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="border rounded p-2" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MainButton text="Continuer vers le paiement" type="submit" />
        </form>
        <button className="mt-4 text-blue-600 underline" onClick={() => navigate('/login')}>Se connecter avec un autre compte</button>
      </div>
    </div>
  );
}
