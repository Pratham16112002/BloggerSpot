"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Typography,
  Alert,
  Container,
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { IoAddCircleOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAddBlogData } from "@/hooks/useAddblog";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { addBlog } from "@/util/helper";
import { tags } from "@/constants/categories";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#ffffff",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiInputLabel-root": {
    color: "#2c3e50",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2c3e50",
    },
    "&:hover fieldset": {
      borderColor: "#2c3e50",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2c3e50",
    },
  },
}));

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddPostForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      enqueueSnackbar("Post successfully added", {
        variant: "success",
        persist: false,
      });
      reset({
        title: "",
        content: "",
      });
    },
    onError: (error) => {
      enqueueSnackbar((error as any)?.message || "Something went wrong", {
        variant: "error",
        persist: false,
      });
    },
  });
  const [tError, setTError] = useState<boolean>(false);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (selectedTags.length == 0) {
      setTError(true);
      return;
    }
    if (tError) {
      setTError(false);
    }
    mutateAsync({ ...data, tags: selectedTags });
    return;
  };

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Container maxWidth="lg" component={"div"}>
        <Box sx={{ marginTop: 8, display: "flex", alignItems: "center" }}>
          <Container maxWidth="md">
            <StyledPaper>
              <Typography variant="h4" gutterBottom sx={{ color: "#2c3e50" }}>
                Add New Post
              </Typography>
              <StyledForm onSubmit={() => null} noValidate>
                <TextField
                  required
                  {...register("title", {
                    required: "Title is required",
                  })}
                  label="Title"
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  inputProps={{ "aria-label": "post title" }}
                />
                <TextField
                  required
                  label="Content"
                  // name="content"
                  {...register("content", {
                    required: "Content is required",
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  multiline
                  rows={4}
                  inputProps={{ "aria-label": "post content" }}
                />
                <FormControl error={tError}>
                  <InputLabel id="tags-label">Tags</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    label={"Tags"}
                    multiple
                    required={true}
                    error={tError}
                    value={selectedTags}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {tags.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={selectedTags.includes(name)} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {tError && <FormHelperText>Tags are required</FormHelperText>}
                </FormControl>

                <Typography component={"span"}></Typography>
                <StyledButton
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  startIcon={<IoAddCircleOutline />}
                >
                  Create Post
                </StyledButton>
              </StyledForm>
            </StyledPaper>
          </Container>
        </Box>
      </Container>
    </SnackbarProvider>
  );
};

export default AddPostForm;
