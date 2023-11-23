import { Paper } from "@mui/material";
import AddCommentArticle from "./addComments/AddCommentArticle";

export default function Comments({id}) {
  return (
    <Paper elevation={2} sx={{ p: 2, m: { xs: 2, sm: 4 }, bgcolor: "#f9f9f9" }}>
      <AddCommentArticle id={id} />
    </Paper>
  );
}
