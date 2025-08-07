import { Outlet } from "react-router-dom";
import './DashboardLayout.css'; // Estilos para el layout principal del dashboard
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Header from "../components/layout/Header/Header";

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