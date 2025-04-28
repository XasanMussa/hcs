import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Box, CircularProgress, Typography } from "@mui/material";

// Create a loading component
const LoadingScreen = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    bgcolor="#fff"
  >
    <CircularProgress />
    <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
      Initializing application...
    </Typography>
  </Box>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render loading screen first
root.render(<LoadingScreen />);

// Initialize the app with proper error handling
const initializeApp = async () => {
  try {
    // Render the actual application
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to initialize application:", error);
    root.render(
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff"
        p={3}
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom color="error">
          Failed to Initialize Application
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please refresh the page or try again later.
        </Typography>
      </Box>
    );
  }
};

// Start initialization
initializeApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
