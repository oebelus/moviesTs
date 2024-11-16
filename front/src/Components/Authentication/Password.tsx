import { useNavigate } from 'react-router-dom';

function Password() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="card text-center">
      <h2 className="reset-password">Reset Password</h2>
      <div className="card-body">
        <form className="login-form" action="" method="POST">
          <div className="email form-item">
            <label className="login-label" htmlFor="email">Your Email</label>
            <input
              className="login-input"
              placeholder="Email Address"
              name="email"
              type="text"
            />
          </div>

          <button className="login-button">Submit</button>
        </form>
      </div>
      <div className="card-footer">
        <div className="sign">
          <span className="like-link" onClick={goToLogin}>Back to Login</span>
        </div>
      </div>
    </div>
  );
}

export default Password;
