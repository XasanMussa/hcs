import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "in progress" | "completed" | "cancelled";
  service_type: string;
  location: string;
  notes?: string;
  customer?: {
    username: string;
    phone: string;
  };
}

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          customer:profiles!bookings_user_id_fkey(username, phone)
        `
        )
        .eq("assigned_employee", user.id)
        .order("date", { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showSnackbar("Error fetching tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", taskId);

      if (error) throw error;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: newStatus as Booking["status"] }
            : task
        )
      );

      showSnackbar("Task status updated successfully", "success");
    } catch (error) {
      console.error("Error updating task status:", error);
      showSnackbar("Error updating task status", "error");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "info";
      case "pending":
        return "warning";
      case "in progress":
        return "secondary";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
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
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "white",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    {task.service_type}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Date: {new Date(task.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Time: {task.time}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Location: {task.location}
                  </Typography>
                  {task.notes && (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Notes: {task.notes}
                    </Typography>
                  )}
                  {task.customer && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        Customer Information:
                      </Typography>
                      <Typography variant="body2">
                        Name: {task.customer.username}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {task.customer.phone}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "flex-start", md: "flex-end" },
                    gap: 2,
                  }}
                >
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    sx={{ minWidth: 100, justifyContent: "center" }}
                  />
                  <FormControl sx={{ minWidth: 200 }}>
                    <Select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      size="small"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="in progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
        {tasks.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No tasks assigned to you yet.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

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

export default TaskManagement;
