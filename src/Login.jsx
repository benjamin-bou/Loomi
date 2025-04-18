import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";
import close from "/images/picto/close.svg"; // Assurez-vous que le chemin est correct

function Login({showLogin, setShowLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postData("/login", { email, password });
      console.log("Réponse de l'API:", data);

      if (data.access_token === true) {
        throw new Error("Le token d'accès est invalide.");
      }

      localStorage.setItem("token", data.access_token);
      setShowLogin(false); // Fermer la fenêtre de connexion
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue.";
      setError(errorMessage);
      console.error("Erreur lors de la connexion:", err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white z-50 flex flex-col p-8 transition-all duration-300 ease-in-out ${showLogin ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
      style={{ boxShadow: showLogin ? "-2px 0 8px rgba(0,0,0,0.1)" : "none" }}
    >
      {/* <button className="self-end text-xl mb-4" onClick={() => setShowLogin(false)}>&times;</button> */}
      <a onClick={() => setShowLogin(false)} href="/" className="w-[fit-content] self-end"><img src={close} alt="logo" className="p-2 cursor-pointer select-none" /></a>
      <form onSubmit={handleSubmit} className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-loomilightpink text-white px-4 py-2 rounded cursor-pointer">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;