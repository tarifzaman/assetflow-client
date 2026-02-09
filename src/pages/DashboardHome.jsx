import React from "react";
import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
    const { user, loading } = useAuth();
    const role = localStorage.getItem('user-role');

    if (loading || !user) {
        return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-10">
            <div className="bg-gradient-to-r from-primary to-blue-700 p-10 rounded-3xl text-white shadow-xl">
                <h1 className="text-4xl font-black mb-2">Welcome, {user?.displayName}!</h1>
                <p className="opacity-90">Role: <span className="font-bold uppercase">{role}</span></p>
                <p className="opacity-70 text-sm">{user?.email}</p>
            </div>

            {/* Real Stats (Pore count API add kora jabe) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="stat bg-white shadow rounded-2xl border border-base-200">
                    <div className="stat-title">Database Status</div>
                    <div className="stat-value text-success text-2xl font-bold">Connected</div>
                    <div className="stat-desc">Syncing with MongoDB Atlas</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;