import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"; // Home page ta niche banacchi
import MainLayout from "../layouts/MainLaout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            // Bakigula (login, register) amra pore ek ek kore add korbo
        ],
    },
]);