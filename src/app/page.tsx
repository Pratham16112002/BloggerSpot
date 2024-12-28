"use client";
import React from "react";
import { Button, Grid2, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        height: "90vh",
      }}
    >
      <Grid2 container justifyContent={"center"} alignItems={"center"}>
        <Container component={"div"}>
          <Typography component={"h1"} style={{ fontSize: 60 }}>
            Welcome to blogger spot
          </Typography>
          <Container component={"div"} sx={{ width: "50%" }}>
            <Button
              type="submit"
              onClick={() => router.replace("/blog")}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#2c3e50",
                padding: "12px 30px",
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: "#34495e",
                },
              }}
            >
              Share anything
            </Button>
          </Container>
        </Container>
      </Grid2>
    </Grid2>
  );
}
