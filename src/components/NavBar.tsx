"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaEdit, FaSave } from "react-icons/fa";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#2c3e50",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "0 8px",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
        >
          <FaHome size={24} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>
        {isAuthenticated ? (
          <StyledButton onClick={() => null} aria-label="logout">
            Log Out
          </StyledButton>
        ) : (
          <Box>
            <StyledButton onClick={() => null} aria-label="login">
              Login
            </StyledButton>
            <StyledButton
              variant="outlined"
              sx={{ borderColor: "#ffffff" }}
              aria-label="signup"
            >
              Sign Up
            </StyledButton>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}
