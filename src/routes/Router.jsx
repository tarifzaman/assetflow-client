import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"; // Home page ta niche banacchi
import MainLayout from "../layouts/MainLaout";
import JoinEmployee from "../pages/JoinEmployee";
import DashboardHome from "../pages/DashboardHome";
import JoinHR from "../pages/JoinHR";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddAsset from "../pages/AddAsset";
import MyAssets from "../pages/MyAssets";
import DashboardLayout from "../layouts/DashboardLayout";
import AssetList from "../pages/AssetList";
import RequestAsset from "../pages/RequestAsset";
import AllRequests from "../pages/AllRequests";
import MyEmployeeList from "../pages/MyEmployeeList";
import AddEmployee from "../pages/AddEmployee";
import MyTeam from "../pages/MyTeam";
import UpgradePackage from "../pages/UpgradePackage";

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
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout /> {/* Dashboard er Sidebar wala layout ekhane hobe */}
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // /dashboard e dhuklei eta dekhabe
        element: <DashboardHome />,
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "my-assets",
        element: <MyAssets />,
      },
      {
        path: "asset-list",
        element: <AssetList />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      { path: "my-employee-list", element: <MyEmployeeList /> },
      { path: "add-employee", element: <AddEmployee /> },
      { path: "my-team", element: <MyTeam /> },
      {
        path: "upgrade-package",
        element: <UpgradePackage />,
      },
    ],
  },
]);
