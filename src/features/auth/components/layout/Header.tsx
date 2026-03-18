import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import { useLocation } from "react-router-dom";

export function Header() {
    const { role, setRole } = useAuth();
    const navigate = useNavigate();

    const isAdmin = role === "ROLE_ADMIN";
    const isAuthenticated = !!role;

    const location = useLocation();
    const isHome = location.pathname === "/";

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/password-reset" ||
        location.pathname === "/reset-password" ||
        location.pathname === "/demo";

    const logout = () => {
        localStorage.removeItem("token");
        setRole(null);
        navigate("/login");
    };

    return (
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 h-16 z-20">            <Link
            to="/"
            className="text-3xl font-bold text-purple-800">
            Boxing Club
        </Link>

            <nav
                className={`flex gap-6 font-semibold ${isHome ? "text-white" : "text-black"
                    }`}
            >
                {!isAuthenticated && (
                    <>
                        <Link to="/demo" className="hover:text-purple-300 transition">
                            Demo
                        </Link>

                        <Link to="/login" className="hover:text-purple-300 transition">
                            Login
                        </Link>

                        <Link to="/register" className="hover:text-purple-300 transition">
                            Register
                        </Link>

                    </>
                )}

                {!isAuthPage && isAuthenticated && !isAdmin && (
                    <>
                        <Link to="/membership" className="hover:text-purple-300 transition">
                            Create Membership
                        </Link>

                        <Link to="/my-memberships" className="hover:text-purple-300 transition">
                            My Memberships
                        </Link>

                        <button onClick={logout} className="hover:text-purple-300 transition">
                            Logout
                        </button>
                    </>
                )}

                {!isAuthPage && isAuthenticated && isAdmin && (
                    <>
                        <Link to="/admin" className="hover:text-purple-300 transition">
                            Admin
                        </Link>

                        <button onClick={logout} className="hover:text-purple-300 transition">
                            Logout
                        </button>
                    </>
                )}

            </nav>
        </header >
    );
}