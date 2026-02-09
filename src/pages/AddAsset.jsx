const AddAsset = () => {
    const handleAddAsset = (e) => {
        e.preventDefault();
        const form = e.target;
        // logic pore backend-er sathe hobe
        console.log("Asset Added");
    };

    return (
        <div className="max-w-xl bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Add New Asset</h2>
            <form onSubmit={handleAddAsset} className="space-y-4">
                <input name="productName" type="text" placeholder="Product Name" className="input input-bordered w-full" required />
                <select name="productType" className="select select-bordered w-full" required>
                    <option value="" disabled selected>Select Product Type</option>
                    <option value="Returnable">Returnable (Laptop, Phone)</option>
                    <option value="Non-Returnable">Non-Returnable (Pen, Paper)</option>
                </select>
                <input name="quantity" type="number" placeholder="Product Quantity" className="input input-bordered w-full" required />
                <button className="btn btn-primary w-full">Add Asset</button>
            </form>
        </div>
    );
};
export default AddAsset;
