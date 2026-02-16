import { createContext } from "react"

export type AuthContextType = {
    isAuthenticated: boolean;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
