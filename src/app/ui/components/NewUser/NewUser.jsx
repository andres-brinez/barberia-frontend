// src/pages/NewUser/NewUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewUser.css';
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NewUser = () => {
    const navigate = useNavigate();

    // Estado inicial del formulario vacío
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: null,
        password: '',
        confirmPassword: '',
        rol: '',
        // status: 'Activo', // Valor por defecto
        // permissions: [],
    });

    // Estado para la imagen de perfil
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación básica
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        formData.rol = formData.rol === 'Administrador' ? 'ROLE_ADMIN' : formData.rol === 'Barbero' ? 'ROLE_BARBER' : 'ROLE_USER',
            // formData.status = formData.status === 'Activo' ? true : false;
        console.log('Nuevo usuario a crear:', formData, 'Imagen:', profileImage);
        // Aquí iría la lógica para enviar los datos a tu API
        alert('Usuario creado con éxito (simulado)');
        // navigate('/users');
    };


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
    };

    const handleCancel = () => {
        navigate('/users');
    };

    return (
        <div className="new-user-page">
            <header className="new-user-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <ArrowLeftIcon className="back-icon" /> Volver
                </button>
                <div className="title-container">
                    <h1>Nuevo Usuario</h1>
                    <p>Agrega un nuevo usuario al sistema</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="new-user-form">
                <section className="form-section-card">
                    <h2 className="section-title">Información del Usuario</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="username">Nombre completo *</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Ingresa el nombre completo"
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
                                placeholder="usuario@barbershop.com"
                                required
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
                                placeholder="+1 234 567 8900"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            />
                            
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol del usuario *</label>
                            <select
                                id="rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Selecciona el rol</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Barbero">Barbero</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <div className="form-group full-width">
                            <label htmlFor="status">Estado del usuario</label>
                            <select 
                                id="status" 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div> */}
                    </div>
                </section>
                {/*                 
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
                 */}
                <section className="form-section-card profile-photo-section">
                    <h2 className="section-title">Foto de perfil</h2>
                    <div className="profile-photo-container">
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
                                    style={{ display: 'none' }}
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

                <div className="form-actions">
                    <button type="submit" className="save-button">Crear Usuario</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;