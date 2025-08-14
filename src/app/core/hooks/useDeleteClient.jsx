import { deleteClientService } from "../service/clients.service";

export const useDeleteClient = () => {
    const deleteClient = async (id) => {
        return await deleteClientService(id);
    };
    return { deleteClient };
};