import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  service_type: string;
  price: number;
  created_at: string;
}

const BookingsDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user) return;
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handleCancelClick = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!bookingToCancel) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingToCancel);

      if (error) throw error;

      setBookings(
        bookings.map((booking) =>
          booking.id === bookingToCancel
            ? { ...booking, status: "cancelled" as const }
            : booking
        )
      );
      setCancelDialogOpen(false);
      setBookingToCancel(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} key={booking.id}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom>
                  {booking.service_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {booking.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {booking.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${booking.price}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label={booking.status}
                  color={getStatusColor(booking.status)}
                />
                {booking.status === "pending" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleCancelClick(booking.id)}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
        {bookings.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                You don't have any bookings yet.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose}>No, Keep it</Button>
          <Button onClick={handleCancelConfirm} color="error" autoFocus>
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingsDashboard;
