"use client";
import { Typography, Stack } from "@mui/material";
import React, { use } from "react";
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
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetBlogData } from "@/hooks/useGetBlog";
import { notFound, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import BlogDetails from "@/components/blogs/BlogDetails";
import BlogComments from "@/components/comments/CommentList";
import { SnackbarProvider } from "notistack";
import LoadingOverlay from "@/components/Loading";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "2rem auto",
  padding: "1rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = use(params);
  const { data, isError, isFetching, refetch } = useGetBlogData(+slug);
  if (isError) {
    return <Typography component={"h2"}>Error occured</Typography>;
  }

  const updateBlog = () => {
    refetch();
  };
  return (
    <Box>
      <SnackbarProvider maxSnack={1}>
        <Container>
          {isFetching ? (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              height={"100vh"}
            >
              <LoadingOverlay />
            </Stack>
          ) : (
            <>
              <StyledCard>
                <CardContent>
                  <BlogDetails
                    id={data.id}
                    title={data.title}
                    content={data.content}
                  />
                </CardContent>
              </StyledCard>
              <BlogComments
                id={data.id}
                comments={data.comments}
                refetchBlog={updateBlog}
              />
            </>
          )}
        </Container>
      </SnackbarProvider>
    </Box>
  );
}
