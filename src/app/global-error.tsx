"use client";
import NavBar from "@/components/NavBar";
import ReadtQueryClientProvider from "@/components/ReadtQueryClientProvider";
import { CustomError } from "@/lib/exceptions";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: CustomError;
  reset: () => void;
}) {
  useEffect(() => {}, [error]);
  return (
    <ReadtQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NavBar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Typography variant="h1">{error.statusCode}</Typography>
                  <Typography variant="h6">{error.message}</Typography>
                  <Button variant="contained">Back Home</Button>
                </Grid>
                <Grid xs={6}>
                  <img
                    src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                    alt=""
                    width={500}
                    height={250}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </body>
      </html>
    </ReadtQueryClientProvider>
  );
}
