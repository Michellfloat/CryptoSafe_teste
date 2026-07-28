import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./segredos.css"
export default function SegredosArmazenados() {
    const [notas, setNotas] = useState([]);

    const [chaveInput, setChaveInput] = useState({});

    const [revelados, setRevelados] = useState({});

    useEffect(() => {
        const data = localStorage.getItem('secure-notes');
        if (data) setNotas(JSON.parse(data));
    }, []);

    const deletarNota = (id) => {
        const listaAtualizada = notas.filter((item) => item.id !== id);
        setNotas(listaAtualizada);

        localStorage.setItem('secure-notes', JSON.stringify(listaAtualizada));
        toast.info('Segredo removido permanentemente.');
    };

    const descriptografar = (id, conteudoCifrado) => {
        const chave = chaveInput[id];
        if (!chave) {
            toast.warning('Digite a chave secreta apra abrir este segredo.');
            return;
        }
        try {
            const bytes = CryptoJS.AES.decrypt(conteudoCifrado, chave);
            const textoOriginal = bytes.toString(CryptoJS.enc.Utf8);

            if (!textoOriginal) throw new Error();

            setRevelados((prev) => ({ ...prev, [id]: textoOriginal }));
            toast.success('Segredo revelado com sucesso!');
        } catch (error) {
            toast.error('chave incorreta! Acesso negado.')
        }
    };

    return (
        <div className="armazenados-container">
            <div className="armazenados-header">
                <h2>Cofre de Segredos</h2>

                <span className="badge-count">{notas.length} Item(ns) Protegidos</span>
            </div>

            {notas.length === 0 ? (
                <div className="empty-vault">
                    <div className="empty-icon">🔓</div>
                    <h3>Cofre Vazio</h3>
                    <p>Não existe nenhum segredo armazenado ainda. Crie um no Caderno!</p>
                </div>
            ) : (
                /*GRID de Blocos Dinâmicos */
                <div className="secrets-grid">
                    {notas.map((item, idx) => {
                        const isUnlocked = !!revelados[item.id];

                        return (
                            <div key={item.id}
                                className={`secret-card ${isUnlocked ? "unlocked" : "locked"}`}>

                                {/* Overlay de Correntes para segredos ocultos */}

                                {!isUnlocked && (
                                    <div className="chains-overlay">
                                        <span className="chain-link top-left">⛓️</span>

                                        <span className="chain-link top-right">⛓️</span>

                                        <span className="chain-link top-left">🔒 Trancado</span>

                                        <span className="chain-link bottom-left">⛓️</span>

                                        <span className="chain-link bottom-right">⛓️</span>
                                    </div>
                                )}

                                <div className="card-top">
                                    <span className="secret-number">Segredo #{ }</span>

                                    <span className="secret-date">Criado: {item.dataCriacao}</span>
                                </div>

                                <div className="card-content">
                                    {isUnlocked ? (
                                        <div className="unlocked-text">
                                            <span className="status-tag"> 🟢 Descriptografado</span>
                                            <p>{revelados[item.id]}</p>
                                        </div>
                                    ) : (
                                        <div className="locked-text">
                                            <p className="hash-preview">
                                                <code>Hash: {item.conteudo.substring(0, 32)}...</code>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="card-actions">
                                    {!isUnlocked && (
                                        <div className="decrypt-box">
                                            <input type="password"
                                                placeholder="Chave para abrir"
                                                value={chaveInput[item.id] || ""}
                                                onChange={(e) =>
                                                    setChaveInput({ ...chaveInput, [item.id]: e.target.value })
                                                }
                                                className="key-input-inline" />
                                            <button
                                                onClick={() => descriptografar(item.id, item.conteudo)}
                                                className="btn-decrypt">Abrir
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => deletarNota(item.id)}
                                        className="btn-delete"
                                        title="Excluir segredo">🗑️ Deletar</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}