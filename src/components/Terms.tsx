import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Terms: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4 }}>
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
      </Container>
    </Box>
  );
};

export default Terms;
