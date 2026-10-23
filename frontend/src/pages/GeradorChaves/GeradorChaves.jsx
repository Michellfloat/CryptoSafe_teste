
import { useState } from "react"
import "./gerador.css"
import { toast } from "react-toastify";

export default function GeradorChaves() {
    const [comprimento, setComprimento] = useState(16);
    const [incluirNumeros, setIncluirNumeros] = useState(true);
    const [incluirSimbolos, setIncluirSimbolos] = useState(true);
    const [incluirMaiusculas, setIncluirMaiusculas] = useState(true);
    const [chaveGerada, setChaveGerada] = useState("");

    const gerarChave = () => {
        let caracteres = "abcdefghijklmnopqrstuvwxyz";
        if (incluirMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (incluirNumeros) caracteres += "1234567890";
        if (incluirSimbolos) caracteres += "!@#$%&*()_+=-{}[]|;.,<>?§^~";

        let resultado = "";
        for (let i = 0; i < comprimento; i++){
            const idx = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres.charAt(idx);
        }

        setChaveGerada(resultado);
        toast.success("Nova chave mestra gerada!")
    };

    const copiarChave = () => {
        if (!chaveGerada) return;
        navigator.clipboard.writeText(chaveGerada);
        toast.info("Chave copiada para a área de transferência!!");
    };

    return (
        <div className="gerador-container">
            <div className="gerador-card">
                <h2>🗝️ Gerador de chaves fortes</h2>

                <p className="gerador-desc">Crie senhas mestras de alta entropia para proteger seus segredos. 🤫</p>

                {/* Display da Chave Gerada */}
                <div className="display-box">
                    <input type="text"
                           readOnly
                           value={chaveGerada}
                           placeholder="Clique em Gerar..."
                           className="chave-input-display" />

                    <button onClick={copiarChave} disabled={!chaveGerada} className="btn-copiar">📋 Copiar</button>
                </div>

                {/* Controles de Configuração */}
                <div className="controles-group">
                    <div className="controle-slider">
                        <label>Tamanho da Chave: <strong>{comprimento} caracteres</strong></label>

                        <input type="range"
                               min={"8"}
                               max={"32"}
                               value={comprimento}
                               onChange={(e) => setComprimento(Number(e.target.value))} />
                    </div>

                    <div className="opcoes-grid">
                        <label className="checkbox-label">
                            <input type="checkbox"
                                   checked={incluirMaiusculas}
                                   onChange={(e) => setIncluirMaiusculas(e.target.checked)} />
                                   Letras Maiúsculas (A-Z)
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox"
                                   checked={incluirNumeros}
                                   onChange={(e) => setIncluirNumeros(e.target.checked)} />
                                   Números (0-9)
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox"
                                   checked={incluirSimbolos}
                                   onChange={(e) => setIncluirSimbolos(e.target.checked)} />
                                   Símbolos (!@#$...)
                        </label>
                    </div>
                </div>

                <button onClick={gerarChave} className="btn-gerar-chave">⚡ Gerar Nova Chave</button>
            </div>
        </div>
    );
}