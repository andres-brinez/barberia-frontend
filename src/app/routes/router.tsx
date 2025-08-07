import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/layouts/DashboardLayout";
import LoginPage from "../ui/pages/LoginPage/LoginPage";
import Dashboard from "../ui/pages/Dashboard/Dashboard";
import Users from "../ui/pages/Users/Users";
import EditUser from "../ui/pages/EditUser/EditUser";
import NewUser from "../ui/pages/NewUser/NewUser";
import NotFoundPage from "../ui/pages/NotFoundPage/NotFoundPage";

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

        ]
    },
    {
        path: "*",
        element: <NotFoundPage />, // Agrega la ruta para "Not Found"
    },
]);
