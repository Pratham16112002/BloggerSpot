import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { Comment } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addComment } from "@/util/helper";
import { enqueueSnackbar } from "notistack";

const CommentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "800px",
  margin: "0 auto",
}));

const CommentForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const CommentsList = styled(Box)(({ theme }) => ({
  maxHeight: "500px",
  overflowY: "auto",
  padding: theme.spacing(2),
}));

const CommentItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(2),
}));

interface FormFields {
  content: string;
}

interface Props {
  id: number;
  comments: Comment[];
  refetchBlog: () => void;
}

const BlogComments = ({ id, comments, refetchBlog }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      enqueueSnackbar("Comment added successfully", {
        variant: "success",
        persist: false,
      });
      refetchBlog();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.message ?? "Something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });

  const commentSubmitHandler: SubmitHandler<FormFields> = async (data) => {
    mutate({
      id: id,
      content: data.content,
    });
  };

  return (
    <CommentSection>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      <CommentForm elevation={2}>
        <form onSubmit={handleSubmit(commentSubmitHandler)}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              multiline
              error={!!errors.content}
              helperText={errors.content?.message}
              rows={4}
              {...register("content", {
                required: "Required",
              })}
              variant="outlined"
              placeholder="Write your comment here..."
              aria-label="Comment input"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              aria-label="Submit comment"
              sx={{
                "&:hover": {
                  backgroundColor: "#34495e",
                },
                backgroundColor: "#2c3e50",
              }}
            >
              Submit Comment
            </Button>
          </Stack>
        </form>
      </CommentForm>
      {comments && (
        <CommentsList>
          {comments.map((comment: Comment) => (
            <CommentItem key={comment.id} elevation={1}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {comment.user.username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {comment.content}
                </Typography>
              </Box>
            </CommentItem>
          ))}
        </CommentsList>
      )}
    </CommentSection>
  );
};

export default BlogComments;
