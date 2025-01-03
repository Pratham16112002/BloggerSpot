"use client";
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "@mui/system";
import { FiMail, FiLock } from "react-icons/fi";
import { redirect } from "next/navigation";
import { login } from "../../../actions";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Link from "next/link";

type FormFields = {
  email: string;
  password: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
}));

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });
    if (response.success) {
      enqueueSnackbar("Login successfull", {
        variant: "success",
        persist: false,
      });
      redirect("/blog");
    } else {
      enqueueSnackbar("Check your credentials again", {
        variant: "error",
        persist: false,
      });
    }
  };
  return (
    <SnackbarProvider maxSnack={3}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                })}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#2c3e50",
                  padding: "10px 10px",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "#34495e",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => redirect("/user/register")}
                sx={{ mt: 1 }}
              >
                <Typography component={"span"} color="#2c3e50">
                  Don&apos;t have an account?
                  <Link href="/user/register">Sign Up</Link>
                </Typography>
              </Button>
            </Box>
          </StyledPaper>
        </Box>
      </Container>
    </SnackbarProvider>
  );
};

export default LoginForm;
