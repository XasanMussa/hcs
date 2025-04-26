import React, { useCallback } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

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
  const { user, logout } = useAuth();
  const scrollToSection = useScrollToSection();
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
          {!user ? (
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
          ) : (
            <Button
              color="inherit"
              onClick={logout}
              sx={{ color: "#333", ml: 2 }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
