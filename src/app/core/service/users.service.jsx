import { urls } from "../resources/url.resources";
import { getAuthToken } from "./general/localStorageService";

export const getUsersService = async () => {
    try {
        const response = await fetch(`${urls.getUsers}`, {
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

// crear un nuevo usuario 

export const createUserService = async (data) => {
    try {
        const response = await fetch(`${urls.createUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al crear el usuario');
        }
        const result = await response.json();
        return result; // Retorna los datos del usuario creado
    }
    catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}


// eliminar un un usuario por su correo

export const deleteUserService = async (email) => {
    try {
        const response = await fetch(`${urls.deleteUser}/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            
        });

        return response     
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}

// obtener un usuario por su correo

export const getUserService = async (email) => {
    try {
        const response = await fetch(`${urls.getUser}/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            
        });

        console.log(response)

        return response     
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}

// actualizar un usuario por su correo

export const updateUserService = async (email, data) => {
    try {
        const response = await fetch(`${urls.updateUser}/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(data),
        });

        return response     
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}