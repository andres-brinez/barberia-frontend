// src/pages/HomePage/HomePage.jsx
import React from 'react';

function HomePage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>¡Bienvenido a tu BarberShop App!</h1>
      <p>Esta es la página principal.</p>
      <p>Puedes ir a la <a href="/login" style={{ color: 'var(--barber-primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>Página de Login</a>.</p>
    </div>
  );
}

export default HomePage;