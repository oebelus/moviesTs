import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    interface ErrorState {
        general?: string;
    }

    const [authenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState<ErrorState | null>(null);
    
    const navigate = useNavigate();

    const goToRegister = () => {
      navigate("/register")  
    };

    const goToPasswordReset = () => {
        navigate('/password');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/users/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                const userId = response.data.userId
                setAuthenticated(true)
                localStorage.setItem("authenticated", String(authenticated))
                localStorage.setItem("userId", userId)
                localStorage.setItem("username", loginData.username)
                navigate(`/${userId}`)
                window.location.reload();
            } else {
                setErrors({ general: response.data.error });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                setErrors({ general: error.response.data.error });
            } else {
                setErrors({ general: 'An error occurred' });
            }
            console.error('ERROR: ', error);
        }
    }

    return (
        <div className="flex -mt-24 md:-mt-20 justify-center items-center h-screen">
            <div className="p-8 text-white rounded-lg w-96 max-w-md">
                <h2 className='text-3xl font-semibold text-yellow-600 mb-6 text-center'>Welcome Back</h2>
                <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                    </svg>
                </div>
                <form className="" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label  htmlFor="username">Username</label>
                        <input className='p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white' placeholder='Username' name='username' value={loginData.username} onChange={handleChange} type="text" />
                        {errors && errors.general && errors.general.includes("User") && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
                    </div>
                    <div className="mb-6">
                        <label className='' htmlFor="password">Password</label>
                        <input className='p-3 w-full rounded-lg border border-gray-300 bg-gray-700 text-white' placeholder='Password' name='password' value={loginData.password} onChange={handleChange} type="password" />
                        {errors && errors.general && errors.general.includes("Password") && <p className='text-red-500 text-sm mt-1'>{errors.general}</p>}
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <input type="checkbox" name="remember" />
                            <p className='text-sm text-gray-400'>Remember Me</p>
                        </div>
                        <div className="">
                            <span onClick={goToPasswordReset} className='text-sm text-yellow-600 hover:text-yellow-500 cursor-pointer'>Forgot Password</span>
                        </div>
                    </div>
                    <button type='submit' className="bg-yellow-600 text-white hover:bg-yellow-500 w-full py-3 rounded-lg transition-colors">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <div className="text-gray-400">Don't have an account? <span className='text-yellow-600 cursor-pointer underline hover:text-yellow-500' onClick={goToRegister}>Register</span></div>
                </div>
            </div>
        </div>
    )
}
