import React from "react";
import { Button, Grid2, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
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
            <Link href={"/user/login"}>
              <Button
                type="submit"
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
            </Link>
          </Container>
        </Container>
      </Grid2>
    </Grid2>
  );
}
