import React from "react";
import { Container } from "@mui/material";
import BlogsContainer from "../../components/blogs/BlogsContainer";

const BlogsPage = async () => {
  return (
    <Container maxWidth="lg">
      <BlogsContainer />
    </Container>
  );
};

export default BlogsPage;
