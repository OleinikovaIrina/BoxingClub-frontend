import { Routes, Route } from "react-router-dom";
import Registration from "./features/auth/pages/Registration";
import Login from "./features/auth/pages/Login";
import MembershipCreate from "./features/auth/pages/MembershipCreate";
import MyMemberships from "./features/auth/pages/MyMemberships";

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-purple-600">
              Tailwind работает!
            </h1>
          </div>
        }
      />

      {/* Registration Page */}
      <Route path="/register" element={<Registration />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Membership Page */}
      <Route path="/membership" element={<MembershipCreate />} />

      {/* My Memberships Page */}
      <Route path="/my-memberships" element={<MyMemberships />} />
    </Routes>
  );

}

export default App;
