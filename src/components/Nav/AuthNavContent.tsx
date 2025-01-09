"use client";
import React from "react";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FaHome } from "react-icons/fa";
import { redirect, usePathname } from "next/navigation";
import { logout } from "../../actions";
import { privateRoutes } from "@/util/route";

function AuthNavContent() {
  const pathName = usePathname();
  const isPrivateRoute = privateRoutes.some((route) =>
    pathName.startsWith(route)
  );
  return (
    <AppBar sx={{ backgroundColor: "#2c3e50" }} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
        >
          <FaHome size={24} onClick={() => redirect("/blog")} />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>
        <Box component={"div"}>
          {isPrivateRoute ? (
            <>
              <Button
                sx={{
                  margin: "0 8px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => redirect("/friends/add")}
                aria-label="add-blog"
              >
                Add Friends
              </Button>
              <Button
                sx={{
                  margin: "0 8px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => redirect("/blog/add")}
                aria-label="add-blog"
              >
                Add Blog
              </Button>
              <Button
                sx={{
                  margin: "0 8px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={async () => {
                  await logout();
                  redirect("/user/login");
                }}
                aria-label="logout"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{
                  margin: "0 8px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => redirect("/user/login")}
                aria-label="login"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  margin: "0 8px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                aria-label="signup"
                onClick={() => redirect("/user/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AuthNavContent;
