"use client";
import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaEdit, FaSave } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "2rem auto",
  padding: "1rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

export default function BlogPage() {
  return (
    <Box>
      <Container>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {false ? "Edit Post" : "Post Details"}
            </Typography>
            <TextField
              fullWidth
              label="Post Title"
              name="title"
              value={"title"}
              onChange={() => null}
              disabled={false}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Post Content"
              name="content"
              value={"Content"}
              onChange={() => null}
              disabled={false}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              {false ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaSave />}
                  onClick={() => null}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaEdit />}
                  onClick={() => null}
                >
                  Edit
                </Button>
              )}
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
}
