import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const DashboardHome = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [packageStatus, setPackageStatus] = useState({ packageType: "Basic", limit: 5, used: 0 });
    const role = localStorage.getItem('user-role');

    useEffect(() => {
        if (user?.email && role === 'hr') {
            axiosPublic.get(`/hr-package-status/${user.email}`)
                .then(res => setPackageStatus(res.data));
        }
    }, [user?.email, role]);

    if (loading || !user) {
        return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-10 bg-[#F8FAFC] min-h-screen">
            {/* প্রোফাইল ব্যানার */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-12 rounded-[2rem] text-white shadow-xl mb-10">
                <h1 className="text-5xl font-black mb-3 italic">Welcome, {user?.displayName}!</h1>
                <p className="text-lg opacity-90">Role: <span className="font-bold uppercase tracking-widest">{role}</span></p>
                <p className="opacity-70 text-sm mt-1 font-mono">{user?.email}</p>
            </div>

            {role === 'hr' && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* রানিং প্যাকেজ কার্ড */}
                    <div className="p-10 bg-white shadow-sm border border-slate-100 rounded-[2.5rem] flex justify-between items-center flex-1">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-2">Running Package</p>
                            <h2 className="text-4xl font-black text-[#5C42CF]">{packageStatus.packageType}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-2">Member Slots</p>
                            <h2 className={`text-4xl font-black ${packageStatus.used > packageStatus.limit ? 'text-rose-500' : 'text-slate-800'}`}>
                                {packageStatus.used} / {packageStatus.limit}
                            </h2>
                        </div>
                    </div>

                    {/* লিমিট ওয়ার্নিং ও আপডেট বাটন */}
                    <div className="p-10 bg-white shadow-sm border border-slate-100 rounded-[2.5rem] flex flex-col justify-center flex-1">
                        {packageStatus.used >= packageStatus.limit ? (
                            <div>
                                <p className="text-rose-500 font-bold mb-4 text-sm flex items-center gap-2 italic">
                                   ⚠️ Slot limit reached! Please upgrade to add more members.
                                </p>
                                <Link to="/dashboard/upgrade-package" className="btn bg-[#FF5A6E] hover:bg-rose-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-rose-100">
                                    Upgrade Package
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <p className="text-slate-500 font-medium mb-4 text-sm">Grow your team by adding more slots!</p>
                                <Link to="/dashboard/upgrade-package" className="btn btn-outline border-2 border-slate-200 hover:bg-slate-900 hover:border-slate-900 text-slate-700 w-full h-14 rounded-2xl text-lg font-bold">
                                    View Premium Plans
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ডাটাবেস স্ট্যাটাস কার্ড */}
            <div className="mt-8">
                <div className="bg-white p-8 shadow-sm border border-slate-100 rounded-[2rem] w-full md:w-[350px]">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1">Database Status</div>
                    <div className="text-2xl font-black text-[#10B981]">Connected</div>
                    <div className="text-xs text-slate-400 mt-1">Atlas Cluster0 Active</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;