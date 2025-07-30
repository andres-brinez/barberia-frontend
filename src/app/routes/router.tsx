import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/layouts/DashboardLayout";
import Dashboard from "../ui/components/Dashboard/Dashboard";
import LoginPage from "../ui/pages/LoginPage/LoginPage";
import NotFoundPage from "../ui/components/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,

    },
    {
        path: "/",
        Component: DashboardLayout,
        children: [
            {
                path: "/dashboard", element: <Dashboard />,
            },

        ]
    },
    {
        path: "*",
        element: <NotFoundPage />, // Agrega la ruta para "Not Found"
    },
]);
