import { authServiceLogin } from "../service/auth.service";
import { useState } from "react";
import { AppContext } from "../state/AppContext";
import { useNavigate } from "react-router-dom";
import { getAuthData, saveAuthData } from "../service/general/localStorageService";

export const useAuthLogin = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const authenticate = (credentials) => authServiceLogin(credentials).then((response) => {
        console.log('Respuesta del servicio de autenticación:', response);
        const { token, email, username, roles } = response;

        saveAuthData({ token, email, username, roles });
        console.log(getAuthData());
        
        navigate('/dashboard'); // Redirige a la página de inicio después del login exitoso

        setIsError(false);

    }).catch((error) => {
        console.error('Error en la autenticación:', error);
        setIsError(true);
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    });

    return { authenticate, errorMessage, isError };
};