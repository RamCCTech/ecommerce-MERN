import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
} from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("User signed up successfully:", data);

        navigate("/signin");
      } else {
        if (data.message === "Username already exists") {
          setSnackbarMessage(
            "Username already exists. Please choose a different username."
          );
        } else if (data.message === "Email already exists") {
          setSnackbarMessage(
            "Email already exists. Please use a different email address."
          );
        } else {
          // Handle other errors
          setSnackbarMessage(`Error: ${data.message}`);
        }

        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </Typography>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SignUp;
