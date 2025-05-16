import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#FFF7F0]">
      <AdminNav />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
