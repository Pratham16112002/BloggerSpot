"use client";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {
  Box,
  Grid2,
  Checkbox,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent } from "react";

export default function RegisterPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const SignUpHandler = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: email,
        username: username,
        password: password,
      };
      const res = await axios.post(
        "http://localhost:3002/v1/authentication/user",
        payload
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        ></Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={() => null} noValidate sx={{ mt: 1 }}>
          <TextField
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter username"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            required
            type="password"
          />

          <Button
            type="submit"
            onClick={SignUpHandler}
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            {loading ? "Sign In" : <CircularProgress color="inherit" />}
          </Button>
        </Box>
        <Grid2 container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid2>
            <Link href="user/login">Login In</Link>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
