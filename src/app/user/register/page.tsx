"use client";
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  InputAdornment,
  Alert,
} from "@mui/material";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { styled } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../util/helper";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

export type RegisterFields = {
  username: string;
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

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFields>();
  const router = useRouter();
  const { isSuccess, isLoading, mutateAsync } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      enqueueSnackbar("Registeration successfull", {
        variant: "success",
        persist: false,
      });
      reset({
        username: "",
        email: "",
        password: "",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar((error?.message as string) ?? "something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <SnackbarProvider maxSnack={1}>
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
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
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
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password too short",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock />
                    </InputAdornment>
                  ),
                }}
              />
              {isSuccess && (
                <Alert severity="success">
                  An activation code is sent to provided email.
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#2c3e50",
                  padding: "10px 10px",
                  fontSize: "1.1rem",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#34495e",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => router.push("/user/login")}
                sx={{ mt: 2 }}
              >
                <Typography component={"span"} color="#2c3e50">
                  Already have an account? Sign In
                </Typography>
              </Button>
            </Box>
          </StyledPaper>
        </Box>
      </Container>
    </SnackbarProvider>
  );
};

export default RegisterPage;
