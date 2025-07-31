// src/pages/UsersPage/UsersPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Users.css'; // Estilos específicos para esta página

// Iconos (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { PlusIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useGetUsers } from '../../../core/hooks/useGetUsers';

function Users() {
    const [error] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null); // Para controlar qué menú de opciones está abierto
    const dropdownRef = useRef(null); // Para detectar clics fuera del dropdown

    const { users, isLoading } = useGetUsers()



    // Manejar clics fuera del dropdown para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEdit = (userId) => {
        alert(`Editar usuario con ID: ${userId}`);
        setOpenDropdownId(null); // Cerrar dropdown después de la acción
        // Aquí iría la lógica para redirigir a un formulario de edición o abrir un modal
    };

    const handleDelete = (userId) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario con ID: ${userId}?`)) {
            alert(`Eliminar usuario con ID: ${userId}`);
            // Lógica para eliminar el usuario (ej. llamar a la API y luego actualizar el estado)
            //setUsers(users.filter(user => user.id !== userId));
        }
        setOpenDropdownId(null); // Cerrar dropdown después de la acción
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
                ) : error ? (
                    <div className="error-message">Error: {error}</div>
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
                                    <tr key={user.email}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`user-role-badge `}>
                                                {user.rol.includes('ROLE_ADMIN') ? 'Administrador' : user.rol.includes('ROLE_BARBER') ? 'Barbero' : 'Usuario'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`user-status-badge ${user.isActive === true ? 'active' : 'inactive'}`}>
                                                {user.isActive === true ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        {/* <td>{user.lastAccess}</td> */}
                                        <td>{"2024-01-14"}</td>
                                        <td className="actions-cell">
                                            <div className="options-dropdown-wrapper" ref={dropdownRef}>
                                                <button
                                                    className="options-button"
                                                    onClick={() => setOpenDropdownId(openDropdownId === user.email ? null : user.email)}
                                                >
                                                    <EllipsisVerticalIcon className="ellipsis-icon" />
                                                </button>
                                                {openDropdownId === user.email && (
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" onClick={() => handleView(user.email)}>
                                                            <EyeIcon className="dropdown-item-icon" />
                                                            Ver
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => handleEdit(user.email)}>
                                                            <PencilSquareIcon className="dropdown-item-icon" />
                                                            Editar
                                                        </button>
                                                        <button className="dropdown-item delete-item" onClick={() => handleDelete(user.email)}>
                                                            <TrashIcon className="dropdown-item-icon" />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;