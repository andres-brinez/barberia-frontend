import { urls } from "../resources/url.resources";
import { getAuthToken } from "./general/localStorageService";

export const getClientsService = async () => {
    try {
        const response = await fetch(`${urls.getClients}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            
        });

        console.log(response.status)

        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }

        const data = await response.json();
        return data; // Retorna los datos del usuario o token
    } catch (error) {
        console.error('Error :', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
    
}