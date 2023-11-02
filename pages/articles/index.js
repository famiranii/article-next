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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function Index({ result }) {
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];
  console.log(result)

  const rows = [];
  result.articles.forEach((article) => {
    const authorArr = article.email.split('@');
    const author = authorArr[0];
    
    rows.push(createData(article.description,author,article.title,...article.topics,article.text.slice(0,20)));
  });

  console.log(result);
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
                <ArticleRowTable key={row.name} row={row} />
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(baseUrl);
    const response = await fetch(`http://localhost:3000/api/articleHandler`);
    const result = await response.json();
    console.log(result);
    return {
      props: { result },
    };
  } catch (error) {
    console.log("33333333333333333333333333333333333333333");
    console.error("Error fetching data:", error);
    return {
      props: { result: [] },
    };
  }
}

export default Index;
