import { Routes, Route } from "react-router-dom";
import { Header } from "./features/auth/components/layout/Header";
import Registration from "./features/auth/pages/Registration";
import Login from "./features/auth/pages/Login";
import MembershipCreate from "./features/auth/pages/MembershipCreate";
import MyMemberships from "./features/auth/pages/MyMemberships";
import AdminMemberships from "./features/auth/pages/AdminMemberships";
import PasswordReset from "./features/auth/pages/PasswordResetRequestPage";
import ResetPasswordConfirm from "./features/auth/pages/PasswordResetConfirmPage";
import { HomeContent } from "./features/auth/components/HomeContent";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <HomeContent />
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

        {/* Admin Page */}
        <Route path="/admin" element={<AdminMemberships />} />

        {/* Password Reset*/}
        <Route path="/password-reset" element={<PasswordReset />} />

        <Route
          path="/reset-password" element={<ResetPasswordConfirm />}
        />

      </Routes>
    </div>
  );
}

export default App;
