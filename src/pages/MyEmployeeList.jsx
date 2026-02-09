import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const MyEmployees = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/my-employees/${user.email}`)
                .then(res => {
                    setEmployees(res.data);
                });
        }
    }, [user?.email, axiosPublic]);

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6">My Team ({employees.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {employees.length === 0 ? (
                    <p>No employees found in your team. Approve a request first!</p>
                ) : (
                    employees.map(emp => (
                        <div key={emp._id} className="card bg-white shadow-md p-6 border border-primary/20">
                            <div className="flex items-center gap-4">
                                <div className="avatar placeholder">
                                    <div className="bg-primary text-white rounded-full w-12">
                                        <span>{emp.name?.charAt(0)}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{emp.name}</h3>
                                    <p className="text-sm text-gray-500">{emp.email}</p>
                                    <div className="badge badge-outline mt-2 capitalize">{emp.role}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEmployees;