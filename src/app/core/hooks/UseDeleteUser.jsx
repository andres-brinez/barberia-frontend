import { deleteUserService, } from "../service/users.service";

export const useDeleteUser = () => {


    const deleteUser = (email) => {
        deleteUserService(email)
            .then((response) => {

                const statusCode = response.status;
                const messages = {
                    204: "Usuario eliminado correctamente",
                    200: "Usuario eliminado correctamente",
                    400: "Solicitud incorrecta",
                    404: "El usuario no existe",
                    default: "Error al eliminar el usuario",
                };
                const message = messages[statusCode] || messages.default;
                alert(message);
            })
            .catch((error) => {
                console.log(error)

            });
    };



    return { deleteUser }
}