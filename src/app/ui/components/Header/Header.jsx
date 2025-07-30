// src/components/layout/Header/Header.jsx
import React from 'react';
import './Header.css'; // Estilos específicos para el Header
// Iconos (requiere: npm install @heroicons/react)
import { BellIcon, Cog8ToothIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'; // Iconos de ejemplo

function Header() {
  const handleLogout = () => {
    alert('Cerrar sesión');
    // Aquí usarías React Router para redirigir, ej: navigate('/login');
  };

  return (
    // Header global del dashboard - Más pequeño y sin título de "Dashboard"
    <header className="dashboard-global-header">
      {/* Puedes añadir un placeholder si el diseño tiene un logo pequeño aquí,
          o simplemente dejarlo vacío si es solo una franja de color.
          Por ahora, un placeholder de iconos de utilidad a la derecha. */}
      <div className="header-placeholder-left">
        {/* Aquí podría ir un icono de menú para responsive o un logo pequeño */}
      </div>
      <div className="header-right-icons">
        <BellIcon className="header-icon" />
        <QuestionMarkCircleIcon className="header-icon" />
        <Cog8ToothIcon className="header-icon" />
        <button className="logout-button-header" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="logout-icon-header" />
          Salir
        </button>
      </div>
    </header>
  );
}

export default Header;