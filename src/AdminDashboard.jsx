import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  // Données factices pour les graphiques
  const [salesData, setSalesData] = useState([
    { name: "Jan", ventes: 4000 },
    { name: "Fév", ventes: 3000 },
    { name: "Mar", ventes: 5000 },
    { name: "Avr", ventes: 4780 },
    { name: "Mai", ventes: 5890 },
    { name: "Juin", ventes: 4390 },
    { name: "Juil", ventes: 6490 },
  ]);
  const [boxesData, setBoxesData] = useState([
    { name: "Kit Couture", value: 400 },
    { name: "Kit Savon", value: 300 },
    { name: "Kit Tricot", value: 300 },
  ]);
  const [usersData, setUsersData] = useState([
    { name: "Clients", value: 1200 },
    { name: "Admins", value: 3 },
  ]);
  const [salesTypeData, setSalesTypeData] = useState([
    { name: "À l'unité", value: 320 },
    { name: "Abonnement", value: 680 },
  ]);
  const [topProductsData, setTopProductsData] = useState([
    { name: "Kit Couture", ventes: 120 },
    { name: "Kit Savon", ventes: 90 },
    { name: "Kit Tricot", ventes: 70 },
  ]);
  const COLORS = ["#F4AECC", "#1B1B1B", "#FFBB28", "#00C49F"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F0]">
      {/* Menu latéral */}
      <aside className="w-64 bg-white shadow-lg p-8 flex flex-col gap-8">
        <button
          className="text-left text-lg font-semibold hover:text-loomilightpink transition cursor-pointer"
          onClick={() => navigate("/admin/boxes")}
        >
          Liste des boites
        </button>
        <button
          className="text-left text-lg font-semibold hover:text-loomilightpink transition cursor-pointer"
          onClick={() => navigate("/admin/payments")}
        >
          Derniers paiements
        </button>
        <button
          className="text-left text-lg font-semibold text-red-500 hover:text-red-700 transition mt-auto cursor-pointer"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </aside>
      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Chiffre d'affaires mensuel */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Chiffre d'affaires mensuel</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventes" fill="#F4AECC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Répartition des box vendues */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Répartition des box vendues</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={boxesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#F4AECC" label>
                  {boxesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Proportion boîtes à l'unité vs abonnement */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Proportion boîtes à l'unité / abonnement</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={salesTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {salesTypeData.map((entry, index) => (
                    <Cell key={`cell-sales-type-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Top produits vendus */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Top produits vendus</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="ventes" fill="#F4AECC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
