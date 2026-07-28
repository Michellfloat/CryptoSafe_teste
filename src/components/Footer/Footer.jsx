import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p className="footer-badge">CRIPTOGRAFIA ATIVA: AES-256 (ZERO-KNOWLEDGE)</p>
        <p>© 2026 <strong>CryptoSafe</strong> - Todos os Direitos Reservados</p>
        <p>
          <small>
            Segurança de Ponta a Ponta. Seus segredos são cifrados no navegador e nunca saem desprotegidos. 🦉
          </small>
        </p>
      </div>
    </footer>
  );
}