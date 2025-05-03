import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import { supabase } from "../../lib/supabase";

interface Profile {
  id: string;
  username: string;
  phone: string;
}

interface Booking {
  id: string;
  user_id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "in progress" | "completed" | "cancelled";
  service_type: string;
  payment_amount: number;
  payment_status: string;
  assigned_employee?: string;
  created_at: string;
  customer?: Profile;
  employee?: {
    id: string;
    username: string;
  };
  location: string;
  notes?: string;
}

interface Employee {
  id: string;
  username: string;
}

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    fetchBookings();
    fetchEmployees();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          customer:profiles!bookings_user_id_fkey(id, username, phone),
          employee:profiles!bookings_assigned_employee_fkey(id, username)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showSnackbar("Error fetching bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("role", "employee");

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus as Booking["status"] }
            : booking
        )
      );

      showSnackbar("Booking status updated successfully", "success");
    } catch (error) {
      console.error("Error updating booking status:", error);
      showSnackbar("Error updating booking status", "error");
    }
  };

  const handleAssignEmployee = async (
    bookingId: string,
    employeeId: string
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("bookings")
        .update({ assigned_employee: employeeId })
        .eq("id", bookingId);

      if (error) throw error;
      await fetchBookings();
    } catch (error) {
      console.error("Error assigning employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#2196f3";
      case "pending":
        return "#ff9800";
      case "in progress":
        return "#9c27b0";
      case "completed":
        return "#4caf50";
      case "cancelled":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bookings Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Typography variant="body2" component="div">
                    {booking.customer?.username || "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    {booking.customer?.phone || "No phone"}
                  </Typography>
                  {booking.notes && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mt: 1, fontStyle: "italic" }}
                    >
                      Note: {booking.notes}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(booking.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.service_type}</TableCell>
                <TableCell>{booking.location}</TableCell>
                <TableCell>${booking.payment_amount}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === "completed"
                        ? "success"
                        : booking.status === "cancelled"
                        ? "error"
                        : booking.status === "pending"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.payment_status}
                    color={
                      booking.payment_status === "paid" ? "success" : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={booking.assigned_employee || ""}
                      onChange={(e) =>
                        handleAssignEmployee(booking.id, e.target.value)
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Not assigned</em>
                      </MenuItem>
                      {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="in progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No bookings found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookingsManagement;
