import { Paper, Typography } from "@mui/material";
import AddCommentArticle from "./addComments/AddCommentArticle";
import ShowComments from "./showComments/ShowComments";
import { Box } from "@mui/system";

export default function Comments({ id, comments,addNewComment }) {
  const addComment = (comment) => {
    addNewComment(comment)
  };
  return (
    <Paper elevation={2} sx={{ p: 2, m: { xs: 2, sm: 4 }, bgcolor: "#f9f9f9" }}>
      <Typography variant="h4" p={2} color="navy">
        comments
      </Typography>
      <AddCommentArticle id={id} addComment={addComment} />
      {comments && (
        <Box p={2} mt={2}>
          {comments.reverse().map((comment) => (
            <ShowComments key={comment.createdAt} comment={comment} />
          ))}
        </Box>
      )}
    </Paper>
  );
}
