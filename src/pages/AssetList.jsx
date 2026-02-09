import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const AssetList = () => {
    const [assets, setAssets] = useState([]); // Dummy data-r bodole empty array
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    // Database theke data ana
    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/assets?email=${user.email}`)
                .then(res => {
                    setAssets(res.data);
                });
        }
    }, [user, axiosPublic]);

    // Delete korar logic (Database thekeo muche jabe)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/assets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // UI thekeo muche dewa
                            const remaining = assets.filter(a => a._id !== id);
                            setAssets(remaining);
                            Swal.fire("Deleted!", "Asset has been removed.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Assets ({assets.length})</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Product Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 opacity-50">No assets found in database.</td></tr>
                        ) : (
                            assets.map(asset => (
                                <tr key={asset._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="font-semibold">{asset.productName}</td>
                                    <td>
                                        <span className={`badge ${asset.productType === 'Returnable' ? 'badge-primary' : 'badge-ghost'}`}>
                                            {asset.productType}
                                        </span>
                                    </td>
                                    <td>{asset.productQuantity}</td>
                                    <td>{new Date(asset.addedDate).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(asset._id)} className="btn btn-error btn-sm text-white">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;