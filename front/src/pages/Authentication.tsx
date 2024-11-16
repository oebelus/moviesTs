import { NavLink, Outlet } from 'react-router-dom';
import '../Authentication.css';

export default function Authentication() {
  return (
    <div className="authentication-container">
      <nav className="auth-nav">
        <NavLink to="login" className={({ isActive }) => (isActive ? 'active-link' : 'link')}>
          Login
        </NavLink>
        <NavLink to="register" className={({ isActive }) => (isActive ? 'active-link' : 'link')}>
          Register
        </NavLink>
      </nav>
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
}
