import ClientLayout from "@/components/layout/ClientsLayout";
import { Paper } from "@mui/material";
import styles from "./articles.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArticleRowTable from "@/components/article-row-table/ArticleRowTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#14213d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(description, author, title, topics, text) {
  return { description, author, title, topics, text };
}

function Index({ result }) {
  const rows = [];
  result.articles.forEach((article) => {
    const authorArr = article.email.split("@");
    const author = authorArr[0];

    rows.push(
      createData(
        article.description,
        author,
        article.title,
        ...article.topics,
        article.text.slice(0, 20)
      )
    );
  });

  return (
    <ClientLayout>
      <Paper className={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>descrption</StyledTableCell>
                <StyledTableCell align="right">author</StyledTableCell>
                <StyledTableCell align="right">title</StyledTableCell>
                <StyledTableCell align="right">topics</StyledTableCell>
                <StyledTableCell align="right">text</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <ArticleRowTable key={row.title} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ClientLayout>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(`http://localhost:3000/api/articleHandler`);
    const result = await response.json();
    return {
      props: { result },
    };
  } catch (error) {
    return {
      props: { result: [] },
    };
  }
}

export default Index;
