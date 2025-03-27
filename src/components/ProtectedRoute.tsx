import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

type ProtectedRouteProps = {
    children: React.ReactNode;
  };
  
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
    const { token } = useAuth()
    
    if (!token) {
        return <Navigate to={'/'} replace />
    }

    return <>
        {children};
    </>
};