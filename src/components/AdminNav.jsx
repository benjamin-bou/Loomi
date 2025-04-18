import { useLocation, useNavigate } from "react-router-dom";

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const isActive = (path) => location.pathname === path;
  return (
    <aside className="w-64 bg-white shadow-lg p-8 flex flex-col gap-8 h-screen">
      <button
        className={`text-left text-lg font-semibold transition cursor-pointer ${isActive("/admin/boxes") ? "text-loomilightpink" : "hover:text-loomilightpink"}`}
        onClick={() => navigate("/admin/boxes")}
      >
        Liste des boites
      </button>
      <button
        className={`text-left text-lg font-semibold transition cursor-pointer ${isActive("/admin/payments") ? "text-loomilightpink" : "hover:text-loomilightpink"}`}
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
  );
}
