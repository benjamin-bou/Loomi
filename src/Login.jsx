import React, { useState } from "react";
import { postData } from "./api";
import close from "/images/picto/close.svg";
import logo from "/images/picto/logo_phase_1.svg";

function Login({ showLogin, setShowLogin, onShowRegister }) {
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
      setShowLogin(false);
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
    <div>
      <div className={showLogin ? `fixed top-0 left-0 w-full h-full bg-[#5f5f5f7d] z-40 transition-all duration-300 cursor-pointer` : ""} onClick={() => setShowLogin(false)}></div>
    <div
      className={`fixed top-0 right-0 h-full bg-white z-50 flex flex-col p-6 transition-all duration-300 ease-in-out ${
        showLogin ? "w-[400px] opacity-100" : "w-0 opacity-0 pointer-events-none"
      }`}
      style={{ boxShadow: showLogin ? "-2px 0 8px rgba(0,0,0,0.1)" : "none" }}
    >
      {/* Close button */}
      <button onClick={() => setShowLogin(false)} className="p-2 cursor-pointer">
        <img src={close} alt="fermer" className="h-6 w-6" />
      </button>

      {/* Logo */}
      <div className="flex justify-center my-4">
        <img src={logo} alt="logo" className="h-28" />
      </div>

      {/* Titre */}
      <h2 className="text-xl text-center font-bold mb-6">Connecte-toi ou crée ton compte</h2>

      {/* Formulaire */}
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
        />

        {/* Session + mot de passe oublié */}
        <div className="text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4"
            />
            Conserver la session
          </label>
        </div>

        {/* Bouton connexion */}
        <button
          type="submit"
          className="bg-black text-white py-3 rounded font-bold mt-2"
        >
          SE CONNECTER
        </button>
        <a href="#" className="text-black underline self-end text-sm">
            Tu as oublié ton mot de passe ?
          </a>
      </form>

      {/* Inscription */}
      <p className="text-center text-sm mt-6">
        Tu n'as pas de compte ?{" "}
        <a onClick={() => onShowRegister()} className="font-bold underline cursor-pointer">
          Inscris-toi
        </a>
      </p>
    </div>
    </div>
  );
}

export default Login;
