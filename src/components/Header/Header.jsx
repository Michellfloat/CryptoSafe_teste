import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <nav className="nav-container">
        <NavLink to="/" className="logo-link">
          🔐 CryptoSafe
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/caderno">Caderno</NavLink>
          </li>
          <li>
            <NavLink to="/armazenados">Segredos</NavLink>
          </li>
          <li>
            <NavLink to="/gerador">Gerador</NavLink>
          </li>
          <li>
            <NavLink to="/sobre">Sobre</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}