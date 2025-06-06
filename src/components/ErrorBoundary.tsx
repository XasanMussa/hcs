import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
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
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRefresh}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
