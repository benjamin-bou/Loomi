import { useNavigate } from "react-router-dom";

export default function AdminNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <aside className="w-64 bg-white shadow-lg p-8 flex flex-col gap-8 h-screen">
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
  );
}
