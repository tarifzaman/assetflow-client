import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpgradePackage = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [currentPackage, setCurrentPackage] = useState("");

    // বর্তমান প্যাকেজ ডাটা লোড করা
    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/hr-package-status/${user.email}`)
                .then(res => setCurrentPackage(res.data.packageType));
        }
    }, [user?.email]);

    const packages = [
        { id: 1, name: "Basic", members: 5, price: 5, color: "from-blue-500 to-indigo-600" },
        { id: 2, name: "Standard", members: 10, price: 10, color: "from-[#5C42CF] to-[#7C3AED]" },
        { id: 3, name: "Premium", members: 20, price: 15, color: "from-slate-800 to-slate-900" }
    ];

    const handlePurchase = async (pkg) => {
        if (currentPackage === pkg.name) return; // অলরেডি থাকলে কাজ করবে না

        Swal.fire({
            title: `Upgrade to ${pkg.name}?`,
            text: `Confirm purchase for $${pkg.price}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.patch("/update-package", {
                    email: user?.email,
                    packageType: pkg.name,
                    newLimit: pkg.members
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "Package Updated", "success");
                    setCurrentPackage(pkg.name); // স্ট্যাটাস আপডেট
                }
            }
        });
    };

    return (
        <div className="p-10 bg-[#F8FAFC]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg) => {
                    const isRunning = currentPackage === pkg.name;
                    return (
                        <div key={pkg.id} className={`rounded-[2.5rem] overflow-hidden border-4 ${isRunning ? 'border-emerald-400 shadow-2xl scale-105' : 'border-transparent shadow-md'}`}>
                            <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white text-center`}>
                                <h3 className="text-xl font-black">{pkg.name}</h3>
                                <div className="text-4xl font-black">${pkg.price}</div>
                                {isRunning && <span className="badge badge-success mt-2 font-bold uppercase p-3">Running Plan</span>}
                            </div>
                            <div className="p-8 bg-white text-center">
                                <button 
                                    disabled={isRunning}
                                    onClick={() => handlePurchase(pkg)}
                                    className={`w-full py-3 rounded-xl font-bold uppercase ${isRunning ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-[#5C42CF] text-white'}`}
                                >
                                    {isRunning ? "Already Active" : "Upgrade Now"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpgradePackage;