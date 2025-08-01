import { createUserService } from "../service/users.service";

export const useCreateUser = () => {


    const createUser = async (data) => {
        try {
            const response = await createUserService(data);
            
            // si es diferente a 200 se lanza un error
            if (response.status !== 200) {
                throw new Error(`Error al crear el usuario: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    };

    return { createUser };

};