import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate=useNavigate();

  const onSubmit = async (data) => {
    
    try {

      const response = await axios.post(import.meta.env.VITE_SIGNUP_API, data);

      if (response.status !== 201) {
        toast.error(response?.data?.msg || "Error registering user. Please try again.");
        return;
      }

      const token= response?.data?.token;
      localStorage.setItem("token",token);
      localStorage.setItem("userId",response?.data?.userId);
      toast.success("Registration successful!");
      navigate("/home")
      reset();

    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage =error.response?.data?.msg || "Something went wrong. Please try again later.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('userName', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
          )}
        </div>


        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded ${
              errors.userEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('userEmail', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.userEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.userEmail.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className={`w-full px-3 py-2 border rounded ${
              errors.userPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('userPassword', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.userPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.userPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;