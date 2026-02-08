import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/join-employee">Join as Employee</NavLink></li>
      <li><NavLink to="/join-hr">Join as HR Manager</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg">A</div>
          AssetFlow
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
         {/* Ekhane pore Profile picture thakbe jokhon logged in hobe */}
         <Link to="/login" className="btn btn-primary btn-sm md:btn-md rounded-full px-8">Get Started</Link>
      </div>
    </div>
  );
};

export default Navbar;