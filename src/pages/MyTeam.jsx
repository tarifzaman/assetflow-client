import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const MyTeam = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [team, setTeam] = useState([]);

    useEffect(() => {
        if (user?.email) {
            // Prothome user-er hrEmail ber kora
            axiosPublic.get(`/users/role/${user.email}`).then(res => {
                const hrEmail = res.data.hrEmail;
                if(hrEmail) {
                    // Tarpor oi HR-er shob employee ana
                    axiosPublic.get(`/my-employees/${hrEmail}`).then(res => setTeam(res.data));
                }
            });
        }
    }, [user, axiosPublic]);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member._id} className="card bg-base-100 shadow-sm border p-5 flex flex-row items-center gap-4">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-white rounded-full w-12">
                                <span>{member.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{member.name}</p>
                            <p className="text-xs opacity-60">Employee</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;