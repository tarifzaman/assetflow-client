import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const JoinEmployee = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // ১. ফায়ারবেস ইউজার তৈরি
      await createUser(email, password);
      await updateUserProfile(name, ""); 

      const userInfo = {
        name,
        email,
        role: "employee",
        companyName: null, // শুরুতে কোনো কোম্পানি নেই
        createdAt: new Date().toISOString()
      };

      // ২. ডাটাবেজে ইউজার সেভ (Axios Post)
      const res = await axiosPublic.post('/users', userInfo);

      if (res.data.insertedId || res.data.message === 'user already exists') {
        localStorage.setItem('user-role', 'employee'); 
        Swal.fire("Welcome!", "Account created successfully!", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSign = async () => {
    try {
        const result = await googleLogin();
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          role: "employee",
          image: result.user?.photoURL,
          createdAt: new Date().toISOString()
        };
        await axiosPublic.post('/users', userInfo);
        localStorage.setItem('user-role', 'employee');
        Swal.fire("Success!", "Signed up with Google", "success");
        navigate("/dashboard");
    } catch (err) {
        Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-white shadow-2xl p-8 rounded-2xl border border-base-300">
        <h2 className="text-3xl font-black text-center mb-6 text-primary">Join Employee</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email Address" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          <button className="btn btn-primary w-full text-white font-bold">Register</button>
        </form>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSign} className="btn btn-outline w-full flex gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="G" />
          Google Sign Up
        </button>
        <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-primary font-bold underline">Login</Link></p>
      </div>
    </div>
  );
};

export default JoinEmployee;