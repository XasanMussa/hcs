import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const SignIn: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(form.email, form.password);
      window.location.href = "/";
    } catch (err: any) {
      setMessage(err.message || "Error signing in");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f8f8",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
        >
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.2 }}
            type="submit"
          >
            Sign In
          </Button>
          {message && (
            <Typography color="error" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
