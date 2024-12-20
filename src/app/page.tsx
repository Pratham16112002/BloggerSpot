"use client";
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
        <Container>
          <Typography component={"h1"} style={{ fontSize: 60 }}>
            Welcome to blogger spot
          </Typography>
          <Container sx={{ width: "50%" }}>
            <Button
              type="submit"
              onClick={() => router.replace("/blog")}
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
            >
              Share anything
            </Button>
          </Container>
        </Container>
      </Grid2>
    </Grid2>
  );
}
