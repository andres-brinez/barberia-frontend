import { createClientService } from "../service/clients.service";

export const useCreateCliente = () => {


    const createClient = async (formData) => {
        try {
            const response = await createClientService(formData);
            alert(response.status)
            
            // si es diferente a 200 se lanza un error
            if (response.status !== 200) {
                throw new Error(`Error al crear el usuario: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    };

    return { createClient };

};