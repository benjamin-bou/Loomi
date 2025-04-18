import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F0]">
      {/* Menu latéral */}
      <aside className="w-64 bg-white shadow-lg p-8 flex flex-col gap-8">
        <button
          className="text-left text-lg font-semibold hover:text-loomilightpink transition"
          onClick={() => navigate("/admin/boxes")}
        >
          Liste des boites
        </button>
        <button
          className="text-left text-lg font-semibold hover:text-loomilightpink transition"
          onClick={() => navigate("/admin/payments")}
        >
          Derniers paiements
        </button>
        <button
          className="text-left text-lg font-semibold text-red-500 hover:text-red-700 transition mt-auto"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </aside>
      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Gestion des Box</h2>
            <a href="/admin/boxes" className="text-blue-600 hover:underline">Voir les box</a>
          </div>
          {/* Ajoute ici d'autres sections admin si besoin */}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
