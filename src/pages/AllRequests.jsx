import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    const loadData = () => {
        axiosPublic.get(`/hr-requests/${user?.email}`).then(res => setRequests(res.data));
    };

    useEffect(() => { loadData(); }, [user?.email]);

    const handleApprove = async (req) => {
        const res = await axiosPublic.patch(`/requests/approve/${req._id}`, { assetId: req.assetId, requesterEmail: req.requesterEmail, hrEmail: user?.email });
        if (res.data.modifiedCount > 0) {
            Swal.fire({ title: "Approved!", icon: "success", confirmButtonColor: "#10B981" });
            loadData();
        }
    };

    return (
        <div className="p-10 bg-[#F3F4F6] min-h-screen">
            <h2 className="text-3xl font-black mb-10 text-slate-800 tracking-tight flex items-center gap-3">
                <span className="w-3 h-10 bg-emerald-500 rounded-full"></span>
                Pending Requests
            </h2>
            <div className="overflow-hidden border-0 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-900 text-white border-b-0">
                            <th className="py-6 px-10 text-left text-xs font-black uppercase tracking-[3px]">Asset</th>
                            <th className="text-left text-xs font-black uppercase tracking-[3px]">Employee Email</th>
                            <th className="text-left text-xs font-black uppercase tracking-[3px]">Status</th>
                            <th className="text-center text-xs font-black uppercase tracking-[3px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {requests.map(req => (
                            <tr key={req._id} className="hover:bg-emerald-50/30 transition-colors">
                                <td className="py-6 px-10 font-black text-slate-700">{req.productName}</td>
                                <td className="text-slate-500 font-bold">{req.requesterEmail}</td>
                                <td>
                                    <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                                        req.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                                        req.status === 'returned' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                        req.status === 'pending' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-rose-100 text-rose-700 border-rose-200'
                                    }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {req.status === 'pending' ? (
                                        <div className="flex justify-center gap-4">
                                            <button onClick={() => handleApprove(req)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-200 transition-all active:scale-90">Approve</button>
                                            <button onClick={() => axiosPublic.patch(`/requests/reject/${req._id}`).then(() => loadData())} className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-rose-200 transition-all active:scale-90">Reject</button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center">
                                            {req.status === 'returned' ? (
                                                <span className="text-blue-600 font-black text-[11px] bg-blue-50 px-5 py-2 rounded-2xl border-2 border-dashed border-blue-100">
                                                    ✨ PROCESSED DONE
                                                </span>
                                            ) : <span className="text-slate-300 font-black text-[10px] uppercase tracking-widest">Processed</span>}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AllRequests;