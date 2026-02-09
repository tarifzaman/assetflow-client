import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AddAsset = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleAddAsset = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const assetData = {
            productName: form.name.value,
            productType: form.type.value,
            productQuantity: parseInt(form.quantity.value),
            hrEmail: user?.email,
            addedDate: new Date().toISOString(),
        };

        try {
            const res = await axiosPublic.post('/assets', assetData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Asset added to inventory!", "success");
                form.reset();
            }
        } catch (err) {
            Swal.fire("Error", "Could not add asset", "error");
        }
    };

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add New Asset</h2>
            <form onSubmit={handleAddAsset} className="space-y-4 bg-white p-8 rounded-2xl shadow">
                <input name="name" type="text" placeholder="Product Name" className="input input-bordered w-full" required />
                <select name="type" className="select select-bordered w-full" required>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
                <input name="quantity" type="number" placeholder="Quantity" className="input input-bordered w-full" required />
                <button className="btn btn-primary w-full">Add Asset</button>
            </form>
        </div>
    );
};

export default AddAsset;