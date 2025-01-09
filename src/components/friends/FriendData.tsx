import { fetchFriends, followUser, unFollowUser } from "@/util/helper";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { forwardRef, Ref, useImperativeHandle } from "react";
import { Friend } from "../../../types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  //   CircularProgress,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import LoadingOverlay from "../Loading";
import { enqueueSnackbar } from "notistack";

const StyledCard = styled(Card)(({}) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

interface Props {
  limit: number;
  offset: number;
  role: "user" | "moderator";
  search: string;
}

export type RefetchFriendsFn = {
  refetch: () => void;
};

function FriendData(
  { limit, offset, role, search }: Props,
  ref: Ref<RefetchFriendsFn>
) {
  const { isError, data, isFetching, refetch } = useQuery({
    queryKey: ["friends", limit, offset, search, role],
    queryFn: async ({ queryKey }) => {
      const data = await fetchFriends(
        queryKey[1],
        queryKey[2],
        queryKey[3],
        queryKey[4]
      );
      return data;
    },
  });
  useImperativeHandle(ref, () => ({
    refetch,
  }));

  const { mutateAsync: mutateUnfollow } = useMutation({
    mutationFn: unFollowUser,
    onSuccess: () => {
      enqueueSnackbar("User unfollowed", {
        variant: "success",
        persist: false,
      });
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.message || "Something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });
  const unFollowHandler = async (id: number) => {
    await mutateUnfollow({
      id,
    });
  };
  const { mutateAsync: mutateFollow } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      enqueueSnackbar("User followed", {
        variant: "success",
        persist: false,
      });
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.message || "Something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });
  const followHandler = async (id: number) => {
    await mutateFollow({
      id,
    });
  };
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
  return (data as Friend[]).map((user: Friend) => (
    <Grid item xs={12} sm={6} md={3} key={user.id}>
      <StyledCard>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h6" component="div" textAlign="center">
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              From {new Date(user.created_at).toLocaleDateString()}
            </Typography>
            <Button
              variant={user.follower ? "outlined" : "contained"}
              sx={{
                backgroundColor: user.follower ? "transparent" : "#2c3e50",
                color: user.follower ? "error.main" : "#fff",
                "&:hover": {
                  backgroundColor: user.follower
                    ? "rgba(255, 0, 0, 0.1)"
                    : "#1a252f",
                },
              }}
              onClick={() => {
                if (user.follower) {
                  unFollowHandler(user.id);
                } else {
                  followHandler(user.id);
                }
              }}
              startIcon={user.follower ? <FaUserMinus /> : <FaUserPlus />}
            >
              {user.follower ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  ));
}

export default forwardRef(FriendData);
