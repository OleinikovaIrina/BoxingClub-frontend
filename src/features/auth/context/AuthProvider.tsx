import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("accessToken"))
    );
    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
    );

    const login = (token: string, role: string) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        setIsAuthenticated(true);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                setRole,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


