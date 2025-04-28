import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";

const steps = ["Select Date & Time", "Payment", "Confirmation"];

// WaafiPay credentials
const MERCHANT_UID = "M0910291";
const API_USER_ID = "1000416";
const API_KEY = "API-675418888AHX";

const BookingForm: React.FC = () => {
  const location = useLocation();
  const selectedService = location.state?.service;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [evcNumber, setEvcNumber] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const requestPayload = {
        schemaVersion: "1.0",
        requestId: Date.now().toString(),
        timestamp: new Date().toISOString(),
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
          merchantUid: MERCHANT_UID,
          apiUserId: API_USER_ID,
          apiKey: API_KEY,
          paymentMethod: "MWALLET_ACCOUNT",
          payerInfo: {
            accountNo: evcNumber,
          },
          transactionInfo: {
            referenceId: Date.now().toString(),
            invoiceId: "154",
            amount: selectedService.price,
            currency: "USD",
            description: `Payment for ${selectedService.title} service`,
          },
        },
      };

      const response = await fetch("https://api.waafipay.net/asm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.responseCode === "2001") {
        // Payment successful
        const bookingData = {
          user_id: user?.id,
          date: selectedDate?.toISOString().split("T")[0],
          time: selectedTime?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          service_type: selectedService.title,
          price: parseFloat(selectedService.price),
          payment_amount: parseFloat(selectedService.price),
          payment_status: "paid",
          payment_phone: evcNumber,
          transaction_id: responseData.params.transactionId,
          reference_id: responseData.params.referenceId,
          status: "pending",
        };

        const { error: supabaseError } = await supabase
          .from("bookings")
          .insert([bookingData]);

        if (supabaseError) throw supabaseError;

        setSuccess(true);
        setTimeout(() => {
          navigate("/my-bookings");
        }, 2000);
      } else {
        throw new Error(responseData.responseMsg || "Payment failed");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setError("");

    if (activeStep === 0) {
      if (!selectedDate || !selectedTime) {
        setError("Please select both date and time");
        return;
      }
    }

    if (activeStep === 1) {
      if (!evcNumber) {
        setError("Please enter EVC Plus number");
        return;
      }
      if (evcNumber.length < 8) {
        setError("EVC Plus number must be at least 8 digits");
        return;
      }
    }

    if (activeStep === 2) {
      await handlePayment();
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError("");
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{ mb: 3, width: "100%" }}
              disablePast
            />
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
              sx={{ mb: 3, width: "100%" }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              WaafiPay Payment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Amount to pay: ${selectedService?.price}
            </Typography>
            <TextField
              fullWidth
              label="EVC Plus Number"
              value={evcNumber}
              onChange={(e) => setEvcNumber(e.target.value)}
              type="number"
              placeholder="Enter your EVC Plus number"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Service: {selectedService?.title}
              <br />
              Price: ${selectedService?.price}
              <br />
              Date: {selectedDate?.toLocaleDateString()}
              <br />
              Time:{" "}
              {selectedTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              <br />
              EVC Number: {evcNumber}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!selectedService) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error">
          Please select a service package from the services page first.
        </Alert>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Book {selectedService.title}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Payment successful! Booking confirmed. Redirecting to dashboard...
            </Alert>
          )}

          {renderStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading || success}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {activeStep === steps.length - 1 ? "Confirm & Pay" : "Next"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default BookingForm;
