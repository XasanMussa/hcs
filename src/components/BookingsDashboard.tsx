import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an auth context
import { supabase } from "../supabaseClient";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  serviceType: string;
  price: number;
}

const BookingsDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch user's bookings
    const fetchBookings = async () => {
      try {
        if (!user) return;
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id);
        if (error) throw error;
        setBookings(data);
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
                  {booking.serviceType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(booking.date).toLocaleDateString()}
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
                  <Button variant="outlined" color="error" size="small">
                    Cancel
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookingsDashboard;
