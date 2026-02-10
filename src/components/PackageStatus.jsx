import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const PackageStatus = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [status, setStatus] = useState({ currentPackage: "Basic", limit: 5, used: 0 });

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/hr-package-status/${user.email}`)
                .then(res => setStatus(res.data))
                .catch(err => console.log("Error loading status:", err));
        }
    }, [user?.email]);

    return (
        <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 mb-8 flex flex-wrap justify-between items-center gap-4">
            <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1">Current Package</h3>
                <p className="text-xl font-black text-[#5C42CF]">{status.currentPackage} Plan</p>
            </div>
            <div className="text-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1">Member Limit</h3>
                <p className="text-xl font-black text-slate-800">{status.used} / {status.limit} <span className="text-sm font-normal text-slate-400">Slots Used</span></p>
            </div>
            <div>
                <Link to="/packages" className={`btn btn-sm h-12 px-6 border-none rounded-xl font-bold ${status.used >= status.limit ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-900 text-white'}`}>
                    {status.used >= status.limit ? 'Upgrade Required' : 'Upgrade Plan'}
                </Link>
            </div>
        </div>
    );
};

export default PackageStatus;