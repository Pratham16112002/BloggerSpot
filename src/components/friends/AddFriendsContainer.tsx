"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
  InputAdornment,
  //   CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import FriendData, { RefetchFriendsFn } from "./FriendData";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import { SnackbarProvider } from "notistack";

const SearchContainer = styled(Box)(({}) => ({
  marginBottom: "2rem",
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
}));

const FriendSearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const refetchFriendRef = useRef<RefetchFriendsFn>(null);
  const [role, setRole] = useState<"user" | "moderator">("user");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [defSearch] = useDebounce(searchTerm, 1000);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage((prevState) => {
      prevState = newPage;
      return prevState;
    });
    refetchFriendRef.current?.refetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit((prevState) => {
      prevState = parseInt(event.target.value, 10);

      return prevState;
    });
    refetchFriendRef.current?.refetch();
  };

  return (
    <SnackbarProvider maxSnack={1}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchContainer>
          <TextField
            fullWidth
            label="Search Friends"
            variant="outlined"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((prev) => {
                prev = e.target.value;
                return prev;
              })
            }
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Role Filter</InputLabel>
            <Select
              value={role}
              label="Role Filter"
              onChange={(e: any) => {
                setRole((prev) => {
                  prev = e.target.value;
                  return prev;
                });
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
            </Select>
          </FormControl>
        </SearchContainer>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <FriendData
            limit={limit}
            offset={page}
            search={defSearch}
            role={role}
            ref={refetchFriendRef}
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
      </Container>
    </SnackbarProvider>
  );
};

export default FriendSearchContainer;
