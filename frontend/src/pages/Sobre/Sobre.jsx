
import "./sobre.css"

export default function Sobre() {
    return (
        <div className="sobre-container">
            <div className="sobre-content">
                <h2>🛡️ Sobre o cryptoSafe</h2>

                <p className="lead-text">O CryptoSafe foi concebido como um cofre pessoal de informações confidenciais estruturado sob os princípios de privacidade por design (Privacy by Design).</p>

                <hr className="divider"/>

                <div className="info-block">
                    {/*TODO:Finalizar o "Sobre", AppRoutes e o App.jsx e por fim:Desenvolver o BackEnd */}
                    <h3>🔐 Arquitetura Zero-Knowledge</h3>

                    <p>Em um sistema Zero-Knowledge (Conhecimento Zero), a aplicação não possui conhecimento sobre o conteúdo real da informação tratada. <br /> A Criptografia é executada</p>
                </div>

                <div className="info-block">
                    <h3>☕ Evolução BackEnd (via Java Spring Boot:Em desenvolvimento)</h3>

                    <p>Em sua próxima versão, o projeto entegrará um backend robusto em <strong>Java 21+ mais Spring Boot</strong>, responsável por gerenciar persistência via Mysql, autenticação JWT e auditoria, sem violar a privacidade dos segredos criptografados do usuário.</p>
                </div>

                <div className="tech-stack-section">
                    <h4>Tecnologias Utilizadas no FrontEnd:</h4>

                    <div className="chips-wrapper">
                        <span className="tech-chip">React 19</span>
                        <span className="tech-chip">Vite</span>
                        <span className="tech-chip">Crypto JS (AES-256)</span>
                        <span className="tech-chip">React Hook Form</span>
                        <span className="tech-chip">Zod</span>
                        <span className="tech-chip">React Router DOM</span>
                        <span className="tech-chip">React Toastify</span>
                    </div>
                </div>
            </div>
        </div>
    );
}