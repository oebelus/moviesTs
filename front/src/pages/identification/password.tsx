interface PasswordProps {
    goLogin: () => void
}

function Password({goLogin}: PasswordProps) {
  return (
    <div className="card text-center">
        <h2 className='reset-password'>Reset Password</h2>
        <div className="card-body">
            <form className="login-form" action="" method='POST'>
                <div className="email form-item">
                    <label className='login-label' htmlFor="email">Your Email</label>
                    <input className='login-input' placeholder='Email Address' name='email' type="text" />
                </div>
                
                <button className="login-button">Submit</button>
            </form>
        </div>
        <div className="card-footer">
            <div className="sign"><span className='like-link' onClick={goLogin}>Back to Login</span></div>
        </div>
    </div>
  )
}

export default Password