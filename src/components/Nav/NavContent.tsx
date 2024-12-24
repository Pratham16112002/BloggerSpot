"use client";
import React from "react";
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
import { redirect } from "next/navigation";
import { logout } from "@/actions";
import { useRouter } from "next/navigation";

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

interface Props {
  isAuthenticated: boolean;
}

function NavBarContent({ isAuthenticated }: Props) {
  const router = useRouter();
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
        >
          <FaHome size={24} onClick={() => router.replace("/blog")} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>
        {isAuthenticated ? (
          <>
            <StyledButton
              onClick={() => router.replace("/blog/add")}
              aria-label="add-blog"
            >
              Add Blog
            </StyledButton>
            <StyledButton
              onClick={async () => {
                logout();
              }}
              aria-label="logout"
            >
              Log Out
            </StyledButton>
          </>
        ) : (
          <Box>
            <StyledButton
              onClick={() => redirect("/user/login")}
              aria-label="login"
            >
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

export default NavBarContent;
