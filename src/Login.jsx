import React, { useState } from "react";
import { postData } from "./api";

function Login({ onShowRegister, onClose, onShowForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postData("/login", { email, password });
      if (data.access_token === true) {
        throw new Error("Le token d'accès est invalide.");
      }
      localStorage.setItem("token", data.access_token);
      if (onClose) onClose();
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Une erreur est survenue.";
      setError(errorMessage);
      console.error("Erreur lors de la connexion:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <div className="text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4"
            required
          />
          Conserver la session
        </label>
      </div>
      <button
        type="submit"
        className="bg-loomilightpink text-white py-3 rounded font-bold mt-2 cursor-pointer hover:bg-loomipink transition duration-300"
      >
        SE CONNECTER
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
