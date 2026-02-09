import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const DashboardLayout = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // 1. Initial value localstorage theke nibe
  const [role, setRole] = useState(localStorage.getItem("user-role"));
  const [loading, setLoading] = useState(!role); // Role thakle loading false

  useEffect(() => {
    // 2. Jodi user thake kintu role na thake, tokhon fetch korbe
    if (user?.email && !role) {
      axiosPublic
        .get(`/users/role/${user.email}`)
        .then((res) => {
          const userRole = res.data.role;
          setRole(userRole);
          localStorage.setItem("user-role", userRole); // LocalStorage-e rakha holo
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else if (user?.email && role) {
        setLoading(false);
    }
  }, [user, axiosPublic, role]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("user-role"); // Logout hole role muche jabe
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const hrLinks = (
    <>
      <li><NavLink to="/dashboard" end>HR Home</NavLink></li>
      <li><NavLink to="/dashboard/asset-list">Asset List</NavLink></li>
      <li><NavLink to="/dashboard/add-asset">Add Asset</NavLink></li>
      <li><NavLink to="/dashboard/all-requests">All Requests</NavLink></li>
      <li><NavLink to="/dashboard/my-employee-list">My Employee List</NavLink></li>
      <li><NavLink to="/dashboard/add-employee">Add Employee</NavLink></li>
    </>
  );

  const employeeLinks = (
    <>
      <li><NavLink to="/dashboard" end>Employee Home</NavLink></li>
      <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
      <li><NavLink to="/dashboard/my-team">My Team</NavLink></li>
      <li><NavLink to="/dashboard/request-asset">Request for an Asset</NavLink></li>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 p-6 min-h-screen border-r border-base-300 flex flex-col">
        <div className="flex-grow">
          <h2 className="text-2xl font-black text-primary mb-8 italic">AssetFlow</h2>
          <ul className="menu space-y-2 text-base font-semibold p-0">
            {role === "hr" ? hrLinks : employeeLinks}
            <div className="divider opacity-50"></div>
            <li><NavLink to="/">Main Home</NavLink></li>
          </ul>
        </div>

        {/* User Profile & Logout at Bottom */}
        <div className="mt-auto pt-10">
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                        <img src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt="user" />
                    </div>
                </div>
                <div className="text-sm">
                    <p className="font-bold truncate w-32">{user?.displayName}</p>
                    <p className="text-xs opacity-60 uppercase">{role}</p>
                </div>
            </div>
            <button 
                onClick={handleLogOut}
                className="btn btn-sm btn-outline btn-error w-full rounded-lg"
            >
                Logout
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;