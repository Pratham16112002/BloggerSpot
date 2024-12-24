"use client";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { FiEye } from "react-icons/fi";

import { BlogType } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchUpdated } from "@/util/helper";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../Loading";

interface Props {
  limit: number;
  page: number;
  order: string;
  tags: string[];
  search: string;
}

export type RefetchFn = {
  refetch: () => void;
};

function BlogData(
  { limit, page, order, tags, search }: Props,
  ref: Ref<RefetchFn>,
) {
  const router = useRouter();
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["feed", limit, page, order, tags, search],
    queryFn: async ({ queryKey }) => {
      const data = await fetchUpdated(
        queryKey[1],
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
      );
      return data;
    },
  });
  useImperativeHandle(ref, () => ({
    refetch,
  }));
  if (isFetching) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
      >
        <LoadingOverlay />
      </Stack>
    );
  }
  if (isError) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
      >
        <Typography variant="h2">Not found...</Typography>
      </Stack>
    );
  }
  return (data! as BlogType).map((blog: BlogType) => (
    <Grid item xs={12} sm={6} md={4} key={blog.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {blog.tags.map((item: string) => (
              <Chip key={item} label={item} color="primary" size="small" />
            ))}
            <Typography variant="caption" color="text.secondary">
              {new Date(blog.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            startIcon={<FiEye />}
            onClick={() => router.replace(`/blog/${blog.id}`)}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));
}

export default forwardRef(BlogData);
