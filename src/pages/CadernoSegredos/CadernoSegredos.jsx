import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const schema = z.object({
    key: z.string().min(4, 'A chave deve ter pelo menos 4 caracteres'),
    note: z.string().min(1, 'Escreva algo, o segredo não pode estar vazio'),
})

export default function CadernoSegredos() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        try {
            const textoCifrado = CryptoJS.AES.encrypt(data.note, data.key).toString();
            const notasSalvas = JSON.parse(localStorage.getItem('secure-notes') || '[]');
            const novaLista = [...notasSalvas, { id: Date.now(), conteudo: textoCifrado, dataCriacap: new Date().toLocaleDateString() }];

            localStorage.setItem('secure-notes', JSON.stringify(novaLista));

            toast.success('Seu segredo foi criptografado e armazenado com sucesso!');
            reset();
        } catch (error) {
            toast.error('Erro ao criptografar a mensagem.')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Chave Mestra:</label>
                    <input type="password"
                        {...register('key')}
                        placeholder="Digite a sua chave de segurança..." />
                    {errors.key && <span>{errors.key.message}</span>}
                </div>

                <div>
                    <label>Seu Segredo:</label>
                    <textarea
                        {...register('note')}
                        rows={"5"}
                        placeholder="Escreva algo confidencial..." />
                    {errors.note && <span>{errors.note.message}</span>}
                </div>

                <button type="submit">Criptografar e Salvar</button>
            </form>
        </div>
    )
}