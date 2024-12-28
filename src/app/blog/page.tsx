import React from "react";
import BlogsContainer from "@/components/blogs/BlogsContainer";
import { Container } from "@mui/material";

const BlogsPage = async () => {
  return (
    <Container maxWidth="lg">
      <BlogsContainer />
    </Container>
  );
};

export default BlogsPage;
