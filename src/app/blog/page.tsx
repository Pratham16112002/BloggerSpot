import { getSession } from "@/actions";
import React from "react";
import BlogsContainer from "@/components/blogs/BlogsContainer";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

const BlogsPage = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/user/login");
  }

  return (
    <Container maxWidth="lg">
      <BlogsContainer />
    </Container>
  );
};

export default BlogsPage;
