import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/layouts/DashboardLayout";
import Dashboard from "../ui/components/Dashboard/Dashboard";
import LoginPage from "../ui/pages/LoginPage/LoginPage";
import NotFoundPage from "../ui/components/NotFoundPage/NotFoundPage";
import Users from "../ui/components/Users/Users";
import EditUser from "../ui/components/EditUser/EditUser";
import NewUser from "../ui/components/NewUser/NewUser";

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
