// src/pages/UsersPage/UsersPage.jsx
import './Users.css'; // Estilos específicos para esta página
import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';


// Iconos (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { useGetUsers } from '../../../core/hooks/useGetUsers';
import { useDeleteUser } from '../../../core/hooks/UseDeleteUser';
import UserTableRow from '../UserTableRow/UserTableRow';
import UserDetailModal from '../UserDetailModal/UserDetailModal';

function Users() {

    const { users, setUsers, isLoading } = useGetUsers()
    const { deleteUser } = useDeleteUser()
    const [selectedUser, setSelectedUser] = useState(null);

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


    // Manejador para Ver detalles del usuario
    const handleView = (userEmail) => {
        alert(`Ver detalles del usuario con Email: ${userEmail}`);
        // hacer el llamado a la API para obtener los detalles del usuario
        const user=  users.find(user => user.email === userEmail);
        console.log(user)
        setSelectedUser(user);

    };


    const handleEdit = (userId) => {
        alert(`Editar el usuario ${userId}`);
        // Aquí iría la lógica para redirigir a un formulario de edición o abrir un modal
    };

    const handleDelete = (userEmail, userName) => {
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
                <button className="add-user-button">
                    <PlusIcon className="add-user-icon" />
                    Agregar Usuario
                </button>
            </div>

            {/* Contenido Principal de la Tabla */}
            <div className="users-table-card">
                <h2 className="table-section-title">Lista de Usuarios</h2>

                {isLoading ? (
                    <div className="loading-message">Cargando datos...</div>
                ) : users.length === 0 ? (
                    <div className="no-data-message">No hay usuarios registrados.</div>
                ) : (
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
                                {users.map((user) => (
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