import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#f28585] text-white">
      <h1 className="text-3xl font-bold">Loomi</h1>
      <ul className="flex gap-6 text-lg">
        <li><NavLink to="/boxes" activeClassName="font-bold">Boites</NavLink></li>
        <li><NavLink to="/subscriptions" activeClassName="font-bold">Abonnement</NavLink></li>
        <li><NavLink to="/about" activeClassName="font-bold">À propos</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;