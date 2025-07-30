// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, RouterProvider } from 'react-router-dom'; // Importa los componentes de React Router

// Importa tus componentes de página
import LoginPage from './pages/LoginPage/LoginPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import Dashboard from './components/Dashboard/Dashboard';
import { AppProvider } from '../core/state/AppContext';
import { router } from '../routes/router';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;