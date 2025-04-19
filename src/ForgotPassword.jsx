import { useState } from "react";

function ForgotPassword({ onShowLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      // À adapter selon votre API
      const response = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Erreur lors de la demande.");
      setMessage("Si cet email existe, un lien de réinitialisation a été envoyé.");
      setEmail("");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-loomilightpink hover:bg-loomipink cursor-pointer transition duration-300 text-white py-3 rounded font-bold mt-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Envoi..." : "Réinitialiser le mot de passe"}
      </button>
      <p className="text-center text-sm mt-6">
        <a onClick={onShowLogin} className="font-bold underline cursor-pointer">
          Retour à la connexion
        </a>
      </p>
    </form>
  );
}

export default ForgotPassword;
