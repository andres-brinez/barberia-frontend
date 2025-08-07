// src/pages/UsersPage/UsersPage.jsx
import './Users.css'; // Estilos específicos para esta página
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Iconos (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { useGetUsers } from '../../../core/hooks/useGetUsers';
import { useDeleteUser } from '../../../core/hooks/UseDeleteUser';
import UserTableRow from '../../components/users/UserTableRow/UserTableRow';
import UserDetailModal from '../../components/UserDetailModal/UserDetailModal';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import Table from '../../components/Table/Table';
import PageHeader from '../../components/PageHeader/PageHeader';
import TableCard from '../../components/TableCard/TableCard';

function Users() {

    const { users, setUsers, isLoading } = useGetUsers()
    const { deleteUser } = useDeleteUser()
    const navigate = useNavigate();

    const [, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('Nombre'); // Nombre es el filtro por defecto

    const filterOptions = [
        { label: 'Nombre', value: 'Nombre' },
        { label: 'Email', value: 'Email' },
        { label: 'Rol', value: 'Rol' },
    ];

    const usersColumns = [
        { label: 'Nombre', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Rol', key: 'rol' },
        { label: 'Estado', key: 'estado' },
        { label: 'Último Acceso', key: 'lastAccess' },
    ]



    // Función para manejar el cambio en la barra de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Función para manejar el cambio en el filtro
    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const filteredUsers = users.filter(user => {

        if (!searchTerm) {
            return true; // Mostrar todos si el campo de búsqueda está vacío
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Convertir el objeto de usuario a una cadena de texto según el filtro
        let filterValue = '';

        if (filterBy === 'Nombre') {
            filterValue = user.username?.toLowerCase() || '';
        } else if (filterBy === 'Email') {
            filterValue = user.email?.toLowerCase() || '';
        } else if (filterBy === 'Rol') {
            filterValue = user.rol?.toLowerCase() || '';
        }



        return filterValue.includes(lowerCaseSearchTerm);
    });


    // Manejadores
    // crear un usuario
    const handleAddUser = () => {
        navigate('/dashboard/users/create');
    };

    const handleView = (userEmail) => {
        const user = users.find(user => user.email === userEmail);
        console.log(user)
        setSelectedUser(user);

    };


    const handleEdit = (userEmail) => {
        // Navega a la ruta de edición y pasa el objeto `userToEdit` en la propiedad `state`
        const userToEdit = users.find(user => user.email === userEmail);
        if (userToEdit) {
            navigate(`/dashboard/users/edit/${userToEdit.email}`, { state: { user: userToEdit } });
        }
        else {
            alert('No se pudo encontrar el usuario')
        }
    }

    const handleDelete = (userEmail, userName) => {
        // TODO: Mejorar la confirmación de eliminación como la del diseño
        if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${userName}?`)) {

            deleteUser(userEmail)
            setUsers((prevUsers) => prevUsers.filter(user => user.email !== userEmail));
        }
    };


    return (
        <div className="app-page-container"> {/* Clase general para todas las páginas */}

            <PageHeader
                title="Usuarios"
                subtitle="Administra los usuarios del sistema"
                buttonText="Agregar Usuario"
                onAddClick={handleAddUser}
            />

            <TableCard title="Lista de Usuarios" searchProps={{
                filterBy,
                onFilterChange: handleFilterChange,
                searchTerm,
                onSearchChange: handleSearchChange,
                filterOptions
            }}>

                <Table
                    columns={usersColumns}
                    data={filteredUsers}
                    loading={isLoading}
                    error={null}
                    emptyMessage="No hay usuarios para registrados."
                    renderRow={(user, index) => (
                        <UserTableRow
                            key={user.email} // Usamos email como key si es único, o user.id si existe
                            user={user}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                />

            </TableCard>

        </div>
    );
}

export default Users;