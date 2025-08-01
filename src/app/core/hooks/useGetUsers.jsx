import { useState, useEffect } from "react";
import { getUsersService } from "../service/users.service";

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUsersService().then((response) => {
            console.log('Fetching users...');
            console.log(response)
            if (response) {
                setUsers(response);
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
    return { users, setUsers, isLoading }
}