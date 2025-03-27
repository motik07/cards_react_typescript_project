import { createContext, useContext, useEffect, useState } from "react";
import { DecodedTokLoginInterface } from "../interfaces/token_interface/DecodedTokLoginInterface";
import { decodeToken } from "../services/token_service/TokenDecode";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  decodedToken: DecodedTokLoginInterface | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedTokLoginInterface | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage on mount
    const storedToken = sessionStorage.getItem("token");
    console.log("Saved token: ", storedToken, decodeToken(storedToken));
    if (storedToken) {
      setToken(storedToken);
      setDecodedToken(decodeToken(storedToken))
    }
}, []);

const login = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    setDecodedToken(decodeToken(newToken))
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setDecodedToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, decodedToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an inside AuthProvider");
    }
    return context;
};
  