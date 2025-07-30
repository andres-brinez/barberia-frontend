import React from 'react';
import { Link } from 'react-router-dom'; // Importa los componentes de React Router


const NotFoundPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={{ color: 'var(--barber-primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>Ir a Inicio</Link>
    </div>
  );
};

export default NotFoundPage;