import { updateUserService, } from "../service/users.service";

export const useUpdateUser = () => {


    const updateUser = async (email, data) => {
        try {
            const response = await updateUserService(email, data);
            // si es diferente a 200 se lanza un error
            if (response.status !== 200) {
                throw new Error(`Error al actualizar el usuario: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    };

    return { updateUser };
};