import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get("userInfo");
        const tok = Cookies.get("token");
        console.log(savedUser);
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const login = (userData, token) => {
        setUser(userData);
        // Cookies.set("token", token, { expires: 7, sameSite: "strict" });
        Cookies.set("userInfo", JSON.stringify(userData), { expires: 7 });
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("token");
        Cookies.remove("userInfo");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};