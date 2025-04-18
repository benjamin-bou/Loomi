import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";
import close from "/images/picto/close.svg";
import logo from "/images/picto/logo_phase_1.svg";

function Register({ showRegister, setShowRegister, onShowLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData("/register", { lastName, firstName, email, password });
      if (setShowRegister) setShowRegister(false);
      if (onShowLogin) onShowLogin();
      else navigate("/login");
    } catch (err) {
      setError("Une erreur est survenue :" + (err.response?.data?.message || err.message));
      console.error("Erreur lors de l'inscription:", err);
    }
  };

  return (
    <div>
      <div className={showRegister ? `fixed top-0 left-0 w-full h-full bg-[#5f5f5f7d] z-40 transition-all duration-300 cursor-pointer` : ""} onClick={() => setShowRegister && setShowRegister(false)}></div>
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 flex flex-col p-6 transition-all duration-300 ease-in-out ${
          showRegister ? "w-[400px] opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
        style={{ boxShadow: showRegister ? "-2px 0 8px rgba(0,0,0,0.1)" : "none" }}
      >
        {/* Close button */}
        <button onClick={() => setShowRegister && setShowRegister(false)} className="p-2 cursor-pointer">
          <img src={close} alt="fermer" className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center my-4">
          <img src={logo} alt="logo" className="h-28" />
        </div>

        {/* Titre */}
        <h2 className="text-xl text-center font-bold mb-6">Créer un compte</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 border border-gray-300 rounded w-full"
          />
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
          <button
            type="submit"
            className="bg-black text-white py-3 rounded font-bold mt-2"
          >
            S'INSCRIRE
          </button>
        </form>

        {/* Connexion */}
        <p className="text-center text-sm mt-6">
          Déjà un compte ?{" "}
          <a onClick={() => onShowLogin && onShowLogin()} className="font-bold underline cursor-pointer">
            Connecte-toi
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;