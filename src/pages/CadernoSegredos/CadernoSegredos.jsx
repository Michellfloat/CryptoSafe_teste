import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Unexpected server error'

            console.error(`[HTTP ERROR ${status}]`, error.response.data);

            switch (status) {
                case 400:
                    toast.error(`Invalid Request (400): ${message}`);
                    break;
                case 401:
                    toast.error('Not Authorized (401). Verifique suas credenciais.');
                    break;
                case 403:
                    toast.error('Acess Denied (403).');
                    break;
                case 404:
                    toast.error('Recourse Not Found (404).')
                    break;
                case 500:
                    toast.error('Internal Server Error (500). Tente novamente mais tarde.')
                default:
                    toast.error(`Error (${status}): ${message}`)
                    break;
            }
    
        } else if (error.request) {
            console.error('[HTTP NET ERROR]: No Server Response.', error.request);

            toast.error('Não foi possível se conectar ao servidor');
        }else{
            console.error('[CONFIG ERROR]:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;