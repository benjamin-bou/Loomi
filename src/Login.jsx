import React, { useState } from "react";
import { postData } from "./api";

function Login({ onShowRegister, onClose, onShowForgot, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await postData("/login", { email, password });
      if (!data.access_token || typeof data.access_token !== 'string') {
        throw new Error("Le token d'accès est invalide.");
      }
      localStorage.setItem("token", data.access_token);
      if (onClose) onClose();
      if (typeof onLoginSuccess === 'function') onLoginSuccess();
      setEmail("");
      setPassword("");
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Une erreur est survenue.";
      setError(errorMessage);
      console.error("Erreur lors de la connexion:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => !loading && setEmail(e.target.value)}
        readOnly={loading}
        className="p-3 border border-gray-300 rounded w-full read-only:opacity-50 read-only:cursor-not-allowed"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => !loading && setPassword(e.target.value)}
        readOnly={loading}
        className="p-3 border border-gray-300 rounded w-full read-only:opacity-50 read-only:cursor-not-allowed"
        required
      /><div className="text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            disabled={loading}
            className="w-4 h-4 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          Conserver la session
        </label>
      </div><button
        type="submit"
        disabled={loading}
        className="bg-loomilightpink text-white py-3 rounded font-bold mt-2 cursor-pointer hover:bg-loomipink transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
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
            CONNEXION...
          </>
        ) : (
          "SE CONNECTER"
        )}
      </button>
      <a
        href="#"
        className="text-black underline self-end text-sm"
        onClick={e => { e.preventDefault(); if (typeof onShowForgot === 'function') onShowForgot(); }}
      >
        Tu as oublié ton mot de passe ?
      </a>
      <p className="text-center text-sm mt-6">
        Tu n'as pas de compte ?{" "}
        <a onClick={onShowRegister} className="font-bold underline cursor-pointer">
          Inscris-toi
        </a>
      </p>
    </form>
  );
}

export default Login;
