import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
    userId: string | null;
    setVisible: (visible: boolean) => void;
    setAuthenticated: (authenticated: boolean) => void;
}

export default function Navbar({
    userId,
    setVisible,
    setAuthenticated,
}: NavbarProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLogout = () => {
        ["authenticated", "userId", "username", "isAuthenticated"].forEach(item =>
            localStorage.removeItem(item)
        );
        setAuthenticated(false);
        window.location.reload();
    };

    const authenticated2 = localStorage.getItem("accessToken") != undefined;

    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <nav className="top-0 left-0 w-full bg-background z-50 shadow-md">
            <div className="flex items-center justify-between p-4">
                {/* Mobile Toggle Button */}
                <button
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                    className="md:hidden"
                >
                    <span className="block w-6 h-1 bg-yellow-600 mb-1"></span>
                    <span className="block w-6 h-1 bg-yellow-600 mb-1"></span>
                    <span className="block w-6 h-1 bg-yellow-600"></span>
                </button>
                <Link
                    to={authenticated2 ? `/${userId}` : "/"}
                    className="text-xl font-bold text-yellow-600"
                >
                    My Movies
                </Link>
            </div>

            {/* Sliding Navbar */}
            <div
                className={`fixed top-0 left-0 h-full bg-card transform transition-transform duration-300 ${
                    isNavOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0 md:flex md:bg-transparent w-48 z-50`}
            >
                <div className="flex justify-between items-center p-4">
                    {/* Close Button */}
                    <button
                        onClick={toggleNav}
                        className="text-yellow-600 font-bold"
                    >
                        <span className="material-symbols-outlined md:hidden">
                            close
                        </span>
                    </button>
                </div>

                <ul className="flex flex-col p-4 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                    <li>
                        <Link
                            to={authenticated2 ? `/${userId}` : "/"}
                            onClick={() => setIsNavOpen(false)}
                            className="hover:text-[#896207] text-yellow-600"
                        >
                            Home
                        </Link>
                    </li>
                    {authenticated2 && (
                        <>
                            <li>
                                <Link
                                    to={`/${userId}/watchlist`}
                                    onClick={() => setIsNavOpen(false)}
                                    className="hover:text-[#896207] text-yellow-600"
                                >
                                    Watchlist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`/${userId}/watched`}
                                    onClick={() => setIsNavOpen(false)}
                                    className="hover:text-[#896207] text-yellow-600"
                                >
                                    Watched
                                </Link>
                            </li>
                        </>
                    )}
                    {authenticated2 ? (
                        <>
                            <li>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsNavOpen(false);
                                    }}
                                    className="hover:text-[#896207] text-yellow-600"
                                >
                                    Logout
                                </button>
                            </li>
                            <li className="w-[160px] relative">
                                <Link
                                    to={`/${userId}/top`}
                                    onClick={() => setIsNavOpen(false)}
                                    className="hover:text-[#896207] text-yellow-600"
                                >
                                    My Top 100 Movies
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="flex gap-4">
                            <Link
                                to="/login"
                                onClick={() => {
                                    setVisible(true);
                                    setIsNavOpen(false);
                                }}
                                className="hover:text-[#896207] text-yellow-600"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => {
                                    setVisible(true);
                                    setIsNavOpen(false);
                                }}
                                className="hover:text-[#896207] text-yellow-600"
                            >
                                Register
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
