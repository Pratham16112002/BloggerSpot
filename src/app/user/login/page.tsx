"use client";
import React, { FormEvent, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiMail, FiLock } from "react-icons/fi";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", { email, password });
  };

  const handleSignUpClick = () => {
    // Handle navigation to sign up page
    console.log("Navigate to sign up page");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledPaper elevation={3}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={() => null}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiMail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2c3e50",
                padding: "10px 10px",
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: "#34495e",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={handleSignUpClick}
              sx={{ mt: 1 }}
            >
              <Typography component={"span"} color="#2c3e50">
                Don't have an account? Sign Up
              </Typography>
            </Button>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default LoginForm;
