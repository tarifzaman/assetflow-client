import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const JoinHR = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userInfo = {
      name: form.name.value,
      companyName: form.company.value,
      companyLogo: form.logo.value,
      email: form.email.value,
      role: "hr",
      package: form.package.value,
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Firebase Auth
      await createUser(userInfo.email, form.password.value);
      await updateUserProfile(userInfo.name, userInfo.companyLogo);

      // 2. Database Save
      const res = await axiosPublic.post('/users', userInfo);
      
      if (res.data.insertedId || res.data.message === 'user already exists') {
        localStorage.setItem('user-role', 'hr');
        Swal.fire("Success!", "Company Registered Successfully!", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-white p-8 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register as HR Manager</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
          <input name="company" type="text" placeholder="Company Name" className="input input-bordered w-full" required />
          <input name="logo" type="text" placeholder="Logo URL" className="input input-bordered w-full" required />
          <select name="package" className="select select-bordered w-full" required>
            <option value="5">Basic ($5 - 5 emp)</option>
            <option value="8">Standard ($8 - 10 emp)</option>
            <option value="15">Premium ($15 - 20 emp)</option>
          </select>
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          <button className="btn btn-primary w-full">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default JoinHR;