import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"; // Home page ta niche banacchi
import MainLayout from "../layouts/MainLaout";
import JoinEmployee from "../pages/JoinEmployee";
import DashboardHome from "../pages/DashboardHome";
import JoinHR from "../pages/JoinHR";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddAsset from "../pages/AddAsset";
import MyAssets from "../pages/MyAssets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "join-employee",
        element: <JoinEmployee />,
      },
      {
        path: "join-hr",
        element: <JoinHR />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      { path: "add-asset", element: <AddAsset /> },
      { path: "my-assets", element: <MyAssets /> },
    ],
  },
]);
