import { updatedBlog } from "@/util/helper";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";

const StyledButton = styled(Button)({
  backgroundColor: "#2c3e50",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#34495e",
  },
});

interface FormFields {
  title: string;
  content: string;
}

type Props = {
  id: number;
  title: string;
  content: string;
};

function BlogDetails({ id, title, content }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: title,
      content: content,
    },
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: updatedBlog,
    onSuccess: () => {
      enqueueSnackbar("Post successfully updated", {
        variant: "success",
        persist: false,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.message || "Something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });

  const editHandler: SubmitHandler<FormFields> = async (data) => {
    mutate({
      id: id,
      title: data.title,
      content: data.content,
    });
    return;
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit(editHandler)}>
      <Typography variant="h5" gutterBottom>
        {"Details"}
      </Typography>
      <TextField
        fullWidth
        label="Post Title"
        {...register("title", {
          required: "Title is required",
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
        disabled={false}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Post Content"
        {...register("content", {
          required: "Content is required",
        })}
        error={!!errors.content}
        helperText={errors.content?.message}
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
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          startIcon={<FaSave />}
        >
          Update
        </StyledButton>
      </Box>
    </Box>
  );
}

export default BlogDetails;
