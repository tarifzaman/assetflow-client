import React from "react";
import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-primary">
        Welcome to your Dashboard, {user?.displayName}!
      </h1>
      <p className="mt-4 opacity-70">
        Jehetu apni ekhon login obosthay achen, eikhan theke apni apnar assets 
        ba employee-der manage korte parben.
      </p>

      {/* Placeholder for future role-based content */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="card bg-blue-100 p-6 shadow">
            <h3 className="font-bold">Status</h3>
            <p>Active User</p>
        </div>
        <div className="card bg-green-100 p-6 shadow">
            <h3 className="font-bold">Role</h3>
            <p>Checking from Database...</p> 
            {/* Pore amra role dekhabo */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;