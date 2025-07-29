// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'; // Importación directa de CSS
import { useAuthLogin } from '../../../core/hooks/useAuth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para manejar mensajes de error o éxito
    const {authenticate, errorMessage,isError} = useAuthLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userCredentials = {
            email,
            password,
        };

        authenticate(userCredentials)

    };
    const handleGoogleSignIn = () => {
        alert('Iniciar con Google');
    };

    return (
        <main className="login-page-main">
            <aside className="left-panel">
                <div className="loader-placeholder">
                    <svg className="loader-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM11 6h2v8h-2V6zm0 10h2v2h-2v-2z" />
                    </svg>
                </div>
            </aside>

            <section className="right-panel">
                <div className="form-content-wrapper">
                    {/* NUEVO CONTENEDOR AQUÍ */}
                    <div className="text-header-group">
                        <h1 className="main-title">BarberShop Ibagué</h1>
                        <h2 className="sub-title">Iniciar sesión</h2>
                        <p className="description">Accede a tu panel de administración</p>
                    </div>
                    {/* FIN DEL NUEVO CONTENEDOR */}

                    <form onSubmit={handleSubmit} className="login-form">
                        <fieldset className="form-group">
                            <legend className="sr-only">Credenciales de Acceso</legend>
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="form-input"
                            />
                        </fieldset>

                        <fieldset className="form-group">
                            <legend className="sr-only">Contraseña y Recuperación</legend>
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                // placeholder="********"
                                placeholder="•••••••"
                                // Queiro qu eel placeholder seanp untos como de contraseña

                                required
                                className="form-input"
                            />
                            <p className="forgot-password">
                                <a href="#">¿Olvidaste tu contraseña?</a>
                            </p>
                        </fieldset>
                        {isError && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">O CONTINÚA CON</span>
                        <div className="divider-line"></div>
                    </div>

                    <button className="gsi-material-button" onClick={handleGoogleSignIn} type="button">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                            </div>
                            <span className="gsi-material-button-contents">Continue with Google</span>
                            <span style={{ display: 'none' }}>Continue with Google</span>
                        </div>
                    </button>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;