import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { supabase } from "../lib/supabase";

interface EmployeeRouteProps {
  children: React.ReactNode;
}

const EmployeeRoute: React.FC<EmployeeRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isEmployee, setIsEmployee] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmployeeStatus = async () => {
      if (!user) {
        setIsEmployee(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setIsEmployee(data.role === "employee");
      } catch (error) {
        console.error("Error checking employee status:", error);
        setIsEmployee(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkEmployeeStatus();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user || !isEmployee) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default EmployeeRoute;
