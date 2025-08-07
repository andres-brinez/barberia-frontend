// src/pages/UsersPage/UsersPage.jsx
import './Users.css'; // Estilos específicos para esta página
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Iconos (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { useGetUsers } from '../../../core/hooks/useGetUsers';
import { useDeleteUser } from '../../../core/hooks/UseDeleteUser';
import UserTableRow from '../UserTableRow/UserTableRow';
import UserDetailModal from '../UserDetailModal/UserDetailModal';
import { useNavigate } from 'react-router-dom';

function Users() {

    const { users, setUsers, isLoading } = useGetUsers()
    const { deleteUser } = useDeleteUser()
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('Nombre'); // Nombre es el filtro por defecto


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

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="users-page-container">
            {/* Encabezado de la Página de Usuarios */}
            <div className="users-header">
                <div>
                    <h1 className="users-title">Usuarios</h1>
                    <p className="users-subtitle">Administra los usuarios del sistema</p>
                </div>
                <button className="add-user-button" onClick={handleAddUser}>
                    <PlusIcon className="add-user-icon" />
                    Agregar Usuario
                </button>
            </div>

            {/* Contenido Principal de la Tabla */}
            <div className="users-table-card">
                <div className="table-header">
                    <h2 className="table-section-title">Lista de Usuarios</h2>
                    {/* BUSCADOR Y FILTRO */}
                    <div className="search-container">
                        <div className="filter-select">
                            <select value={filterBy} onChange={handleFilterChange}>
                                <option value="Nombre">Nombre</option>
                                <option value="Email">Email</option>
                                <option value="Rol">Rol</option>
                            </select>
                        </div>
                        <div className="search-input-wrapper">
                            <MagnifyingGlassIcon className="search-icon" />
                            <input
                                type="text"
                                placeholder={`Buscar por ${filterBy.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>


                {isLoading ? (
                    <div className="loading-message">Cargando datos...</div>
                ) : users.length === 0 ? (
                    <div className="no-data-message">No hay usuarios registrados.</div>
                ) :
                    filteredUsers.length === 0 ? (
                        <div className="no-data-message">No se encontraron usuarios que coincidan con la busqueda.</div>
                    ) :
                        (
                            <div className="table-responsive">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Rol</th>
                                            <th>Estado</th>
                                            <th>Último Acceso</th>
                                            <th></th> {/* Columna para el menú de opciones */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <UserTableRow
                                                key={user.email} // Usamos email como key si es único, o user.id si existe
                                                user={user}
                                                onView={handleView}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
            </div>

            {/* Renderizar el modal si hay un usuario seleccionado */}
            {selectedUser && (
                <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default Users;