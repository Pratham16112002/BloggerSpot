import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "#2c3e50",
}));

const LoadingOverlay = ({}) => {
  return (
    <>
      <CircularProgress style={{ color: "#2c3e50" }} size={60} thickness={4} />
      <LoadingText variant="h6">{"Loading..."}</LoadingText>
    </>
  );
};

export default LoadingOverlay;
