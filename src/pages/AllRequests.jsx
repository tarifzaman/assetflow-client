import React, { useState } from "react";
import Swal from "sweetalert2";

const AllRequests = () => {
  // Temporary data for HR to see employee requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      assetName: "Macbook M3",
      assetType: "Returnable",
      requesterEmail: "employee1@test.com",
      requesterName: "Sabbir Ahmed",
      requestDate: "2026-02-08",
      status: "Pending",
      note: "Need for high-end coding.",
    },
    {
      id: 2,
      assetName: "Notebook",
      assetType: "Non-returnable",
      requesterEmail: "employee2@test.com",
      requesterName: "Anika Tabassum",
      requestDate: "2026-02-09",
      status: "Pending",
      note: "For daily meeting notes.",
    },
  ]);

  const handleApprove = (id) => {
    Swal.fire("Approved!", "Asset has been assigned to the employee.", "success");
    // Pore ekhane backend API call hobe status 'Approved' korar jonno
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Rejected", "The request has been declined.", "error");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">All Asset Requests</h2>
        <div className="badge badge-primary p-4 font-bold">Total Requests: {requests.length}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Asset Information</th>
              <th>Requester</th>
              <th>Request Date</th>
              <th>Note</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="hover">
                <td>
                  <div className="font-bold">{req.assetName}</div>
                  <div className="text-xs opacity-60">{req.assetType}</div>
                </td>
                <td>
                  <div className="font-semibold">{req.requesterName}</div>
                  <div className="text-xs opacity-60">{req.requesterEmail}</div>
                </td>
                <td className="text-sm">{req.requestDate}</td>
                <td className="text-sm max-w-xs truncate">{req.note}</td>
                <td>
                  <span className="badge badge-warning badge-sm font-medium">{req.status}</span>
                </td>
                <td className="flex justify-center gap-2">
                  <button 
                    onClick={() => handleApprove(req.id)}
                    className="btn btn-success btn-xs text-white"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(req.id)}
                    className="btn btn-error btn-xs text-white"
                  >
                    Reject
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

export default AllRequests;