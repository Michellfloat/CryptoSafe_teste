
import "./style.css"
export default function Footer(){
    return(
        <footer className="vault-footer">
            <div className="footer-container">
                <div className="security-badge">
                    <span className="badge-pulse"></span>
                    
                    <span>Criptografia Ativa: AES-256 (Zero-Knowledge)</span>
                </div>
                    <p className="footer-copyright"> &copy {new Date().getFullYear()} <strong>CryptoSafe</strong> - Todos os Direitos reservados</p>

                    <p className="footer-subtext">Segurança de Ponta a Ponta. Seus segredos são cifrados no navegador e nunca nunca saem desprotegidos. 🤫</p>
            </div>
        </footer>
    );
}