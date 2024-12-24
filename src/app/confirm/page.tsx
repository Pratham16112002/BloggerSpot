"use client";
import { Button, Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { FaArrowRight } from "react-icons/fa";
import React from "react";
import { redirect } from "next/navigation";

const WelcomeContainer = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  textAlign: "center",
}));

const ConfirmPage = () => {
  return (
    <Container>
      <WelcomeContainer>
        <Typography
          component={"h2"}
          variant="h2"
          gutterBottom
          sx={{ color: "#2c3e50", fontWeight: "bold" }}
        >
          Your account is activated
        </Typography>
        <Typography
          component={"h5"}
          variant="h5"
          gutterBottom
          sx={{ color: "#666", mb: 4 }}
        >
          Your journey to amazing content begins here
        </Typography>
        <Button
          onClick={() => redirect("/user/login")}
          variant="contained"
          size="large"
          endIcon={<FaArrowRight />}
          sx={{
            backgroundColor: "#2c3e50",
            padding: "12px 30px",
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#34495e",
            },
          }}
        >
          Login Now
        </Button>
      </WelcomeContainer>
    </Container>
  );
};

export default ConfirmPage;
