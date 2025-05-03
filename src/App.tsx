import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import QualityServices from "./components/QualityServices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import Terms from "./components/Terms";
import BookingForm from "./components/BookingForm";
import BookingsDashboard from "./components/BookingsDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import EmployeeRoute from "./components/EmployeeRoute";
import AdminLayout from "./components/admin/AdminLayout";
import EmployeeLayout from "./components/employee/EmployeeLayout";
import Dashboard from "./components/admin/Dashboard";
import BookingsManagement from "./components/admin/BookingsManagement";
import EmployeesManagement from "./components/admin/EmployeesManagement";
import TaskManagement from "./components/employee/TaskManagement";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#1db85c",
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Routes>
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="bookings" element={<BookingsManagement />} />
                <Route path="employees" element={<EmployeesManagement />} />
              </Route>

              {/* Employee Routes */}
              <Route
                path="/employee"
                element={
                  <EmployeeRoute>
                    <EmployeeLayout />
                  </EmployeeRoute>
                }
              >
                <Route path="tasks" element={<TaskManagement />} />
              </Route>

              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Box component="main" sx={{ mt: "64px" }}>
                      <Hero />
                      <QualityServices />
                      <Services />
                      <Contact />
                    </Box>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <Navbar />
                    <Box component="main" sx={{ mt: "64px" }}>
                      <SignIn />
                    </Box>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Navbar />
                    <Box component="main" sx={{ mt: "64px" }}>
                      <SignUp />
                    </Box>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/terms"
                element={
                  <>
                    <Navbar />
                    <Box component="main" sx={{ mt: "64px" }}>
                      <Terms />
                    </Box>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/book-now"
                element={
                  <PrivateRoute>
                    <>
                      <Navbar />
                      <Box component="main" sx={{ mt: "64px" }}>
                        <BookingForm />
                      </Box>
                      <Footer />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <PrivateRoute>
                    <>
                      <Navbar />
                      <Box component="main" sx={{ mt: "64px" }}>
                        <BookingsDashboard />
                      </Box>
                      <Footer />
                    </>
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
