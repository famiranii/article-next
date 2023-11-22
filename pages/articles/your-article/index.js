import { useEffect, useState } from "react";
import useArticlePagination from "@/components/hook/useArticlePagination";
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
import { tableCellClasses } from "@mui/material/TableCell";
import CustomDialog from "@/components/dialog/CustomDialog";
import { useRouter } from "next/router";
import ArticlePagination from "@/components/pagination/ArticlePagination";
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

function createData(description, title, topics, text, id) {
  return { description, title, topics, text, id };
}

function Index() {
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [result, setResult] = useState([]);
  const [totalPages, currentPage, currentItems, handlePageChange] =
    useArticlePagination({
      totalItems: result.length,
      articles: result,
    });
  const [status, setStatus] = useState("loading");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [deletedArticleId, setDeletedArticleId] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    const email = localStorage.getItem("articlesEmail");
    try {
      const response = await fetch(
        `../api/articleHandler/articleByEmail/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setResult(data.articlesByEmail);
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
  useEffect(() => {
    fetchData();
  }, []);

  const rows = [];
  currentItems.forEach((article) => {
    rows.push(
      createData(
        article.description,
        article.title,
        article.topics,
        article.text.slice(0, 20),
        article._id
      )
    );
  });
  const deleteArticle = (id) => {
    setDeletedArticleId(id);
    setDialogStatus(true);
  };
  const editArticle = (article) => {
    router.push(`/articles/your-article/${article}`);
    setIsBackdrop(true)
  };
  const openArticle=()=>{
    setIsBackdrop(true)
  }
  const onAgree = async () => {
    try {
      const response = await fetch(
        `../api/articleHandler/articleByTitle/${deletedArticleId}`,
        {
          method: "DELETE",
        }
      );
      fetchData();
      setStatus("loading");
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
    setDialogStatus(false);
  };
  const onDisagree = () => {
    setDialogStatus(false);
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
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>descrption</StyledTableCell>
                  <StyledTableCell align="center" width={200}>
                    title
                  </StyledTableCell>
                  <StyledTableCell align="center" width={200}>
                    topics
                  </StyledTableCell>
                  <StyledTableCell align="center">action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <ArticleRowTable
                    key={row.id}
                    row={row}
                    deleteArticle={deleteArticle}
                    editArticle={editArticle}
                    openArticle={openArticle}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ArticlePagination
            totalPages={totalPages}
            setPage={handlePageChange}
            page={currentPage}
          />
        </>
      );
    }
  };
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
        {handleStatus()}
      </Paper>
      <CustomDialog
        dialogStatus={dialogStatus}
        onAgree={onAgree}
        onDisagree={onDisagree}
        text="You can never get back your deleted article"
      />
      <ArticleBackdrop open={isBackdrop}/>
    </ClientLayout>
  );
}
export default Index;
