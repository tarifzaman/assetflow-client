import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadEmployees = () => {
        if (user?.email) {
            setLoading(true);
            axiosPublic.get(`/my-employees/${user.email}`)
                .then(res => {
                    setEmployees(res.data);
                    setLoading(false);
                });
        }
    };

    useEffect(() => { loadEmployees(); }, [user?.email]);

    const handleRemove = (email) => {
        Swal.fire({
            title: "Remove from Team?",
            text: "This will free up one member slot in your package.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, Remove Member"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.delete(`/remove-employee/${email}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Removed!", "Slot is now available.", "success");
                        loadEmployees();
                    }
                } catch (err) {
                    Swal.fire("Error", err.response?.data?.message || "Failed to remove", "error");
                }
            }
        });
    };

    if (loading) return <div className="p-10 font-bold">Loading Employees...</div>;

    return (
        <div className="p-10 bg-[#F3F4F6] min-h-screen">
            <h2 className="text-3xl font-black mb-10 text-slate-800 flex items-center gap-3">
                <span className="w-3 h-10 bg-[#5C42CF] rounded-full"></span>
                My Employee List ({employees.length})
            </h2>

            <div className="overflow-hidden rounded-[2.5rem] shadow-xl bg-white border border-slate-100">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-slate-900 text-white border-none">
                            <th className="py-6 px-10">Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-right px-10">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id} className="hover:bg-slate-50 border-b border-slate-100">
                                <td className="py-4 px-10">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={emp.image || "https://i.ibb.co/m096p2P/user.png"} alt="Employee" />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-slate-700">{emp.name}</td>
                                <td className="text-slate-500 font-medium">{emp.email}</td>
                                <td><span className="badge badge-outline font-bold text-[10px] uppercase">{emp.role}</span></td>
                                <td className="text-right px-10">
                                    <button 
                                        onClick={() => handleRemove(emp.email)}
                                        className="text-rose-500 font-bold hover:underline"
                                    >
                                        Remove from Team
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr><td colSpan="5" className="text-center py-20 font-bold text-slate-400">No employees added yet!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;