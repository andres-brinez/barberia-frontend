// src/components/layout/MainContent/MainContent.jsx
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  return (
    <main className="main-content">
      <div className="main-content-header-section">
        <h1 className="dashboard-title-main">Dashboard</h1>
        <p className="dashboard-subtitle-main">Bienvenido a tu panel de administración</p>
      </div>

      <div className="dashboard-grid">
        {/* Fila de Tarjetas de Estadísticas (sin cambios en los iconos) */}
        <div className="stats-card">
          <div className="card-header">
            <span>Total Clientes</span>
            <span className="card-header-emoji " style={{ paddingBottom: '3px' }}>👥</span> {/* Emoji para Total Clientes */}

          </div>
          <div className="card-value">1,234</div>
          <div className="card-trend positive">+12% desde el mes pasado</div>

        </div>
        <div className="stats-card">
          <div className="card-header">
            <span>Citas Hoy</span>
            <span className="card-header-emoji">🗓️</span> {/* Emoji para Citas Hoy */}
          </div>
          <div className="card-value">23</div>
          <div className="card-trend positive">+5% desde el mes pasado</div>
        </div>
        <div className="stats-card">
          <div className="card-header">
            <span>Servicios Realizados</span>
            <span className="card-header-emoji">✂️</span> {/* Emoji para Servicios Realizados (o 💈 si prefieres) */}

          </div>
          <div className="card-value">89</div>
          <div className="card-trend positive">+18% desde el mes pasado</div>
        </div>
        <div className="stats-card">
          <div className="card-header">
            <span>Ingresos del Mes</span>
            <span className="card-header-emoji">💰</span> {/* Emoji para Ingresos del Mes (o 📈 para gráfico) */}

          </div>
          <div className="card-value">$12,450</div>
          <div className="card-trend positive">+25% desde el mes pasado</div>
        </div>

        {/* Sección de Actividad Reciente - ¡Ahora con Emojis! */}
        <section className="activity-section">
          <h2 className="section-title">Actividad Reciente</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📝</span> {/* Emoji para cita */}
              <div className="activity-details">
                <p className="activity-description">Nueva cita agendada con Juan Pérez</p>
                <span className="activity-time">Hace 5 minutos</span>
              </div>
              <span className="activity-tag">cita</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">👤</span> {/* Emoji para cliente */}
              <div className="activity-details">
                <p className="activity-description">Cliente María García actualizado</p>
                <span className="activity-time">Hace 15 minutos</span>
              </div>
              <span className="activity-tag">cliente</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span> {/* Emoji para completado */}
              <div className="activity-details">
                <p className="activity-description">Cita completada con Carlos López</p>
                <span className="activity-time">Hace 1 hora</span>
              </div>
              <span className="activity-tag">cita</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✨</span> {/* Emoji para nuevo cliente */}
              <div className="activity-details">
                <p className="activity-description">Nuevo cliente Ana Martínez registrado</p>
                <span className="activity-time">Hace 2 horas</span>
              </div>
              <span className="activity-tag">cliente</span>
            </div>
          </div>
        </section>

        {/* Sección de Acciones Rápidas - Mantiene los Emojis */}
        <section className="quick-actions-section">
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="action-buttons-wrapper">
            <button className="action-button">
              <span className="action-icon">🗓️</span>
              <div>
                <p className="action-title">Nueva Cita</p>
                <p className="action-subtitle">Agendar una nueva cita</p>
              </div>
            </button>
            <button className="action-button green-button">
              <span className="action-icon">➕</span>
              <div>
                <p className="action-title">Agregar Cliente</p>
                <p className="action-subtitle">Registrar nuevo cliente</p>
              </div>
            </button>
            <button className="action-button blue-button">
              <span className="action-icon">🧑‍💻</span>
              <div onClick={() => navigate('/dashboard/users/create')}>
                <p className="action-title">Nuevo Usuario</p>
                <p className="action-subtitle">Crear cuenta de usuario</p>
              </div>
            </button>
            <button className="action-button gray-button">
              <span className="action-icon">⚙️</span>
              <div>
                <p className="action-title">Configuración</p>
                <p className="action-subtitle">Ajustar configuraciones</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;