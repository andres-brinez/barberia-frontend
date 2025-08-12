import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/layouts/DashboardLayout";
import LoginPage from "../ui/pages/LoginPage/LoginPage";
import Dashboard from "../ui/pages/Dashboard/Dashboard";
import Users from "../ui/pages/Users/Users";
import EditUser from "../ui/pages/EditUser/EditUser";
import NewUser from "../ui/pages/NewUser/NewUser";
import NotFoundPage from "../ui/pages/NotFoundPage/NotFoundPage";
import Clients from "../ui/pages/Clients/Clients";
import NewClient from "../ui/pages/NewClient/NewClient";
import EditClient from "../ui/pages/EditClient/EditClient";

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
            {
                path: "/dashboard/users", element: <Users />,
            },
            {
                path: "/dashboard/users/edit/:email", element: <EditUser />,
            },
            {
                path: "/dashboard/users/create", element: <NewUser />,
            },
            {
                path: "/dashboard/clients", element: <Clients/>,
            },
            {
                path: "/dashboard/clients/new", element: <NewClient />,
            },
            {
                path: "/dashboard/clients/:idClient/edit", element: <EditClient />,
            },  

        ]
    },
    {
        path: "*",
        element: <NotFoundPage />, // Agrega la ruta para "Not Found"
    },
]);
