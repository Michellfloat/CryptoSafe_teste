import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import "./caderno.css"

const schema = z.object({
    key: z.string().min(4, 'A chave deve ter pelo menos 4 caracteres'),
    note: z.string().min(1, 'Escreva algo, o segredo não pode estar vazio'),
})

export default function CadernoSegredos() {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        try {
            const textoCifrado = CryptoJS.AES.encrypt(data.note, data.key).toString();

            const notasSalvas = JSON.parse(localStorage.getItem("secure-notes") || '[]');

            const novaLista = [...notasSalvas, { id: Date.now(), conteudo: textoCifrado, dataCriacao: new Date().toLocaleDateString("pt-BR"), },];

            localStorage.setItem('secure-notes', JSON.stringify(novaLista));

            toast.success('Seu segredo foi criptografado e armazenado no cofre com sucesso!');
            reset();
        } catch (error) {
            toast.error('Erro ao criptografar a mensagem.')
        }
    }

    return (
        <div className="caderno-container">
            <div className="vault-form-card">
                <div className="form-header">
                    <h2>Novo Segredo</h2>

                    <p>Digite as informações abaixo para cifrar seus dados com criptografia AES-256.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="vault-form">
                    <div className="form-group">
                        <label htmlFor="key">Chave Mestra (Senha de Criptografia)</label>

                        <div className="input-wrapper">
                            <span className="input-icon">🗝️</span>
                            <input id="key"
                                   type="text"
                                   {...register("key")}
                                   placeholder="Digite a sua chave de segurança..."
                                   className={errors.key ? "vault-input input-error" : "vault-input"} />
                        </div>
                        {errors.key && <span className="error-message">{errors.key.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="note">Seu Segredo Confidencial</label>

                        <textarea id="note"
                                  {...register("note")}
                                  rows={5}
                                  placeholder="Escreva algo confidencial aqui..."
                                  className={errors.note ? "vault-textarea input-error" : "vault-textarea"}/>
                                
                                {errors.note && <span className="error-message">{errors.note.message}</span>}                                  
                    </div>

                    <button type="submit" className="btn-vault-primary">🔐 Criptografar e guardar no Cofre</button>
                </form>
            </div>
        </div>
    );
}