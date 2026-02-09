import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);

  const loadData = () =>
    axiosPublic
      .get(`/hr-requests/${user?.email}`)
      .then((res) => setRequests(res.data));
  useEffect(() => {
    loadData();
  }, [user?.email]);

  const handleApprove = async (req) => {
    // Optimistic Update: সাথে সাথে UI চেঞ্জ হবে
    setRequests(
      requests.map((r) =>
        r._id === req._id ? { ...r, status: "approved" } : r,
      ),
    );

    try {
      const res = await axiosPublic.patch(`/requests/approve/${req._id}`, {
        assetId: req.assetId,
        requesterEmail: req.requesterEmail,
        hrEmail: user?.email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Approved!",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
        loadData();
      }
    } catch (err) {
      loadData();
    }
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-black mb-10 text-slate-800">
        Pending Requests
      </h2>
      <div className="overflow-hidden rounded-[2rem] shadow-xl bg-white border border-slate-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="py-6 px-10 uppercase text-[10px]">Asset</th>
              <th className="uppercase text-[10px]">Employee Email</th>
              <th className="uppercase text-[10px]">Status</th>
              <th className="text-center uppercase text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-slate-50 transition-all border-b border-slate-50"
              >
                <td className="py-6 px-10 font-bold text-slate-700">
                  {req.productName}
                </td>
                <td className="text-slate-500 font-bold">
                  {req.requesterEmail}
                </td>
                <td>
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      req.status === "approved"
                        ? "bg-emerald-500 text-white"
                        : req.status === "returned"
                          ? "bg-blue-500 text-white"
                          : req.status === "pending"
                            ? "bg-orange-400 text-white"
                            : "bg-rose-500 text-white"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="text-center">
                  {req.status === "pending" ? (
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleApprove(req)}
                        className="btn btn-xs bg-emerald-500 border-none text-white px-4 hover:scale-110 transition-transform"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          axiosPublic
                            .patch(`/requests/reject/${req._id}`)
                            .then(() => loadData())
                        }
                        className="btn btn-xs bg-rose-500 border-none text-white px-4 hover:scale-110 transition-transform"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      {req.status === "returned" ? (
                        <span className="text-blue-600 font-black text-[10px] bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 uppercase">
                          ✨ Returned Done
                        </span>
                      ) : (
                        <span className="text-slate-300 font-bold italic text-[11px] uppercase">
                          Processed
                        </span>
                      )}
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
