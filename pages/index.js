import { useState } from "react";
import ClientLayout from "@/components/layout/ClientsLayout";
import ArticleRowTable from "@/components/article-row-table/ArticleRowTable";
import ArticlePagination from "@/components/pagination/ArticlePagination";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useArticlePagination from "@/components/hook/useArticlePagination";
import ArticleBackdrop from "@/components/backdrop/ArticleBackdrop";

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
  const [isBackdrop, setIsBackdrop] = useState(false);
  const totalItems = result.articles.length;
  const [totalPages, currentPage, currentItems, handlePageChange] =
    useArticlePagination({
      totalItems,
      articles: result.articles,
    });

  const rows = currentItems.map((article) => {
    const authorArr = article.email.split("@");
    const author = authorArr[0];

    return createData(
      article.description.slice(0, 200),
      author,
      article.title,
      article.topics
    );
  });
  if (!result || !result.articles || result.articles.length === 0) {
    return <div>No articles available.</div>;
  }
  return (
    <ClientLayout>
      <Paper
        sx={{
          borderRadius: 2,
          minHeight: "80vh",
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
                <ArticleRowTable
                  key={index}
                  row={row}
                  openArticle={() => setIsBackdrop(true)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ArticlePagination
          page={currentPage}
          totalPages={totalPages}
          setPage={handlePageChange}
        />
      </Paper>
      <ArticleBackdrop open={isBackdrop}/>
    </ClientLayout>
  );
}

export async function getServerSideProps() {
  //server
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articleHandler`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    return {
      props: { result },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default Index;
