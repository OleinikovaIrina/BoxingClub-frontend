import { Link } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";

export function Header() {
    const { role } = useAuth();
    const isAdmin = role === "ROLE_ADMIN";

    return (
        <header className="flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200">
            <Link
                to="/"
                className="text-xl font-bold text-purple-600">
                Boxing Club
            </Link>

            <nav className="flex gap-4 font-bold">
                <Link to="/membership">Create Membership</Link>

                <Link to="/my-memberships">My Memberships</Link>

                {isAdmin && (
                    <Link to="/admin">Admin</Link>

                )}

                <Link to="/login">User Login</Link>
                <Link to="/register">Create Account</Link>
            </nav>
        </header>
    )
}