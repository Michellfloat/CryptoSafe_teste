import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

export default function Header() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <header className="vault-header">
            <div className="header-container">
                <div className="logo-brand">
                    <span className="logo-icon">🔐</span>
                    <span className="logo-text">
                        Crypto<span className="logo-highlight">Safe</span>
                    </span>
                </div>

                <nav className="nav-menu">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Home
                    </NavLink>
                    <NavLink to="/caderno" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Caderno
                    </NavLink>
                    <NavLink to="/armazenados" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Segredos
                    </NavLink>
                    <NavLink to="/gerador" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Gerador
                    </NavLink>
                    <NavLink to="/sobre" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Sobre
                    </NavLink>
                </nav>

                <button className="theme-toggle-btn" onClick={toggleTheme} title="Alternar Tema">
                    {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
                </button>
            </div>
        </header>
    );
}