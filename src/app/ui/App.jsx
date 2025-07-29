// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Importa los componentes de React Router

// Importa tus componentes de página
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage'; // Importa la nueva HomePage

function App() {
  return (
    // BrowserRouter envuelve toda tu aplicación para habilitar el enrutamiento
    <BrowserRouter>
      

      <Routes>
        
        {/* path="/" renderiza HomePage cuando la URL es la raíz */}
        <Route path="/home" element={<HomePage />} />
        {/* path="/login" renderiza LoginPage cuando la URL es /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Opcional: Una ruta para "Not Found" (404) */}
        <Route path="*" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>404 - Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" style={{ color: 'var(--barber-primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>Ir a Inicio</Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;