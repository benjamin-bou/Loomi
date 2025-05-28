import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";

function Register({ onShowLogin, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await postData("/register", { lastName, firstName, email, password });
      if (onClose) onClose();
      if (onShowLogin) onShowLogin();
      else navigate("/login");
    } catch (err) {
      setError("Une erreur est survenue :" + (err.response?.data?.message || err.message));
      console.error("Erreur lors de l'inscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}      <input
        type="text"
        placeholder="Nom*"
        value={lastName}
        onChange={(e) => !loading && setLastName(e.target.value)}
        className={`p-3 border border-gray-300 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        readOnly={loading}
        required
      />
      <input
        type="text"
        placeholder="Prénom*"
        value={firstName}
        onChange={(e) => !loading && setFirstName(e.target.value)}
        className={`p-3 border border-gray-300 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        readOnly={loading}
        required
      />
      <input
        type="email"
        placeholder="E-mail*"
        value={email}
        onChange={(e) => !loading && setEmail(e.target.value)}
        className={`p-3 border border-gray-300 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        readOnly={loading}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe*"
        value={password}
        onChange={(e) => !loading && setPassword(e.target.value)}
        className={`p-3 border border-gray-300 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        readOnly={loading}
        required
      /><button
        type="submit"
        disabled={loading}
        className={`bg-loomilightpink hover:bg-loomipink cursor-pointer transition duration-300 text-white py-3 rounded font-bold mt-2 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? "INSCRIPTION..." : "S'INSCRIRE"}
      </button>
      <p className="text-center text-sm mt-6">
        Déjà un compte ?{" "}
        <a onClick={onShowLogin} className="font-bold underline cursor-pointer">
          Connecte-toi
        </a>
      </p>
    </form>
  );
}

export default Register;