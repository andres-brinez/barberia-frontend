import { updateClientService } from "../service/clients.service";

export const useUpdateClient = () => {

    const updateClient = (id, clientData) => {
        
        // El servicio ya maneja los errores de respuesta no exitosa y propaga los errores.
        // Simplemente llamamos al servicio y devolvemos la promesa resultante.
        return updateClientService(id, clientData);
    };

    return { updateClient };
};