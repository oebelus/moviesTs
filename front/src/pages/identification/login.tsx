import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
    registerButton: ()=>void
    passwordButton: ()=>void
}

export default function Login({registerButton, passwordButton}: LoginProps) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    interface ErrorState {
        general?: string;
    }

    const [authenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState<ErrorState | null>(null);
    const nav = useNavigate()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setLoginData({...loginData, [name]: value})
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/users/auth', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(response)
            if (response.status === 200) {
                const userId = response.data.userId
                setAuthenticated(true)
                localStorage.setItem("authenticated", String(true))
                localStorage.setItem("userId", userId)
                localStorage.setItem("username", loginData.username)
                nav(`/${userId}`)
                window.location.reload();
            } else {
                setErrors({ general: response.data.error });
            }
        } catch (error) {
            e.preventDefault()
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                setErrors({ general: error.response.data.error });
            } else {
                setErrors({ general: 'An error occurred' });
            }
            console.error('ERROR: ', error);
        }
    }

    return (
        <div className="text-center">
            <div className="login-card card text-center">
            <h2 className='welcome-back'>Welcome Back</h2>
            <div className="movie-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                </svg>
            </div>
            <div className="card-body">
                <form className="login-form" action="/auth" method='POST' onSubmit={handleLogin}>
                    <div className="email form-item">
                        <label className='login-label' htmlFor="username">Username</label>
                        <input className='login-input' placeholder='Username' name='username' value={loginData.username} onChange={(e) => handleChange(e)} type="text" />
                        {errors && errors.general && errors.general.includes("User") && <p className="error-message">{errors.general}</p>}
                    </div>
                    <div className="pass form-item">
                        <label className='login-label' htmlFor="password">Password</label>
                        <input className='login-input' placeholder='Password' name='password' value={loginData.password} onChange={(e) => handleChange(e)} type="password" />
                        {errors && errors.general && errors.general.includes("Password") && <p className='error-message'>{errors.general}</p>}
                    </div>
                    <div className="middle">
                        <div className="remember">
                            <input type="checkbox" name="remember" id="" />
                            <p className='remember-text'>Remember Me</p>
                        </div>
                        <div className="forgot-pass">
                            <span onClick={passwordButton} className='like-link'>Forgot Password</span>
                        </div>
                    </div>
                    <button type='submit' className="login-button">Login</button>
                </form>
            </div>
            <div className="card-footer">
                <div className="sign">Don't have an account? <span className='like-link' onClick={registerButton}>Register</span></div>
            </div>
        </div>
        <p>{authenticated}</p>
        </div>
    )
}