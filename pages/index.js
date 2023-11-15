import ClientLayout from "@/components/layout/ClientsLayout";
import { Paper } from "@mui/material";
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

function createData(description, author, title, topics) {
  return { description, author, title, topics };
}

function Index({ result = { articles: [] } }) {
  if (!result || !result.articles || result.articles.length === 0) {
    return <div>No articles available.</div>;
  }

  const rows = result.articles.map((article) => {
    const authorArr = article.email.split("@");
    const author = authorArr[0];

    return createData(
      article.description.slice(0, 200),
      author,
      article.title,
      article.topics,
    );
  });

  return (
    <ClientLayout>
      <Paper
        sx={{
          borderRadius: 2,
          minHeight: "90vh",
          p: { xs: 2, md: 4 },
          m: { sm: 2 },
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>descrption</StyledTableCell>
                <StyledTableCell align="center" width={200}>
                  title
                </StyledTableCell>
                <StyledTableCell align="center">author</StyledTableCell>
                <StyledTableCell align="center" width={200}>
                  topics
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <ArticleRowTable key={index} row={row} />
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
    const response = await fetch(`https://article-next-show.app/api/articleHandler.vercel.app`);
    const result = await response.json();
    return {
      props: { result },
    };
  } catch (error) {
    return {
      props: { result: { articles: [] } },
    };
  }
}

export default Index;
