import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ArticleRowTable({row}) {
  return (
    <StyledTableRow key={row.description}>
      <TableCell component="th" scope="row">
        {row.description}
      </TableCell>
      <TableCell align="right">{row.author}</TableCell>
      <TableCell align="right">{row.title}</TableCell>
      <TableCell align="right">{row.topics}</TableCell>
      <TableCell align="right">{row.text}</TableCell>
    </StyledTableRow>
  );
}

export default ArticleRowTable;
