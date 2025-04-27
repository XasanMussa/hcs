import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Link,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  const [termsOpen, setTermsOpen] = useState(false);

  const handleTermsOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setTermsOpen(true);
  };

  const handleTermsClose = () => {
    setTermsOpen(false);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
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
                  green
                </Box>
                Clean
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
                    href="#"
                    color="inherit"
                    onClick={handleTermsOpen}
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

        {/* Connect With Us */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Connect With Us
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              href="https://facebook.com"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

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
            2024 "greenClean" All Rights Reserved
          </Typography>
        </Box>
      </Container>

      {/* Terms and Conditions Modal */}
      <Modal
        open={termsOpen}
        onClose={handleTermsClose}
        aria-labelledby="terms-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            maxWidth: 800,
            maxHeight: "90vh",
            overflow: "auto",
            p: 4,
            outline: "none",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#333", fontWeight: 600 }}
          >
            Terms and Conditions
          </Typography>

          <Typography variant="body1" paragraph sx={{ color: "#666", mt: 3 }}>
            Welcome to greenClean. By accessing our services, you agree to these
            terms and conditions.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            By accessing and using greenClean's services, you acknowledge that
            you have read, understood, and agree to be bound by these Terms and
            Conditions.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            2. Service Description
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            greenClean provides residential and commercial cleaning services. We
            reserve the right to modify, suspend, or discontinue any aspect of
            our services at any time.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            3. User Accounts
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            You are responsible for maintaining the confidentiality of your
            account information and password. You agree to notify us immediately
            of any unauthorized use of your account.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            4. Booking and Cancellation
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            • Bookings must be made at least 24 hours in advance
            <br />
            • Cancellations must be made at least 12 hours before the scheduled
            service
            <br />• Late cancellations may incur a fee of up to 50% of the
            service cost
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            5. Payment Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            Payment is required at the time of booking. We accept various
            payment methods including credit cards and mobile payments.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            6. Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            Your use of our services is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </Typography>

          <Typography variant="h6" sx={{ color: "#333", mt: 4, mb: 2 }}>
            7. Liability
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666" }}>
            While we strive to provide the best service possible, we are not
            liable for any indirect, incidental, or consequential damages
            arising from the use of our services.
          </Typography>

          <Typography variant="body1" sx={{ color: "#666", mt: 4 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
};

export default Footer;
