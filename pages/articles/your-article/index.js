import ClientLayout from "@/components/layout/ClientsLayout";
import { Paper } from "@mui/material";
import styles from "../articles.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArticleRowTable from "@/components/article-row-table/ArticleRowTable";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#14213d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(description, title, topics, text) {
  return { description, title, topics, text };
}

function Index() {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "../api/articleHandler/famiranii@gmail.com"
        );
        if (response.ok) {
          const data = await response.json();
          setResult(data.articlesByEmail);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const rows = [];
  result.forEach((article) => {
    rows.push(
      createData(
        article.description,
        article.title,
        ...article.topics,
        article.text.slice(0, 20)
      )
    );
  });
  const deleteArticle=()=>{
    console.log('f');
  }

  return (
    <ClientLayout>
      <Paper className={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>descrption</StyledTableCell>
                <StyledTableCell align="right">title</StyledTableCell>
                <StyledTableCell align="right">topics</StyledTableCell>
                <StyledTableCell align="right">text</StyledTableCell>
                <StyledTableCell align="right">action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <ArticleRowTable
                  key={row.title}
                  row={row}
                  deleteArticle={deleteArticle}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ClientLayout>
  );
}
export default Index;
