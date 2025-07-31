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
    }, []);
    return { users,setUsers, isLoading }
}