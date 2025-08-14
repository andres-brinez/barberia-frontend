import { createClientService } from "../service/clients.service";
export const useCreateCliente = () => {
    const createClient = async (formData) => {
        try {
            const response = await createClientService(formData);
            return response; // Retorna la respuesta para manejarla en el componente
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    };
    return { createClient };
};