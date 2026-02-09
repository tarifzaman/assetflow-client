import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const JoinEmployee = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1. Firebase Auth-e user create kora
      await createUser(email, password);
      
      // 2. Profile update (Sudhu name pathachhi, photo pore upload hobe)
      await updateUserProfile(name, ""); 

      Swal.fire("Welcome!", "Your employee account is ready 🎉", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSign = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Success!", "Signed up with Google", "success");
        navigate("/");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      
      {/* Left Info Section */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-secondary to-primary text-white">
        <h1 className="text-4xl font-extrabold leading-tight">
          Find work. <br /> Grow your career.
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Join as an employee to connect with companies, track your work, and
          grow professionally.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>✔ Verified companies</li>
          <li>✔ Transparent work tracking</li>
          <li>✔ Career-focused dashboard</li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md bg-white border border-base-300 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center">
            Join as Employee
          </h2>
          <p className="text-sm text-center opacity-70 mt-2">
            Create your profile in less than a minute
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <button className="btn btn-primary w-full rounded-xl mt-2">
              Create Employee Account
            </button>
          </form>

          <div className="divider text-xs my-6">OR</div>

          <button
            onClick={handleGoogleSign}
            className="btn btn-outline w-full rounded-xl gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5"
              alt="google"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinEmployee;