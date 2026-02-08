import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire("Welcome back 👋", "Login successful", "success");
        navigate("/");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Success!", "Logged in with Google", "success");
        navigate("/");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      
      {/* Left Branding Section */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-primary to-secondary text-white">
        <h1 className="text-4xl font-extrabold leading-tight">
          Welcome back.
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Log in to manage your work, employees, and company operations
          in one place.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>✔ Secure authentication</li>
          <li>✔ HR & employee dashboards</li>
          <li>✔ Real-time activity tracking</li>
        </ul>
      </div>

      {/* Right Login Form */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md bg-white border border-base-300 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center">Sign in</h2>
          <p className="text-sm text-center opacity-70 mt-2">
            Use your account credentials
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email address"
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
              Login
            </button>
          </form>

          <div className="divider text-xs my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
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
            Don’t have an account?{" "}
            <Link
              to="/join-employee"
              className="text-primary font-semibold underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
