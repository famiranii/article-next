import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ShowComments({ comment }) {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="body">{comment.email} : </Typography>
      <Typography variant="body" fontSize={18}>{comment.text}</Typography>
    </Box>
  );
}

export default ShowComments;
