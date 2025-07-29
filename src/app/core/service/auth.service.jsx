import { urls } from '../resources/url.resources.jsx';


export const authServiceLogin = async (credentials) => {
    try {
        const response = await fetch(`${urls.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        return data; // Retorna los datos del usuario o token
    } catch (error) {
        console.error('Error en authServiceLogin:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
    
}