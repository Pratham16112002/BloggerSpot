"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import React from "react";

interface Props {
  id?: number;
  title: string;
  content: string;
  tags: any;
  userId: any;
}

const BlogCard = ({ title, content, tags, userId }: Props) => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe"></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2022"
      />
      <CardMedia component="img" height="10%" width="10%" alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button>LEARN MORE</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
