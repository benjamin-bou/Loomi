import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api";

function Register({ onShowLogin, onClose }) {
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
      if (onClose) onClose();
      if (onShowLogin) onShowLogin();
      else navigate("/login");
    } catch (err) {
      setError("Une erreur est survenue :" + (err.response?.data?.message || err.message));
      console.error("Erreur lors de l'inscription:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="Nom*"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Prénom*"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="email"
        placeholder="E-mail*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="password"
        placeholder="Mot de passe*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-loomilightpink hover:bg-loomipink cursor-pointer transition duration-300 text-white py-3 rounded font-bold mt-2"
      >
        S'INSCRIRE
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