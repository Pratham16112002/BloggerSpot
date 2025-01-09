import React from "react";
import { Container } from "@mui/material";
import FriendSearchContainer from "@/components/friends/AddFriendsContainer";

const AddFriends = async () => {
  return (
    <Container maxWidth={"lg"}>
      <FriendSearchContainer />
    </Container>
  );
};

export default AddFriends;
