import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#0A2518", color: "white", pt: 6, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                <Box component="span" sx={{ color: "#1db85c" }}>
                  Pro
                </Box>
                Cleaning
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "0.875rem",
                color: "#B3B3B3",
                mb: 1,
              }}
            >
              Cleaning Services company
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "#B3B3B3",
                maxWidth: "300px",
              }}
            >
              Stay updated with our latest cleaning tips, service updates, and
              helpful articles on maintaining a spotless home.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              {/* Company Links */}
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    mb: 2,
                    color: "white",
                  }}
                >
                  Company
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Link
                    href="#about"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    About Us
                  </Link>
                  <Link
                    href="#services"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    Services
                  </Link>
                  <Link
                    href="#team"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    Our Team
                  </Link>
                </Box>
              </Grid>

              {/* Know More Links */}
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    mb: 2,
                    color: "white",
                  }}
                >
                  Know More
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Link
                    href="#support"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    Support
                  </Link>
                  <Link
                    href="#privacy"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#terms"
                    sx={{
                      color: "#B3B3B3",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": { color: "#1db85c" },
                    }}
                  >
                    Terms & conditions
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: "600",
                mb: 2,
                color: "white",
              }}
            >
              Newsletter
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="Email Goes here"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1db85c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1db85c",
                    },
                    "& input::placeholder": {
                      color: "#B3B3B3",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1db85c",
                  "&:hover": {
                    backgroundColor: "#169c4b",
                  },
                  textTransform: "none",
                  px: 3,
                }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: 6,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#B3B3B3", fontSize: "0.875rem" }}
          >
            2024 "Procleaning" All Rights Received
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
