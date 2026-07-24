import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        <div>
            <h2>Segredos Armazenados</h2>
            {notas.length === 0 ? (
                <p>Não existe nenhum segredo armazenado,ainda...</p>
            ) : (
                <ul>
                    {notas.map((item, idx) => (
                        <li key={item.id}>
                            <p><strong>Segredo #{idx + 1}</strong> - <small>Criado em: {item.dataCriacao}</small></p>

                            <p>
                                {revelados[item.id] ? `Revelado: ${revelados[item.id]}` : ` Hash: ${item.conteudo.substring(0, 30)}...`}
                            </p>

                            <div>
                                {!revelados[item.id] && (
                                    <>
                                        <input type="password"
                                            placeholder="Chave para abrir"
                                            value={chaveInput[item.id] || ''}
                                            onChange={(e) => setChaveInput({ ...chaveInput, [item.id]: e.target.value })} />
                                        <button onClick={() => descriptografar(item.id, item.conteudo)}>Descriptografar</button>
                                    </>
                                )}
                                <button onClick={() => deletarNota(item.id)}>Deletar</button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}