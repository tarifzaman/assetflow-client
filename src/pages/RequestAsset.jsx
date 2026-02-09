import React, { useState } from "react";
import Swal from "sweetalert2";

const RequestAsset = () => {
  // Temporary data: HR jeta add korbe sheta ekhane show hobe
  const [assets, setAssets] = useState([
    { id: 1, name: "Macbook M3", type: "Returnable", availability: "Available" },
    { id: 2, name: "Monitor", type: "Returnable", availability: "Out of stock" },
    { id: 3, name: "Notebook", type: "Non-returnable", availability: "Available" },
  ]);

  const handleRequest = (asset) => {
    Swal.fire({
      title: `Request for ${asset.name}`,
      input: "textarea",
      inputLabel: "Additional Notes",
      inputPlaceholder: "Why do you need this asset?",
      showCancelButton: true,
      confirmButtonText: "Send Request",
      confirmButtonColor: "#570df8", // primary color
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Requested!", "Your request has been sent to HR.", "success");
        // Pore ekhane backend-e request pathanor logic hobe
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Request for an Asset</h2>
        
        {/* Search & Filter */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="input input-bordered input-sm" 
          />
          <select className="select select-bordered select-sm">
            <option disabled selected>Filter by Type</option>
            <option>Returnable</option>
            <option>Non-returnable</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="font-semibold">{asset.name}</td>
                <td>{asset.type}</td>
                <td>
                  <span className={`badge badge-sm ${asset.availability === 'Available' ? 'badge-success' : 'badge-error text-white'}`}>
                    {asset.availability}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleRequest(asset)}
                    disabled={asset.availability === 'Out of stock'}
                    className="btn btn-primary btn-xs rounded-lg px-4"
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAsset;