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
import AiCoachPanel from "./features/auth/components/AiCoachPanel";
import DemoPage from "./features/auth/pages/DemoPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="relative min-h-screen">

              <HomeContent />

              <div className="absolute right-20 top-1/2 -translate-y-1/2">
                <AiCoachPanel />
              </div>

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

        {/* Demo*/}
        <Route path="/demo" element={<DemoPage />}
        />

      </Routes>
    </div>
  );
}

export default App;
