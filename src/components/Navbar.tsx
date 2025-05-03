import React, { useCallback } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        // Wait for navigation, then scroll
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [navigate, location]
  );
};

const Navbar: React.FC = () => {
  const { user, userRole, signOut } = useAuth();
  const scrollToSection = useScrollToSection();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1db85c" }}>
            greenClean
          </Link>
        </Typography>
        <Box>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => scrollToSection("home")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => scrollToSection("about")}
          >
            About
          </Button>

          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => scrollToSection("services")}
          >
            Services
          </Button>

          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>

          {user ? (
            <>
              {userRole === "admin" ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/bookings"
                  sx={{ color: "#333", ml: 2 }}
                >
                  Dashboard
                </Button>
              ) : userRole === "employee" ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/employee/tasks"
                  sx={{ color: "#333", ml: 2 }}
                >
                  My Tasks
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/my-bookings"
                  sx={{ color: "#333", ml: 2 }}
                >
                  My Bookings
                </Button>
              )}
              <Button
                color="inherit"
                onClick={handleSignOut}
                sx={{ color: "#333", ml: 2 }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                sx={{ color: "#333", ml: 2 }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/signup"
                sx={{
                  backgroundColor: "#1db85c",
                  "&:hover": {
                    backgroundColor: "#169c4b",
                  },
                  ml: 2,
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
