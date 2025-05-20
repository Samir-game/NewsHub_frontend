import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css'; 

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(import.meta.env.VITE_SIGNUP_API, data);

      if (response.status !== 201) {
        toast.error(response?.data?.msg || 'Error registering user. Please try again.');
        return;
      }

      const token = response?.data?.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', response?.data?.userId);
      toast.success('Registration successful!');
      navigate('/home');
      reset();
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.msg || 'Something went wrong. Please try again later.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your NewsHub Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register('userName', { required: 'Name is required' })}
            className="form-input"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('userEmail', { required: 'Email is required' })}
            className="form-input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('userPassword', { required: 'Password is required' })}
            className="form-input"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="login-link">
          Already have an account?{' '}
          <Link to="/login" className="login-link-anchor">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
