import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    // Pore amra backend theke role nibo, ekhon just test korar jonno manually "hr" ba "employee" likhen
    const role = "employee"; 

    const hrLinks = (
        <>
            <li><NavLink to="/dashboard/hr-home">HR Home</NavLink></li>
            <li><NavLink to="/dashboard/asset-list">Asset List</NavLink></li>
            <li><NavLink to="/dashboard/add-asset">Add Asset</NavLink></li>
            <li><NavLink to="/dashboard/all-requests">All Requests</NavLink></li>
            <li><NavLink to="/dashboard/my-employee-list">My Employee List</NavLink></li>
            <li><NavLink to="/dashboard/add-employee">Add Employee</NavLink></li>
        </>
    );

    const employeeLinks = (
        <>
            <li><NavLink to="/dashboard/employee-home">Employee Home</NavLink></li>
            <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
            <li><NavLink to="/dashboard/my-team">My Team</NavLink></li>
            <li><NavLink to="/dashboard/request-asset">Request for an Asset</NavLink></li>
        </>
    );

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-6 min-h-screen border-r border-base-300">
                <h2 className="text-2xl font-black text-primary mb-8 italic">AssetFlow</h2>
                <ul className="menu space-y-2 text-base font-semibold">
                    {role === "hr" ? hrLinks : employeeLinks}
                    <div className="divider opacity-50"></div>
                    <li><NavLink to="/">Main Home</NavLink></li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-10 bg-base-100">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;