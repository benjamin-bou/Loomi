import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Créer l'envoie d'email")
    setEmail("");
  };

  return (
    <section className="bg-[#FFF7F0] py-32 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1B1B1B] mb-4">
        Abonnez vous à notre newsletter
      </h2>
      <p className="text-[#333] max-w-xl mx-auto mb-10 text-[16px] leading-[26px]">
        Ne manquez plus aucune nouveauté créative ! Accédez en exclusivité à nos
        dernières boxes, à des tuto inédits et à des astuces créatives.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-black w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-[#DB3D88] hover:bg-[#b83272] text-white px-6 py-3 rounded-xl transition-all duration-300 hover:cursor-pointer"
        >
          S’abonner
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
