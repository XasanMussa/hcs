import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SignupSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 64,
            color: "#1db85c",
            mb: 2,
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Congratulations!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Your account has been successfully created
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          Welcome to greenClean! We're excited to have you as part of our
          community.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGoHome}
          sx={{
            backgroundColor: "#1db85c",
            "&:hover": {
              backgroundColor: "#169c4b",
            },
            px: 4,
          }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default SignupSuccess;
