import React from "react";
import Map from "./Map";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.4 8 3 7.5 3H4C3.4 3 3 3.4 3 4C3 13.4 10.6 21 20 21C20.6 21 21 20.6 21 20V16.5C21 15.9 20.6 15.5 20 15.5ZM5 5H6.5C6.6 5.9 6.8 6.8 7 7.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5ZM19 19C17.7 18.9 16.4 18.6 15.2 18.2L16.4 17C17.2 17.2 18.1 17.4 19 17.4V19Z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
      fill="currentColor"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill="currentColor"
    />
  </svg>
);

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book-now");
  };

  return (
    <Box id="contact" sx={{ py: 8, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column - Contact Info */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#333",
                  mb: 1,
                  fontSize: "1rem",
                }}
              >
                Contact info
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                  lineHeight: 1.2,
                }}
              >
                Keep In Touch
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 4,
                  fontSize: "1rem",
                }}
              >
                We prioritize responding to your inquiries promptly to ensure
                you receive the assistance you need in a timely manner
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Phone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#1db85c",
                      borderRadius: "50%",
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "1rem",
                      }}
                    >
                      Call Us
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "0.9rem" }}
                    >
                      +(08) 255 201 888
                    </Typography>
                  </Box>
                </Box>

                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#1db85c",
                      borderRadius: "50%",
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "1rem",
                      }}
                    >
                      Email Now
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "0.9rem" }}
                    >
                      Hello@procleaning.com
                    </Typography>
                  </Box>
                </Box>

                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#1db85c",
                      borderRadius: "50%",
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <LocationIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "1rem",
                      }}
                    >
                      Address
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "0.9rem" }}
                    >
                      Hodan District, Taleex, Mogadishu, Somalia
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Add Book Now Button */}
              <Button
                variant="contained"
                onClick={handleBookNow}
                sx={{
                  backgroundColor: "#1db85c",
                  "&:hover": {
                    backgroundColor: "#169c4b",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                  py: 1.5,
                  width: "fit-content",
                  px: 4,
                  mt: 4,
                }}
              >
                Book Now
              </Button>
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder="Name"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f8f8",
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1db85c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1db85c",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Email"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f8f8",
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1db85c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1db85c",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Message"
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f8f8",
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1db85c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1db85c",
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
                  fontSize: "1rem",
                  py: 1.5,
                  width: "fit-content",
                  px: 4,
                }}
              >
                Sent Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Map />
    </Box>
  );
};

export default Contact;
