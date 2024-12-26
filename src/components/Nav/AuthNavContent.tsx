"use client";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { FaHome } from "react-icons/fa";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { logout } from "@/actions";

const StyledAppBar = styled(AppBar)(({}) => ({
  backgroundColor: "#2c3e50",
}));

const StyledButton = styled(Button)(({}) => ({
  margin: "0 8px",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

function AuthNavBarContent() {
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>
        <StyledButton
          onClick={() => router.replace("/blog/add")}
          aria-label="add-blog"
        >
          Add Blog
        </StyledButton>
        <StyledButton
          onClick={async () => {
            await logout();
            redirect("/user/login");
          }}
          aria-label="logout"
        >
          Log Out
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default AuthNavBarContent;
