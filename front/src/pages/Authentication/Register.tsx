import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    general?: string;
    confirmPassword?: string;
  }>({});

  const [registering, setRegistering] = useState(false)
  const [registerError, setRegisterError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setRegisterError(false)
  };

  const handleConfirmPassword = () => {
    return formData.password == confirmPassword;
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);  
    setRegisterError(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistering(true)

    if (!handleConfirmPassword()) {
      setErrors({...errors, confirmPassword: "Passwords aren't matching"})
      return;
    }

    setErrors({});
    
    try {
      const response = await axios.post('http://localhost:8000/users/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setRegistering(false)
        const { id, username } = response.data.user;
        localStorage.setItem('username', username);
        localStorage.setItem('userId', id);
        localStorage.setItem('authenticated', 'true');
        navigate(`/`);
      }
    } catch (error) {
      setRegistering(false)
      setRegisterError(true)
      
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const backendErrors = error.response.data.errors || {};
        setErrors(backendErrors);
      } else {
        setErrors({ general: "It's a server error! Please try again." });
      }
    }
  };

  return (
    <div className="flex -mt-24 md:-mt-20 justify-center items-center h-screen">
      <div className="p-8 text-white rounded-lg w-96 max-w-md">
        <h2 className="text-3xl font-semibold text-yellow-600 mb-6 text-center">Create an Account</h2>
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M3 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM0 14s1-3 4-3h8c3 0 4 3 4 3H0z"/>
          </svg>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              className="p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <input
              className="p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            {errors.email && <p className=" text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            {errors.password && <p className=" text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
            />
            {errors.confirmPassword && <p className=" text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="bg-yellow-600 text-white hover:border-2 hover:bg-transparent hover:border-yellow-600 hover:rounded-lg w-full py-3 rounded-lg transition-colors">{registering ? "Registering User..." : registerError ? "Error Registering User!" : "Register"}</button>
          {errors.general && <p className=" text-red-500 text-sm mt-3">{errors.general}</p>}
        </form>
        <div className="mt-4 text-center">
          <div className="text-gray-400">Already have an account? <span className="text-yellow-600 cursor-pointer underline hover:text-yellow-500" onClick={() => navigate('/login')}>Login</span></div>
        </div>
      </div>
    </div>
  );
}
