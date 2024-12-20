"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSearch, FiBookmark, FiEye } from "react-icons/fi";

const StyledSearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const dummyResults = [
    {
      id: 1,
      title: "Modern Web Development",
      category: ["Marketting", "Technology"],
      date: "2024-01-15",
      description:
        "Comprehensive guide to modern web development practices and tools.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    },
    {
      id: 2,
      title: "Digital Marketing Strategies",
      category: ["Marketting", "Technology"],
      date: "2024-01-14",
      description:
        "Latest trends and strategies in digital marketing for businesses.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      category: ["Mrketing", "ports"],
      date: "2024-01-13",
      description:
        "Introduction to key concepts in data science and analytics.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      category: ["Marketig", "Sprts"],
      date: "2024-01-13",
      description:
        "Introduction to key concepts in data science and analytics.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
    },
  ];

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="lg">
      <StyledSearchContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter keywords to search..."
              aria-label="search input"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="science">Science</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="date-label">Date Range</InputLabel>
              <Select
                labelId="date-label"
                value={selectedDate}
                label="Date Range"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <MenuItem value="">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={3} mb={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<FiSearch />}
            disabled={loading}
          >
            Search
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} mt={2}>
            {dummyResults.map((result) => (
              <Grid item xs={12} sm={6} md={4} key={result.id}>
                <StyledCard>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${result.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {result.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {result.description}
                    </Typography>
                    {result.category.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                    ))}

                    <Chip label={result.date} size="small" />
                  </CardContent>
                  <CardActions sx={{ marginTop: "auto" }}>
                    <Button
                      size="small"
                      startIcon={<FiEye />}
                      aria-label="view details"
                    >
                      View
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </StyledSearchContainer>
    </Container>
  );
};

export default SearchComponent;
