import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ClientLayout from "@/components/layout/ClientsLayout";
import ArticleRowTable from "@/components/article-row-table/ArticleRowTable";
import styles from "../articles.module.css";
import { tableCellClasses } from "@mui/material/TableCell";

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
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const email = localStorage.getItem("articlesEmail");
    const fetchData = async () => {
      try {
        const response = await fetch("../api/articleHandler");
        if (response.ok) {
          const data = await response.json();

          const articlesByEmail = data.articles.filter(
            (article) => article.email === email
          );
          setResult(articlesByEmail);
          setStatus("success");
        } else {
          console.error("Failed to fetch data");
          setStatus("error");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus("error");
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
  const deleteArticle = () => {
    console.log("f");
  };

  const handleStatus = () => {
    if (status === "loading") {
      return <CircularProgress color="navyBlue" />;
    } else if (status === "error") {
      <Alert severity="error">we have problem try again</Alert>;
    } else if (status === "success" && result.length === 0) {
      return <Alert severity="warning">you dont have any article</Alert>;
    } else {
      return (
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
      );
    }
  };
  return (
    <ClientLayout>
      <Paper className={styles.container}>{handleStatus()}</Paper>
    </ClientLayout>
  );
}
export default Index;
