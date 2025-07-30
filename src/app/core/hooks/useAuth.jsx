import { authServiceLogin } from "../service/auth.service";
import { useContext, useState } from "react";
import { AppContext } from "../state/AppContext";
import { useNavigate } from "react-router-dom";

export const useAuthLogin = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const {dispatch } = useContext(AppContext);



    const authenticate = (credentials) => authServiceLogin(credentials).then((response) => {
        const { token, email, username, roles } = response;

        dispatch({
            type: "USER_LOGGED",
            payload: {
                token: token,
                email: email,
                userName: username,
                roles: roles,
            },
        });

        navigate('/dashboard'); // Redirige a la página de inicio después del login exitoso


        setIsError(false);
    }).catch((error) => {
        console.error('Error en la autenticación:', error);
        setIsError(true);
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    });

    return { authenticate, errorMessage, isError };
};