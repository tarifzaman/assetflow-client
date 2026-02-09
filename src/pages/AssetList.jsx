import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    const loadData = () => {
        axiosPublic.get(`/my-requests/${user?.email}`)
            .then(res => setRequests(res.data));
    };

    useEffect(() => {
        loadData();
    }, [user?.email]);

    const handleReturn = async (req) => {
        const res = await axiosPublic.patch(`/requests/return/${req._id}`, { assetId: req.assetId });
        if (res.data.modifiedCount > 0) {
            Swal.fire("Returned!", "Asset returned successfully.", "success");
            loadData();
        }
    };

    return (
        <div className="p-10 font-sans">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Assets & Requests</h2>
            <div className="overflow-hidden border border-gray-300 rounded-2xl shadow-sm bg-white">
                <table className="table w-full border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-sm border-b">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Asset Name</th>
                            <th className="text-left font-semibold uppercase tracking-wider">Type</th>
                            <th className="text-left font-semibold uppercase tracking-wider">Status</th>
                            <th className="text-left font-semibold uppercase tracking-wider">Request Date</th>
                            <th className="text-center font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.map(req => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 font-bold text-gray-800">{req.productName}</td>
                                <td className="text-gray-600">{req.productType}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                        req.status === 'approved' ? 'bg-emerald-500 text-white' : 
                                        req.status === 'returned' ? 'bg-gray-100 text-gray-500' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="text-gray-500">{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td className="text-center">
                                    {req.status === 'approved' ? (
                                        <button 
                                            onClick={() => handleReturn(req)}
                                            className="bg-[#5C42CF] hover:bg-[#4a35a8] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md"
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <span className="text-gray-300 text-sm font-medium">
                                            {req.status === 'returned' ? 'Completed' : '---'}
                                        </span>
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

export default MyAssets;