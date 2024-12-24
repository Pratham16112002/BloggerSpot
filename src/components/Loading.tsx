import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "#2c3e50",
}));

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <>
      <CircularProgress style={{ color: "#2c3e50" }} size={60} thickness={4} />
      <LoadingText variant="h6">{message}</LoadingText>
    </>
  );
};

export default LoadingOverlay;
