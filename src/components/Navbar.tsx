import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1db85c" }}>
            Pro Cleaning
          </Link>
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: "#333" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/services"
            sx={{ color: "#333" }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{ color: "#333" }}
          >
            About
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{ color: "#333" }}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1db85c",
              "&:hover": {
                backgroundColor: "#169c4b",
              },
              ml: 2,
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
