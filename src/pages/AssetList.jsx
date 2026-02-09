import React, { useState } from "react";

const AssetList = () => {
  // Temporary data for UI testing
  const [assets, setAssets] = useState([
    { id: 1, name: "Macbook M3", type: "Returnable", quantity: 5, date: "2026-02-01" },
    { id: 2, name: "Ballpen", type: "Non-returnable", quantity: 50, date: "2026-02-05" },
    { id: 3, name: "Dell Monitor", type: "Returnable", quantity: 0, date: "2026-02-08" },
  ]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Manage Assets</h2>
        
        {/* Search & Filter UI */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search asset..." 
            className="input input-bordered input-sm w-full max-w-xs" 
          />
          <select className="select select-bordered select-sm">
            <option disabled selected>Filter by Type</option>
            <option>Returnable</option>
            <option>Non-returnable</option>
          </select>
          <select className="select select-bordered select-sm">
            <option disabled selected>Stock Status</option>
            <option>Available</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="hover">
                <td className="font-semibold">{asset.name}</td>
                <td>
                  <span className={`badge badge-sm ${asset.type === 'Returnable' ? 'badge-primary' : 'badge-ghost'}`}>
                    {asset.type}
                  </span>
                </td>
                <td>
                  {asset.quantity > 0 ? (
                    <span className="text-success font-bold">{asset.quantity}</span>
                  ) : (
                    <span className="text-error font-bold">Out of Stock</span>
                  )}
                </td>
                <td className="text-sm opacity-70">{asset.date}</td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-ghost btn-xs text-info underline">Update</button>
                  <button className="btn btn-ghost btn-xs text-error underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-6">
        <div className="join">
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm btn-active">2</button>
          <button className="join-item btn btn-sm">3</button>
        </div>
      </div>
    </div>
  );
};

export default AssetList;