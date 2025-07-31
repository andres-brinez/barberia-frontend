// src/pages/UsersPage/UsersPage.jsx
import './Users.css'; // Estilos específicos para esta página
import { PlusIcon } from '@heroicons/react/24/outline';


// Iconos (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { useGetUsers } from '../../../core/hooks/useGetUsers';
import { useDeleteUser } from '../../../core/hooks/UseDeleteUser';
import UserTableRow from '../UserTableRow/UserTableRow';

function Users() {

    const { users, isLoading } = useGetUsers()
    const { deleteUser, response } = useDeleteUser()

     // Manejador para Ver detalles del usuario
    const handleView = (userEmail) => {
        alert(`Ver detalles del usuario con Email: ${userEmail}`);
        // Lógica para ver detalles (ej. abrir un modal con info completa, redirigir)
    };
    

    const handleEdit = (userId) => {
        alert(`Editar el usuario ${userId}`);
        // Aquí iría la lógica para redirigir a un formulario de edición o abrir un modal
    };

    const handleDelete = (userEmail, userName) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${userName}?`)) {
            // Lógica para eliminar el usuario (ej. llamar a la API y luego actualizar el estado)
            //setUsers(users.filter(user => user.id !== userId));

            deleteUser(userEmail).then(() => {
                alert(response);
            }).catch((error) => {
                console.error('Error al eliminar el usuario:', error);
                alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
            });


        }
        // setOpenDropdownId(null); // Cerrar dropdown después de la acción
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
        </div>
    );
}

export default Users;