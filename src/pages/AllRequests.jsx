import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        if (user?.email) {
            const res = await axiosPublic.get(`/hr-requests/${user.email}`);
            setRequests(res.data);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [user?.email]);

    const handleApprove = async (request) => {
        try {
            // ব্যাকএন্ডের ৫ নম্বর API (Approve) কল করা হচ্ছে
            const res = await axiosPublic.patch(`/requests/approve/${request._id}`, {
                assetId: request.assetId,
                requesterEmail: request.requesterEmail, // এমপ্লয়ির ইমেইল
                hrEmail: user?.email // আপনার (HR) ইমেইল
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Employee added to your team!", "success");
                fetchRequests();
            }
        } catch (err) {
            Swal.fire("Error", "Could not approve", "error");
        }
    };

    const handleReject = async (id) => {
        const res = await axiosPublic.patch(`/requests/reject/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected", "Request has been declined", "info");
            fetchRequests();
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6">Pending Requests</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Asset Name</th>
                            <th>Requester</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.productName}</td>
                                <td>{req.requesterEmail}</td>
                                <td><span className="badge badge-warning">{req.status}</span></td>
                                <td>
                                    {req.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleApprove(req)} className="btn btn-xs btn-success text-white">Approve</button>
                                            <button onClick={() => handleReject(req._id)} className="btn btn-xs btn-error text-white">Reject</button>
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