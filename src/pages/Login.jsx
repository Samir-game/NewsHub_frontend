import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_API, data);

      if (response.status !== 200) {
        toast.error(response?.data?.msg || "Invalid login credentials.");
        return;
      }

      const token = response?.data?.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", response?.data?.userId);
      toast.success("Login successful!");
      navigate("/home");
      reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="userEmail">
            Email:
          </label>
          <input
            id="userEmail"
            type="email"
            aria-invalid={errors.userEmail ? "true" : "false"}
            aria-describedby="userEmail-error"
            className={`w-full px-3 py-2 border rounded ${
              errors.userEmail ? "border-red-500" : "border-gray-300"
            }`}
            {...register("userEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.userEmail && (
            <p
              id="userEmail-error"
              className="text-red-500 text-sm"
              role="alert"
            >
              {errors.userEmail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="userPassword">
            Password:
          </label>
          <input
            id="userPassword"
            type="password"
            aria-invalid={errors.userPassword ? "true" : "false"}
            aria-describedby="userPassword-error"
            className={`w-full px-3 py-2 border rounded ${
              errors.userPassword ? "border-red-500" : "border-gray-300"
            }`}
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.userPassword && (
            <p
              id="userPassword-error"
              className="text-red-500 text-sm"
              role="alert"
            >
              {errors.userPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
