import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";

function Register() {
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
      navigate("/login");
    } catch (err) {
      setError("Une erreur est survenue :" + err.response.data.message);
      console.error("Erreur lors de l'inscription:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFF7F0]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={lastName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
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
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;