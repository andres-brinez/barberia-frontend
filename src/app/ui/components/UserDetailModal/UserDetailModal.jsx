// src/components/UserDetailModal/UserDetailModal.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import './UserDetailModal.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UserDetailModal = ({ user, onClose }) => {
    if (!user) return null; // No renderizar si no hay un usuario
    
    // Función para obtener la clase del badge según el rol
    const getRoleBadgeClass = (rol) => {
        if (!rol) return '';
        if (rol.includes('ROLE_ADMIN')) return 'admin';
        if (rol.includes('ROLE_BARBER')) return 'barber';
        return 'user';
    };

    // Función para obtener la clase del badge según el estado
    const getStatusBadgeClass = (isActive) => {
        return isActive ? 'active' : 'inactive';
    };
    
    // Usamos createPortal para que el modal se renderice fuera del árbol DOM principal,
    // directamente en el 'body', lo que ayuda con la superposición y los estilos.
    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <article className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <div className="user-info-header">
                        {/* Se puede agregar una imagen de perfil aquí */}
                        <div className="user-avatar-placeholder"></div>
                        <div className="user-header-text">
                            <h2 className="user-full-name">{user.username || 'Usuario Desconocido'}</h2>
                            <p className="user-email">{user.email || 'Email no especificado'}</p>
                            <div className="user-badges">
                                <span className={`user-role-badge ${getRoleBadgeClass(user.rol)}`}>
                                    {user.rol && user.rol.includes('ROLE_ADMIN') ? 'Administrador' : user.rol && user.rol.includes('ROLE_BARBER') ? 'Barbero' : 'Usuario'}
                                </span>
                                <span className={`user-status-badge ${getStatusBadgeClass(user.isActive)}`}>
                                    {user.isActive === true ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <XMarkIcon className="close-icon" />
                    </button>
                </header>

                <main className="modal-body">
                    <section className="info-grid">
                        <div className="info-column">
                            <h3 className="column-title">Contacto</h3>
                            <dl className="info-list">
                                <div className="info-item">
                                    <dt>Email</dt>
                                    <dd>{user.email || 'No especificado'}</dd>
                                </div>
                                <div className="info-item">
                                    <dt>Teléfono</dt>
                                    <dd>{user.phone || 'No especificado'}</dd>
                                </div>
                                <div className="info-item">
                                    <dt>Dirección</dt>
                                    <dd>{user.address || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>
                        
                        <div className="info-column">
                            <h3 className="column-title">Información del Sistema</h3>
                            <dl className="info-list">
                                <div className="info-item">
                                    <dt>Creado</dt>
                                    <dd>{user.createdAt || 'No especificado'}</dd>
                                </div>
                                <div className="info-item">
                                    <dt>Último Acceso</dt>
                                    <dd>{user.lastAccess || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                    
                    <section className="permissions-section">
                        <h3 className="column-title">Permisos del Usuario</h3>
                        <div className="permissions-container">
                            {/* Renderizado de permisos basado en el rol o una lista de permisos si existe */}
                            {user.permissions && user.permissions.length > 0 ? (
                                user.permissions.map((perm, index) => (
                                    <span key={index} className="permission-tag">{perm}</span>
                                ))
                            ) : (
                                <span className="no-data-tag">No hay permisos especificados</span>
                            )}
                        </div>
                    </section>
                    
                    <section className="notes-section">
                        <h3 className="column-title">Notas</h3>
                        <p className="notes-text">{user.notes || 'No hay notas adicionales.'}</p>
                    </section>
                </main>
            </article>
        </div>,
        document.body // El portal renderiza el modal en el body
    );
};

export default UserDetailModal;