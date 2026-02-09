import React from "react";
import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL || "https://i.ibb.co/m9YyZ6H/default-avatar.png"} alt="User" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, {user?.displayName || "User"}!
          </h1>
          <p className="opacity-70 italic">{user?.email}</p>
        </div>
      </div>

      <div className="bg-base-200 p-6 rounded-2xl mb-10">
        <p className="text-lg">
          Jehetu apni ekhon login obosthay achen, eikhan theke apni apnar assets 
          ba employee-der manage korte parben. Side-bar theke options gulo explore korun.
        </p>
      </div>

      {/* Stats/Status Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border border-blue-200 p-6 shadow-sm">
            <h3 className="font-bold text-blue-700 uppercase text-xs">Account Status</h3>
            <p className="text-2xl font-black text-blue-900 mt-2">Active</p>
        </div>
        
        <div className="card bg-green-50 border border-green-200 p-6 shadow-sm">
            <h3 className="font-bold text-green-700 uppercase text-xs">User Role</h3>
            <p className="text-2xl font-black text-green-900 mt-2 italic">
                Pending Database...
            </p>
        </div>

        <div className="card bg-purple-50 border border-purple-200 p-6 shadow-sm">
            <h3 className="font-bold text-purple-700 uppercase text-xs">Last Login</h3>
            <p className="text-xl font-black text-purple-900 mt-2">
                {new Date().toLocaleDateString()}
            </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;