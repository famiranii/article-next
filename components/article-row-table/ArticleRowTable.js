import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ArticleRowTable({ row, deleteArticle }) {
  return (
    <StyledTableRow key={row.description}>
      <TableCell component="th" scope="row">
        {row.description}
      </TableCell>
      {row.author && <TableCell align="right">{row.author}</TableCell>}
      <TableCell align="right">{row.title}</TableCell>
      <TableCell align="right">{row.topics}</TableCell>
      <TableCell align="right">{row.text}...</TableCell>
      {deleteArticle && (
        <TableCell align="right">
          <IconButton>
            <EditIcon color="navyBlue" />
          </IconButton>
          <IconButton>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      )}
    </StyledTableRow>
  );
}

export default ArticleRowTable;
