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

// crear cliente
export const createClientService = async (formData) => {
    try {
        const response = await fetch(`${urls.createClient}`, {
            method: 'POST',
            headers: {

                'Authorization': `Bearer ${getAuthToken()}`
            },
             body: formData, // Enviar el FormData directamente,
        });

        if (response.status !=  200 && response.status != 201) {
            throw new Error('Error al crear el cliente');
        }
        const result = await response.json();
        return result; // Retorna los datos del usuario creado
    }
    catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const getClientService = async (id) => {
    try {
        const response = await fetch(`${urls.getClients}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            
        });
        if (!response.ok) {
            throw new Error(`Error al obtener el cliente: ${response.statusText}`);
        }
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const updateClientService = async (id, data) => {
    try {
        const response = await fetch(`${urls.updateClient}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            
            body: JSON.stringify(data),
        });
        console.log(response.status)

        if (response.status !=  200 && response.status != 201) {
            throw new Error('Error al actualizar el cliente');
        }
        const result = await response.json();
        return result; // Retorna los datos del usuario creado
    }
    catch (error) {
        console.error('Error al actualizar el cliente:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}
