import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import './DashboardLayout.css'; // Estilos para el layout principal del dashboard

export const DashboardLayout = () => {
  return (
   <div className="dashboard-layout">
      <Sidebar />     {/* Columna 1, Filas 1 y 2 */}
      <Header />      {/* Columna 2, Fila 1 */}

    {/* Aquí se renderizarán los componentes */}
      <Outlet>
      </Outlet>  {/* Columna 2, Fila 2 */}
    </div>
  );
}