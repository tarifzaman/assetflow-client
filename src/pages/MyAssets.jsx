import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    const loadData = () => axiosPublic.get(`/my-requests/${user?.email}`).then(res => setRequests(res.data));
    useEffect(() => { loadData(); }, [user?.email]);

    const handleReturn = async (req) => {
        // Instant UI reaction
        setRequests(requests.map(r => r._id === req._id ? { ...r, status: 'returned' } : r));

        try {
            const res = await axiosPublic.patch(`/requests/return/${req._id}`, { assetId: req.assetId });
            if (res.data.modifiedCount > 0) {
                Swal.fire({ title: "Asset Returned", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
                loadData();
            }
        } catch (err) { loadData(); }
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-black mb-8">My Assets & Requests</h2>
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-lg bg-white">
                <table className="table w-full">
                    <thead className="bg-[#5C42CF] text-white">
                        <tr><th className="py-5 px-8">Asset</th><th>Type</th><th>Status</th><th>Request Date</th><th className="text-center">Action</th></tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id} className="hover:bg-slate-50">
                                <td className="py-5 px-8 font-bold">{req.productName}</td>
                                <td className="text-indigo-600 font-bold">{req.productType}</td>
                                <td>
                                    <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase ${req.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td className="text-center">
                                    {req.status === 'approved' ? (
                                        <button onClick={() => handleReturn(req)} className="bg-[#5C42CF] text-white px-6 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-indigo-700">Return</button>
                                    ) : req.status === 'returned' ? (
                                        <span className="text-emerald-500 font-black text-xs bg-emerald-50 px-4 py-1.5 rounded-lg">Completed</span>
                                    ) : <span className="text-slate-300">---</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyAssets;