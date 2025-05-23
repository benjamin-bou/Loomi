import { useEffect, useState } from "react";
import { fetchData } from "../api";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPayments() {
      try {
        // À brancher sur ton endpoint réel, ici /orders en exemple
        const data = await fetchData("/orders");
        setPayments(data);
      } catch (err) {
        setError("Erreur lors du chargement des commandes.", err);
      } finally {
        setLoading(false);
      }
    }
    getPayments();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Liste des commandes</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Client</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Statut</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">Aucune commande trouvée.</td>
                </tr>
              )}
              {payments.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.customer_name || order.user?.name || "-"}</td>
                  <td className="px-4 py-2 border">{order.created_at ? new Date(order.created_at).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 border">{order.amount ? order.amount.toFixed(2) + " €" : "-"}</td>
                  <td className="px-4 py-2 border">{order.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;
