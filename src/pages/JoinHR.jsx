import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const JoinHR = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const company = form.company.value;
    const logo = form.logo.value;
    const email = form.email.value;
    const password = form.password.value;
    const pkg = form.package.value;

    try {
      await createUser(email, password);
      await updateUserProfile(name, logo);
      Swal.fire("Success!", "Company Registered Successfully!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  const handleGoogleSign = () => {
    googleLogin()
      .then(() => {
        Swal.fire(
          "Welcome!",
          "Google Login Successful. Complete your company profile later.",
          "success"
        );
        navigate("/");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      
      {/* Left Branding Section */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-primary to-secondary text-white">
        <h1 className="text-4xl font-extrabold leading-tight">
          Hire smarter. <br /> Build faster teams.
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Join as an HR manager and manage recruitment, employees and hiring
          pipelines from one powerful dashboard.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>✔ Verified company profiles</li>
          <li>✔ Flexible hiring packages</li>
          <li>✔ Secure & scalable system</li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md bg-white border border-base-300 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center">
            Register as HR Manager
          </h2>
          <p className="text-sm text-center opacity-70 mt-2">
            Create your company profile in minutes
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
              name="company"
              type="text"
              placeholder="Company Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="logo"
              type="text"
              placeholder="Company Logo URL"
              className="input input-bordered w-full"
              required
            />

            <select
              name="package"
              className="select select-bordered w-full"
              required
            >
              <option disabled selected>
                Select Hiring Package
              </option>
              <option value="5">Basic — $5 (5 employees)</option>
              <option value="8">Standard — $8 (10 employees)</option>
              <option value="15">Premium — $15 (20 employees)</option>
            </select>

            <input
              name="email"
              type="email"
              placeholder="Company Email"
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
              Create Company Account
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
            Already registered?{" "}
            <Link to="/login" className="text-primary font-semibold underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinHR;
