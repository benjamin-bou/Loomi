import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";

function Login() {
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
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue.";
      setError(errorMessage);
      console.error("Erreur lors de la connexion:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;