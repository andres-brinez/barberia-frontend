// src/components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';

// Iconos
import {
  ChartBarIcon, UsersIcon, CalendarIcon, CogIcon, DocumentTextIcon, ChartPieIcon,UserGroupIcon 
} from '@heroicons/react/24/outline'; 

function Sidebar() {
  const navItems = [
  { name: 'Dashboard', icon: <ChartBarIcon />, path: '/dashboard' },
    { name: 'Clientes', icon: <UserGroupIcon  />, path: '/dashboard/clientes' },
    { name: 'Usuarios', icon: <UsersIcon />, path: '/dashboard/usuarios' },
    { name: 'Agenda', icon: <CalendarIcon />, path: '/dashboard/agenda' },
    { name: 'Servicios', icon: <DocumentTextIcon />, path: '/dashboard/servicios' },
    { name: 'Configuración', icon: <CogIcon />, path: '/dashboard/configuracion' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo-link">
          <span className="sidebar-logo-icon">💈</span>
          <span className="sidebar-app-name">BarberShop Pro</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-title">Menú Principal</p>
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                end
              >
                <span className="nav-icon">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-user-info">
        <div className="user-avatar">A</div>
        <div className="user-details">
          <p className="user-name">Admin</p>
          <p className="user-email">admin@barbershop.com</p>
        </div>
        
      </div>
    </aside>
  );
}

export default Sidebar;