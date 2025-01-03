"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Autocomplete,
  ThemeProvider,
  createTheme,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSearch } from "react-icons/fi";
import BlogData, { RefetchFn } from "./BlogData";
import { tags } from "../../constants/categories";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
      dark: "#34495e",
    },
  },
});

const StyledSearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const BlogsContainer = () => {
  // const searchQuery = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const refetchRef = useRef<RefetchFn>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage((prevState) => {
      prevState = newPage;
      return prevState;
    });
    refetchRef.current?.refetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit((prevState) => {
      prevState = parseInt(event.target.value, 10);

      return prevState;
    });
    refetchRef.current?.refetch();
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
        <StyledSearchContainer sx={{ boxShadow: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                // inputRef={searchQuery}
                fullWidth
                variant="outlined"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery((prev) => {
                    prev = e.target.value;
                    return prev;
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <FormControl fullWidth variant="outlined">
              <Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              displayEmpty
              >
              <MenuItem value="title">Search by Title</MenuItem>
              <MenuItem value="content">Search by Content</MenuItem>
              </Select>
              </FormControl>
              </Grid> */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={sortOrder}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e: any) => {
                    setSortOrder((prev) => {
                      prev = e.target.value;
                      return prev;
                    });
                  }}
                >
                  <MenuItem value={"asc"}>Ascending</MenuItem>
                  <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                multiple
                options={tags}
                value={selectedTags}
                onChange={(event, newValue) => {
                  setSelectedTags((prev) => {
                    prev = newValue;
                    return prev;
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select Tags"
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue ?? now)}
              />
              </LocalizationProvider>
              </Grid> */}
            {/* <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              label="Until"
              value={untilDate}
              onChange={(newValue) => setUntilDate(newValue ?? now)}
              />
              </LocalizationProvider>
              </Grid> */}
            {/* <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <FiSearch />
                  )
                }
              >
                Search
              </Button>
            </Grid> */}
          </Grid>
        </StyledSearchContainer>

        <Grid container spacing={3}>
          <BlogData
            limit={limit}
            search={searchQuery}
            order={sortOrder}
            page={page}
            tags={selectedTags}
            ref={refetchRef}
          />
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[
              { value: 6, label: "6" },
              { value: 12, label: "12" },
            ]}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BlogsContainer;
