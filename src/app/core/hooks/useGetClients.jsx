import { useState, useEffect } from "react";
import { getClientsService } from "../service/clients.service";

export const useGetClients = () => {
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getClientsService().then((response) => {
            console.log('Fetching users...');
            console.log(response)
            if (response) {
                setClientes(response);
            }

            setIsLoading(false);
        });

        // Simulate fetching users
        // const users = [
        //     {
        //         id: 1,
        //         username: 'Juan Perez',
        //         email: 'xvH0Q@example.com',
        //         rol: 'ROLE_ADMIN',
        //         isActive: true,
        //         lastAccess: '2023-10-01T12:00:00Z'
        //     },
        //     {
        //         id: 2,
        //         username: 'Maria Lopez',
        //         email: 'FkGxH@example.com',
        //         rol: 'ROLE_BARBER',
        //         isActive: false,
        //         lastAccess: '2023-10-02T14:30:00Z'
        //     }]
        // setUsers(users);
        // setIsLoading(false);
    }, []);
    return { clientes,setClientes, isLoading }
}