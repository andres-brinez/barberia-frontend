import { getUserService, } from "../service/users.service";

export const useGetUserByEmail = () => {


    const getUser = (email) => {
        getUserService(email)
            .then((response) => {

                console.log('Respuesta del servicio de obtención de usuario:', response);
                const user = response.data;

                if (!user) {
                    alert('Usuario no encontrado');
                    return;
                }

                return user;

            })
            .catch((error) => {
                console.log(error)

            });
    };



    return { getUser }
}