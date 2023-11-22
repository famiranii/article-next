import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import ArticleBackdrop from "../backdrop/ArticleBackdrop";
import { useState } from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ArticleRowTable({ row, deleteArticle, editArticle, openArticle }) {
  const router = useRouter();
  const handleArticleClick = () => {
    openArticle();
    router.push(`/articles/${row.title}`);
  };
  const handleDeleteArticle = (event) => {
    event.stopPropagation();
    deleteArticle(row.id);
  };
  const handleEditArticle = (event) => {
    event.stopPropagation();
    editArticle(row.title);
  };
  return (
    <StyledTableRow onClick={handleArticleClick} sx={{ cursor: "pointer" }}>
      <TableCell component="th" scope="row">
        {row.description}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      {row.author && <TableCell align="center">{row.author}</TableCell>}
      <TableCell align="center">{row.topics.join(" - ")}</TableCell>
      {deleteArticle && (
        <TableCell align="center">
          <IconButton onClick={handleEditArticle}>
            <EditIcon color="navyBlue" />
          </IconButton>
          <IconButton onClick={handleDeleteArticle}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      )}
    </StyledTableRow>
  );
}

export default ArticleRowTable;
