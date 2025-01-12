import { useNavigate } from 'react-router-dom';

function Password() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='mt-40 mx-auto lg:w-[50%]'>
      <h2 className='text-3xl font-semibold text-yellow-600 mb-6 text-center'>Reset Password</h2>
      <form className="flex flex-col gap-6" action="" method="POST">
        <div className="flex flex-col gap-4 justify-center w-[70%] mx-auto">
          <label className="text-white text-left ml-4 -mb-4 text-lg" htmlFor="email">Your Email Address</label>
          <input
            className="border-2 border-white bg-transparent rounded-lg p-3 text-white"
            placeholder="Email Address"
            name="email"
            type="text"
          />
          <button className="bg-yellow-600 md:text-lg text-white py-3 hover:border-2 hover:bg-transparent rounded-md hover:rounded-lg hover:border-yellow-600">Submit to Reset Password</button>
        </div>
      </form>
      <div className="card-footer">
        <div className="sign">
          <span className="like-link" onClick={goToLogin}>Back to Login</span>
        </div>
      </div>
    </div>
  );
}

export default Password;
