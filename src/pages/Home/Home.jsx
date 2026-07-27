
import { Link } from "react-router-dom";
import "./style.css";

export default function Home(){
    return (
        <div className="home-container">
            {/* "Hero" Section */}

            <section className="hero-section">
                <div className="hero-badge">🛡️ Segurança Zero-Knowledge</div>

                <h1 className="hero-title"> Guarde seus segredos em um <span className="text-highlight">Cofre Digital</span> impenetrável</h1>

                <p className="hero-subtitle">Criptografia de ponta a ponta (AES-256) diretamente no seu navegador. Suas chaves e notas confidenciais nunca saem desprotegidas.</p>

                <div className="hero-actions">
                    <Link to={"/caderno"} className="btn-primary-hero">✍️ Criar Novo Segredo</Link>

                    <Link to={"/gerador"} className="btn-secondary-hero">🗝️ Gerar Chave Forte</Link>
                </div>
            </section>

            {/* GRID de Recursos */}
            <section className="features-section">
                <div className="feature-card">
                    <div className="feature Icon">🔒</div>
                    <h3>Criptografia AES-256</h3>

                    <p>Utilizamos o mesmo padrão de segurança adotado por governos e instituições globais.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Processamento Local</h3>

                    <p>Tudo é cifrado no seu próprio dispositivo. Ninguém, nem mesmo o servidor, tem acesso a ao seu texto puro.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🏛️</div>

                    <h3>Pronto para Nuvem</h3>
                    <p>Arquitetura projetada para integração segura com nosso backend Java Spring Boot corporativo.</p>
                </div>
            </section>
        </div>
    );
}