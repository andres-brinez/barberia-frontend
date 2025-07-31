// src/pages/EditUser/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditUser.css';
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUpdateUser } from '../../../core/hooks/useUpdateUser';

const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para acceder al estado de navegación
    const { updateUser } = useUpdateUser();

    // Extraer el usuario del estado de navegación
    const userToEdit = location.state?.user;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        rol: '',
        address: '',
        status: '',
        permissions: [],
        notes: '',
    });

    // Nuevo estado para la imagen de perfil
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        // Usamos el objeto de usuario que viene del estado de navegación
        if (userToEdit) {
            setFormData({
                fullName: userToEdit.username || '',
                email: userToEdit.email || '',
                phone: userToEdit.phone || '',
                rol: userToEdit.rol && userToEdit.rol.includes('ROLE_ADMIN') ? 'Administrador' : userToEdit.rol && userToEdit.rol.includes('ROLE_BARBER') ? 'Barbero' : 'Usuario',
                address: userToEdit.address || '',
                status: userToEdit.isActive ? 'Activo' : 'Inactivo',
                permissions: userToEdit.permissions || [],
                notes: userToEdit.notes || '',
            });
            // Si el usuario tiene una imagen, la precargamos
            if (userToEdit.profilePhotoUrl) {
                setImagePreviewUrl(userToEdit.profilePhotoUrl);
            }
        } else {
            // Si no se encuentra el usuario en el estado, redirigimos
            // Esto evita errores si alguien llega a la URL directamente
            navigate('/users');
        }
    }, [userToEdit, navigate]);

    // Manejador para los cambios del formulario (sin cambios)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevFormData => ({
                ...prevFormData,
                permissions: checked
                    ? [...prevFormData.permissions, value]
                    : prevFormData.permissions.filter(perm => perm !== value)
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    // Manejador para la subida de imágenes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    // Manejador para eliminar la imagen
    const handleRemoveImage = () => {
        setProfileImage(null);
        setImagePreviewUrl(null);
        // Aquí podrías agregar lógica para eliminar la imagen del servidor si ya existía
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviando datos del formulario:', formData);
        console.log('Datos a guardar:', formData, 'Imagen:', profileImage);

        const updatedUser = {
            username: formData.fullName,
            // email: formData.email,
            phone: formData.phone,
            rol: formData.rol === 'Administrador' ? 'ROLE_ADMIN' : formData.rol === 'Barbero' ? 'ROLE_BARBER' : 'ROLE_USER',
            // address: formData.address,
            isActive: formData.status === 'Activo',
            // permissions: formData.permissions,
            // notes: formData.notes,
        };

        console.log('Usuario actualizado:', updatedUser);

        // Aquí podrías llamar a tu servicio de actualización de usuario

        try {
            updateUser(userToEdit.email, updatedUser);
            alert('Usuario actualizado correctamente');
            navigate('/dashboard/users'); // Redirige a la lista de usuarios después de actualizar
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.message);
            alert('Error al actualizar el usuario: ' + error.message);
        }



        // navigate('/users');
    };

    const handleCancel = () => {
        navigate('/dashboard/users');
    };

    if (!userToEdit) {
        return <div className="edit-user-page loading-message">Cargando datos del usuario...</div>;
    }

    return (
        <div className="edit-user-page">
            <header className="edit-user-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <ArrowLeftIcon className="back-icon" />
                </button>
                <div className="title-container">
                    <h1>Editar Usuario</h1>
                    <p>Modifica la información de {userToEdit.username}</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="edit-user-form">
                <section className="form-section-card">
                    <h2 className="section-title">Editar Información del Usuario</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="fullName">Nombre completo *</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled // El email no debería ser editable
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol del usuario</label>
                            <select
                                id="rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Barbero">Barbero</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Estado</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="form-section-card">
                    <h2 className="section-title">Permisos del usuario (selección múltiple)</h2>
                    <div className="permissions-grid">
                        {['Gestionar clientes', 'Ver agenda', 'Gestionar servicios', 'Gestionar usuarios', 'Modificar agenda', 'Ver reportes', 'Configuración del sistema'].map(perm => (
                            <div key={perm} className="permission-item">
                                <input
                                    type="checkbox"
                                    id={`perm-${perm}`}
                                    name="permissions"
                                    value={perm}
                                    checked={formData.permissions.includes(perm)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`perm-${perm}`}>{perm}</label>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NUEVA SECCIÓN PARA LA FOTO DE PERFIL */}
                <section className="form-section-card profile-photo-section">
                    <h2 className="section-title">Foto de perfil</h2>
                    <div className="profile-photo-container">
                        {/* Condicionalmente renderizamos el área de subida o la previsualización */}
                        {!imagePreviewUrl ? (
                            <label htmlFor="profilePhoto" className="profile-photo-dropzone">
                                <div className="upload-icon-container">
                                    <PhotoIcon className="upload-icon" />
                                </div>
                                <p className="dropzone-text">Haz clic para subir una foto</p>
                                <p className="dropzone-subtext">PNG, JPG hasta 5MB</p>
                                <input
                                    id="profilePhoto"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }} // Ocultamos el input de archivo
                                />
                            </label>
                        ) : (
                            <div className="profile-photo-preview">
                                <img src={imagePreviewUrl} alt="Previsualización de la foto de perfil" />
                                <button type="button" onClick={handleRemoveImage} className="remove-photo-button">
                                    <XMarkIcon className="remove-icon" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                <section className="form-section-card">
                    <h2 className="section-title">Notas adicionales</h2>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Escribe notas adicionales sobre el usuario aquí..."
                    ></textarea>
                </section>

                <div className="form-actions">
                    <button type="submit" className="save-button">Guardar Cambios</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;