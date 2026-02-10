import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AssetList = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [assets, setAssets] = useState([]);

    const loadAssets = () => {
        if (user?.email) {
            axiosPublic.get(`/assets?email=${user.email}`).then(res => setAssets(res.data));
        }
    };

    useEffect(() => { if (!loading) loadAssets(); }, [user?.email, loading]);

    // Quantity এডিট করার ফাংশন
    const handleEdit = async (asset) => {
        const { value: newQty } = await Swal.fire({
            title: `Update Quantity for ${asset.productName}`,
            input: 'number',
            inputValue: asset.productQuantity,
            showCancelButton: true,
            confirmButtonColor: '#5C42CF',
        });

        if (newQty !== null && newQty !== "") {
            const res = await axiosPublic.patch(`/assets/update/${asset._id}`, { 
                productQuantity: parseInt(newQty) 
            });
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Quantity changed successfully.", "success");
                loadAssets();
            }
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/assets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Asset removed.", "success");
                    loadAssets();
                }
            }
        });
    };

    if (loading) return <div className="p-10 font-bold">Loading...</div>;

    return (
        <div className="p-10 bg-[#F8FAFC] min-h-screen">
            <h2 className="text-3xl font-black mb-10 text-[#1E1B4B] flex items-center gap-2">
                <span className="w-2 h-8 bg-[#5C42CF] rounded-full"></span>
                Asset Inventory ({assets.length})
            </h2>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-[#0F172A] text-white">
                        <tr className="border-none">
                            <th className="py-6 px-10">Product Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th className="text-right px-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {assets.map(asset => (
                            <tr key={asset._id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-6 px-10 font-bold text-slate-700">{asset.productName}</td>
                                <td>
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${
                                        asset.productType === 'Returnable' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-orange-50 text-orange-500 border-orange-100'
                                    }`}>
                                        {asset.productType}
                                    </span>
                                </td>
                                <td className="font-bold text-slate-600">{asset.productQuantity} pcs</td>
                                <td className="text-slate-400">{asset.addedDate ? new Date(asset.addedDate).toLocaleDateString() : '2/10/2026'}</td>
                                <td className="text-right px-10">
                                    <button onClick={() => handleEdit(asset)} className="text-[#5C42CF] font-bold mr-4 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(asset._id)} className="text-rose-500 font-bold hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;