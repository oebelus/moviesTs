import { Link } from "react-router-dom";

interface NavbarProps {
    authenticated: boolean;
    isAuthenticated: boolean | null;
    userId: number;
    setVisible: (visible: boolean) => void;
    setAuthenticated: (authenticated: boolean) => void
}

export default function Navbar({isAuthenticated, authenticated, userId, setVisible, setAuthenticated}: NavbarProps) {
        const handleLogout = () => {
        ["authenticated", "userId", "username", "isAuthenticated"].forEach(item => localStorage.removeItem(item));
        setAuthenticated(false);
        window.location.reload(); // to check later
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="link-li" to={isAuthenticated ? `/${userId}` : '/'}>
                        Home
                    </Link>
                    </li>
                    {authenticated && (
                    <li className="nav-item dropdown">
                        <div
                        className="nav-link dropdown-toggle"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        My Movies
                        </div>
                        <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdownMenuLink">
                        <li>
                            <Link className="link-li" to={`/${userId}/top`}>
                            My Top 100 Movies
                            </Link>
                        </li>
                        <li>
                            <Link className="link-li" to={`/${userId}/watchlist`}>
                            My Watchlist
                            </Link>
                        </li>
                        <li>
                            <Link className="link-li" to={`/${userId}/watched`}>
                            Watched
                            </Link>
                        </li>
                        </ul>
                    </li>
                    )}
                    {authenticated ? (
                    <li className="nav-item">
                        <div className="link-li" onClick={handleLogout}>
                        Logout
                        </div>
                    </li>
                    ) : (
                    <li className="nav-item">
                        <Link className="link-li" to="auth/login" onClick={() => setVisible(true)}>
                        Login
                        </Link>
                    </li>
                    )}
                </ul>
                </div>
            </div>
        </nav>
    )
}
