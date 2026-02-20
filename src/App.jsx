import React, { useState, useEffect } from "react";
import CryptoJS from 'crypto-js'; // Biblioteca "Crypto JS", responsável pela segurança //

function CryptoSafe() {
    // variáveis para armazenar as notas e chaves de segurança //
    const [nota, setNota] = useState(''); // useState vazio para armazenar o que for digitado //
    const [chave, setChave] = useState(""); // armazenar a chave //
    const [notaSalva, setNotaSalva] = useState([]); // Salvar todas as anotações em um Array vazio //

    // Uso do "useEffect" para puxar as notas do LocalStorage ao iniciar o app
    useEffect(() => {
        const data = localStorage.getItem('secure-notes'); // pega o que está salvo em 'secure-notes' //
        if (data) setNotaSalva(JSON.parse(data)); // Averigua se o que está sendo passado para 'data' é um JSON //
    }, [] // array de dependências (executa uma vez ao carregar) //
    );

    // Criação da função que irá criptografar e salvar as notas //
    const notaSalvada = () => {
        if (!nota || !chave)
            return alert("Preencha tanto a nota quanto a chave!!!");
        // A função averigua se a nota e a chave foram inseridas, caso contrário, exibe um alerta //

        // Hora de usar criptografia: transformar um texto em uma string cifrada, com o "AES"
        const textoCrifado = CryptoJS.AES.encrypt(nota, chave).toString(); // transformando o que estiver em 'nota' e 'chave' em uma string criptografada //

        const novasNotas = [...notaSalva, textoCrifado];
        setNotaSalva(novasNotas); // a função 'setNotaSalva' vai receber o que estiver em 'novasNotas' e então será ativada //
        localStorage.setItem('secure-notes', JSON.stringify(novasNotas)); // adicionará ao 'LocalStorage' as novas notas inseridas pelo usuário //
        setNota(''); // Após salvar, o campo será limpo.
    };

    // --- NOVA FUNÇÃO: Para deletar notas indesejadas ---
    const deletarNota = (indexParaRemover) => {
        // Criamos uma nova lista filtrando (removendo) apenas o item que clicamos pelo seu índice //
        const listaAtualizada = notaSalva.filter((_, index) => index !== indexParaRemover);
        
        setNotaSalva(listaAtualizada); // Atualiza o estado das notas na tela //
        localStorage.setItem('secure-notes', JSON.stringify(listaAtualizada)); // Atualiza o LocalStorage para a nota sumir permanentemente //
    };

    // Função para descriptografar //
    const decriptoNota = (textoCrifadoParaExibir) => {
        const passelivre = prompt("Digite a chave secreta para ver a(s) nota(s)"); // input para o usuário digitar //
        try {
            // hora da descriptografia: tentativa para reverter o processo com a chave fornecida //
            const bytes = CryptoJS.AES.decrypt(textoCrifadoParaExibir, passelivre); // armazena em 'bytes' o que estiver em 'textoCrifado' e a chave descriptografada //

            const textoOriginal = bytes.toString(CryptoJS.enc.Utf8); // pega o que estiver em bytes e transforma em um texto "utf8" (padrão)

            if (!textoOriginal) throw new Error();
            alert("Conteúdo da nota:\n" + textoOriginal);

        } catch (error) {
            alert("Chave incorreta!!!\n acesso negado.");
        }
    };

    // HTML dentro do JS //
    return (
        <div style={{ padding: '20px', fontFamily: 'Times New Roman' }}>
            <h1>🔐 CryptoSafe</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Sua Chave Mestra aqui:"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    style={{ display: "block", marginBottom: '10px' }}
                />
                <textarea
                    placeholder="Escreva o seu segredinho..."
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    rows="4"
                    style={{ display: "block", width: '100%', marginBottom: '10px' }}
                ></textarea>

                {/* Botão que ativa a função de salvar e criptografar */}
                <button onClick={notaSalvada} style={{ cursor: 'pointer' }}>
                    Criptografar e Salvar
                </button>
            </div>
            
            <hr />
            
            <h3>Notas Armazenadas (Criptografadas no 'LocalStorage'):</h3>
            <ul>
                {notaSalva.map((n, index) => (
                    <li key={index} style={{ marginBottom: '10px', wordBreak: 'break-all' }}>
                        <strong>Nota {index + 1}:</strong> {n.substring(0, 20)}... 
                        
                        {/* Botão para Descriptografar */}
                        <button onClick={() => decriptoNota(n)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            Descriptografar
                        </button>

                        {/* NOVO: Botão para Deletar a nota */}
                        <button 
                            onClick={() => deletarNota(index)} 
                            style={{ marginLeft: '5px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                            Deletar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CryptoSafe;