import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [assets, setAssets] = useState([]);
    const [myRequests, setMyRequests] = useState([]);

    const fetchData = async () => {
        const assetRes = await axiosPublic.get('/assets');
        setAssets(assetRes.data);
        
        if (user?.email) {
            const reqRes = await axiosPublic.get(`/my-requests/${user.email}`);
            setMyRequests(reqRes.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user?.email]);

    const handleRequest = async (asset) => {
        const requestData = {
            assetId: asset._id,
            productName: asset.productName,
            productType: asset.productType,
            requesterEmail: user?.email,
            requesterName: user?.displayName,
            requestDate: new Date().toISOString(),
            status: "pending",
            hrEmail: asset.hrEmail
        };

        const res = await axiosPublic.post('/requests', requestData);
        if (res.data.insertedId) {
            Swal.fire("Requested!", "Waiting for HR approval.", "success");
            fetchData();
        }
    };

    const handleCancel = async (assetId) => {
        const requestToCancel = myRequests.find(req => req.assetId === assetId && req.status === "pending");
        if (!requestToCancel) return;

        const res = await axiosPublic.delete(`/requests/${requestToCancel._id}`);
        if (res.data.deletedCount > 0) {
            Swal.fire("Cancelled!", "Your request has been removed.", "info");
            fetchData();
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Available Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assets.map(asset => {
                    const isRequested = myRequests.find(req => req.assetId === asset._id);

                    return (
                        <div key={asset._id} className="card bg-white shadow-xl p-6 border border-base-200 rounded-2xl">
                            <h3 className="text-xl font-bold">{asset.productName}</h3>
                            <p className="text-gray-500">Type: {asset.productType}</p>
                            <p className={`font-bold ${asset.productQuantity > 0 ? 'text-success' : 'text-error'}`}>
                                Stock: {asset.productQuantity}
                            </p>
                            
                            <div className="mt-4 flex flex-col gap-2">
                                {isRequested ? (
                                    <div className="space-y-2">
                                        {isRequested.status === "rejected" ? (
                                            <div className="text-center bg-red-50 p-2 rounded-lg border border-red-200">
                                                <span className="text-error font-bold text-sm">HR Rejected your application</span>
                                            </div>
                                        ) : (
                                            <>
                                                <button disabled className={`btn btn-sm w-full text-white ${isRequested.status === "approved" ? "btn-success" : "btn-neutral"}`}>
                                                    {isRequested.status === "approved" ? "Approved" : "Requested"}
                                                </button>
                                                {isRequested.status === "pending" && (
                                                    <button onClick={() => handleCancel(asset._id)} className="btn btn-sm btn-outline btn-error w-full">
                                                        Cancel Request
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <button 
                                        disabled={asset.productQuantity <= 0}
                                        onClick={() => handleRequest(asset)}
                                        className="btn btn-sm btn-primary w-full"
                                    >
                                        Request Asset
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RequestAsset;