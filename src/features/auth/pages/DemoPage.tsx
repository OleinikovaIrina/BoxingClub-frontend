import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/api";
import { useAuth } from "../context/UseAuth";
import boxing from "../../../assets/boxing.jpg";
import { useState } from "react";

const DemoPage = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);

    const loginAsUser = async () => {
        setLoadingUser(true);
        try {
            const res = await api.post(
                "/api/auth/login",
                {
                    email: "user@test.com",
                    password: "Password@1",
                });

            login(res.data.accessToken, res.data.role);
            navigate("/membership");
        } finally {
            setLoadingUser(false);
        }

    };

    const loginAsAdmin = async () => {
        setLoadingAdmin(true);
        try {
            const res = await api.post(
                "/api/auth/login",
                {
                    email: "admin@test.com",
                    password: "Password@2",
                }
            );
            login(res.data.accessToken, res.data.role);
            navigate("/admin");
        } finally {
            setLoadingAdmin(false);
        }

    };
    return (
        <div className="min-h-screen bg-[url('/boxing.jpg')] bg-cover bg-center"
            style={{ backgroundImage: `url(${boxing})` }}>

            <div className="min-h-screen bg-black/30 flex items-center justify-center">

                < div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center flex flex-col gap-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Try the application instantly
                    </h1>
                    <p className="text-gray-600">
                        This demo allows you to explore the system without registration.
                    </p>

                    <div className="text-left text-s text-gray-700">
                        <p>👤 <b>User:</b> create and view memberships</p>
                        <p>👑 <b>Admin:</b> review and approve requests</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">

                        <button
                            onClick={loginAsUser}
                            disabled={loadingUser}
                            className="bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingUser ? "Waking server..." : "Login as User"}
                        </button>

                        <button
                            onClick={loginAsAdmin}
                            disabled={loadingAdmin}
                            className="bg-purple-700 text-white py-3 rounded-lg text-lg hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingAdmin ? "Waking server..." : "Login as Admin"}
                        </button>

                    </div>
                    <p className="text-s text-gray-500 mt-4">
                        Demo accounts are pre-created. No registration required.
                    </p>

                    <p className="text-s text-gray-500">
                        Password reset is implemented (Mailtrap testing).
                    </p>

                </div>
            </div>
        </div >
    );
};

export default DemoPage;