import { useEffect, useState } from "react";
import { fetchData, postData } from "../api";
import MainButton from "../components/addOns/MainButton";
// import { useNavigate } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import OrderStep1Skeleton from "../components/OrderStep1Skeleton";

export default function OrderStep1({ user, setUser, onNext }) {
  const [form, setForm] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    address: user?.address || "",
    zipcode: user?.zipcode || "",
    city: user?.city || "",
  });
  const [error, setError] = useState("");
  const [loginTrigger, setLoginTrigger] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token && (!user || !user.email)) {
      fetchData('/profile')
        .then(data => setUser(data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else if (!token && user) {
      setUser(null);
      setLoading(false);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [loginTrigger]);

  // Remplit automatiquement le formulaire si user a déjà des infos
  useEffect(() => {
    if (user && user.first_name) {
      setForm({
        address: user.address || "",
        zipcode: user.zipcode || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSubmitting(true);
    // Vérifie que tous les champs sont remplis
    if (!form.address || !form.zipcode || !form.city) {
      setError("Merci de remplir tous les champs de livraison.");
      setSubmitting(false);
      return;
    }
    postData('/profile', {
        address: form.address,
        zipcode: form.zipcode,
        city: form.city,
      })
    .then(() => {
      setError("");
      setUser({ ...user, ...form });
      onNext();
    })
    .catch(err => {
      let errorMessage = "Erreur lors de la mise à jour des informations de livraison. Veuillez réessayer.";
      if (err.response && err.response.data && err.response.data.errors) {
        errorMessage = Object.values(err.response.data.errors).flat().join(' ');
      }
      setError(errorMessage);
      console.error("Erreur lors de la mise à jour du profil :", err);
      return;
    })
    .finally(() => {
      setSubmitting(false);
    });
  };
  return (
    <>
      {loading ? (
        <OrderStep1Skeleton />
      ) : (
        <div className="flex flex-col py-15 bg-[#FFF7F0] items-center gap-15">
          <div className="flex items-center justify-center">
            {/* Bloc login à gauche */}
            <div className="bg-white rounded-l-2xl shadow-md p-8 w-full max-w-md flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6 text-center">{user && user.email ? 'Connecté' : (showRegister ? "Inscris-toi" : "Connecte toi")}</h2>              {user && user.email ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center">
                  <p className="text-sm text-gray-600 mt-1">{user.first_name} {user.last_name}</p>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                  </div>
                  <MainButton
                    onClick={() => { localStorage.removeItem('token'); setUser(null); window.location.reload(); }}
                    text="Changer de compte"
                  />
                </div>
              ) : (
                showRegister ? (
                  <Register onShowLogin={() => setShowRegister(false)} />
                ) : (
                  <Login 
                    onLoginSuccess={() => setLoginTrigger(t => t + 1)} 
                    onShowRegister={() => setShowRegister(true)}
                  />
                )
              )}
            </div>
            {/* Trait vertical */}
            <div className="h-[500px] w-[2px] bg-gray-200 mx-0 md:mx-8" />
            {/* Bloc informations de livraison à droite */}
            <div className="bg-white rounded-r-2xl shadow-md p-8 w-full max-w-md flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6 text-center">Informations de livraison</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse" className="border rounded p-2" />
                <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Code postal" className="border rounded p-2" />
                <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="border rounded p-2" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            </div>
          </div>
          <MainButton 
            text={submitting ? "En cours..." : "Continuer vers le paiement"} 
            onClick={() => handleSubmit()} 
            disabled={submitting}
          />
        </div>
      )}
    </>
  );
}
