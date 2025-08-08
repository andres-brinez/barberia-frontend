import { environment } from '../../../environment/enviroment';

export const urls = {
    login: `${environment.apiUrl}/auth/signin`,
    getUsers: `${environment.apiUrl}/users`,
    deleteUser: `${environment.apiUrl}/users`,
    getUserByEmail: `${environment.apiUrl}/users`,
    updateUser: `${environment.apiUrl}/users`,
    createUser: `${environment.apiUrl}/users`,
    getClients: `${environment.apiUrl}/client-profiles`,
    createClient: `${environment.apiUrl}/client-profiles`



  

}