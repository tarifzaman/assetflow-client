import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Custom hook import
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth(); // Auth context theke user info nilam

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Success", "Logged out successfully", "success");
      })
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      {/* Jodi user login thake, tokhon dashboard dekhabo, na thakle Join options */}
      {user ? (
        <>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        </>
      ) : (
        <>
          <li><NavLink to="/join-employee">Join as Employee</NavLink></li>
          <li><NavLink to="/join-hr">Join as HR Manager</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            {/* SVG Path fixed here */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg shadow-lg">A</div>
          AssetFlow
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Profile Picture & Name */}
            <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-bold">{user?.displayName}</span>
                <span className="text-[10px] opacity-60">Online</span>
            </div>
            <div className="avatar shadow-md rounded-full ring ring-primary ring-offset-2 overflow-hidden w-10 h-10">
                <img src={user?.photoURL || "https://i.ibb.co/m9YyZ6H/default-avatar.png"} alt="User" />
            </div>
            <button 
              onClick={handleLogout} 
              className="btn btn-sm btn-error btn-outline rounded-full px-5"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/join-employee" className="btn btn-primary btn-sm md:btn-md rounded-full px-8">Get Started</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;