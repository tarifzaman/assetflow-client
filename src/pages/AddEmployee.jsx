import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const AddEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth(); // HR data

    useEffect(() => {
        axiosPublic.get('/unaffiliated-employees')
            .then(res => setEmployees(res.data));
    }, [axiosPublic]);

    const handleAddToTeam = async (employee) => {
        // HR er info database theke niye ashte hobe (Role management logic theke)
        const hrData = await axiosPublic.get(`/users/role/${user.email}`);
        
        const info = {
            employeeEmail: employee.email,
            hrEmail: user.email,
            companyName: "Your Company Name", // Eita HR er user object theke anben
        };

        try {
            const res = await axiosPublic.patch('/users/add-to-company', info);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Added!", `${employee.name} is now in your team.`, "success");
                setEmployees(employees.filter(emp => emp.email !== employee.email));
            }
        } catch (err) {
            Swal.fire("Error", "Could not add employee", "error");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Add Employees to Your Company</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map(emp => (
                    <div key={emp._id} className="card bg-base-100 shadow-md border p-4">
                        <div className="flex items-center gap-4">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-12">
                                    <span>{emp.name.charAt(0)}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold">{emp.name}</h3>
                                <p className="text-xs opacity-60">{emp.email}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleAddToTeam(emp)}
                            className="btn btn-primary btn-sm mt-4 w-full"
                        > Add to Team </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddEmployee;