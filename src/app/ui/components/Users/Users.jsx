// src/pages/UsersPage/UsersPage.jsx
import './Users.css'; // Estilos específicos para esta página
import { PlusIcon } from '@heroicons/react/24/outline';
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
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();




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