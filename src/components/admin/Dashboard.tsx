import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BookingsIcon from "@mui/icons-material/Book";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  role?: string;
  username?: string;
  email?: string;
  phone?: string;
}

interface Booking {
  id: string;
  status?: string;
  payment_status?: string;
  payment_amount?: number | string;
}

interface DashboardStats {
  totalUsers: number;
  totalCustomers: number;
  totalEmployees: number;
  totalAdmins: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  completedBookings: number;
}

export const Dashboard: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCustomers: 0,
    totalEmployees: 0,
    totalAdmins: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching dashboard stats...");

      // Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw new Error("Failed to fetch user data");
      }

      // Log raw profiles data for debugging
      console.log("Raw profiles data:", profilesData);

      // Count users by role (case-insensitive)
      const userCounts = ((profilesData as Profile[]) || []).reduce<
        Record<string, number>
      >((acc, profile) => {
        const role = (profile?.role || "unknown").toLowerCase();
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});

      console.log("User counts by role:", userCounts);

      // Fetch all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*");

      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        throw new Error("Failed to fetch booking data");
      }

      console.log("Raw bookings data:", bookingsData);

      // Calculate booking stats
      const bookingStats = {
        total: ((bookingsData as Booking[]) || []).length,
        pending: ((bookingsData as Booking[]) || []).filter(
          (b) => b.status?.toLowerCase() === "pending"
        ).length,
        completed: ((bookingsData as Booking[]) || []).filter(
          (b) => b.status?.toLowerCase() === "completed"
        ).length,
        revenue: ((bookingsData as Booking[]) || [])
          .filter((b) => b.payment_status?.toLowerCase() === "paid")
          .reduce((sum, booking) => {
            const amount = booking?.payment_amount;
            if (typeof amount === "string") {
              return sum + parseFloat(amount) || 0;
            }
            return sum + (amount || 0);
          }, 0),
      };

      console.log("Booking stats:", bookingStats);

      // Calculate total users
      const totalUsers = Object.values(userCounts).reduce((a, b) => a + b, 0);

      // Update stats with accurate counts
      const updatedStats = {
        totalUsers,
        totalCustomers: userCounts["customer"] || 0,
        totalEmployees: userCounts["employee"] || 0,
        totalAdmins: userCounts["admin"] || 0,
        totalBookings: bookingStats.total,
        totalRevenue: bookingStats.revenue,
        pendingBookings: bookingStats.pending,
        completedBookings: bookingStats.completed,
      };

      setStats(updatedStats);
      console.log("Final stats:", updatedStats);
    } catch (error) {
      console.error("Error in fetchDashboardStats:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/");
      return;
    }
    fetchDashboardStats();
  }, [userRole, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "#e3f2fd",
              "&:hover": {
                transform: "translateY(-4px)",
                transition: "transform 0.2s",
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleIcon sx={{ fontSize: 40, color: "#1976d2", mr: 2 }} />
                <Typography variant="h6" component="div">
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                {stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                All registered users
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Customers: {stats.totalCustomers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Employees: {stats.totalEmployees}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Admins: {stats.totalAdmins}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Bookings Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "#e8f5e9",
              "&:hover": {
                transform: "translateY(-4px)",
                transition: "transform 0.2s",
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <BookingsIcon sx={{ fontSize: 40, color: "#2e7d32", mr: 2 }} />
                <Typography variant="h6" component="div">
                  Total Bookings
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                {stats.totalBookings}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                All time bookings
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Pending: {stats.pendingBookings}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {stats.completedBookings}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "#fce4ec",
              "&:hover": {
                transform: "translateY(-4px)",
                transition: "transform 0.2s",
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <MoneyIcon sx={{ fontSize: 40, color: "#c2185b", mr: 2 }} />
                <Typography variant="h6" component="div">
                  Total Revenue
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                ${stats.totalRevenue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Total earnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
