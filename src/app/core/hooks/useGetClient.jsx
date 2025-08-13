import { getClientService } from "../service/clients.service";
export const useGetClientById = () => {
    const getClientById = async (id) => {
        try {
            const client = await getClientService(id);
            if (!client) {
                alert('Cliente no encontrado');
                return null; // Retorna null si no se encuentra el cliente
            }
            console.log('Respuesta del servicio de obtención del cliente:', client);
            return client; // Retorna el cliente
        } catch (error) {
            console.log(error);
            return null; // Retorna null en caso de error
        }
    };
    return { getClientById };
};