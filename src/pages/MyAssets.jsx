import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const MyAssets = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/my-requests/${user.email}`)
                .then(res => setRequests(res.data));
        }
    }, [user, axiosPublic]);

    const handleCancel = (id) => {
        Swal.fire({
            title: "Cancel Request?",
            text: "You can re-request later.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Backend-e delete request pathano
                axiosPublic.delete(`/requests/${id}`).then(() => {
                    setRequests(requests.filter(r => r._id !== id));
                    Swal.fire("Cancelled", "Your request was removed.", "success");
                });
            }
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Assets & Requests</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow border">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Request Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td className="font-bold">{req.productName}</td>
                                <td>{req.productType}</td>
                                <td>
                                    <span className={`badge ${req.status === 'pending' ? 'badge-warning' : req.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td>
                                    {req.status === 'pending' && (
                                        <button onClick={() => handleCancel(req._id)} className="btn btn-xs btn-outline btn-error">Cancel</button>
                                    )}
                                    {req.status === 'approved' && req.productType === 'Returnable' && (
                                        <button className="btn btn-xs btn-primary">Return</button>
                                    )}
                                    {req.status === 'approved' && req.productType === 'Non-returnable' && (
                                        <span className="text-xs opacity-50">Permanent</span>
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