import ClientLayout from "@/components/layout/ClientsLayout";
import { Paper, Typography } from "@mui/material";
import styles from "./articles.module.css";
import { Box } from "@mui/system";

function Index({ singleArticle }) {
  const article = singleArticle[0];
  const topics = article.topics.join(", ");
  return (
    <ClientLayout>
      <Paper className={styles.container}>
        <Typography color="#14213d" variant="h4" sx={{ textAlign: "center" }}>
          {article.title}
        </Typography>
        <br />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#939393" }} variant="p">
            author email: &nbsp;
          </Typography>
          <Typography>{article.email} </Typography>
        </Box>
        <br />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#939393" }} variant="p">
            topics: &nbsp;
          </Typography>
          <Typography>{topics} </Typography>
        </Box>
        <br />
        <Box>
          <Typography sx={{ color: "#939393" }}>description: &nbsp;</Typography>
          <Typography>{article.description} </Typography>
        </Box>
        <br />
        <hr />
        <br />
        <Box>
          <Typography variant="subtitle1">{article.text} </Typography>
        </Box>
      </Paper>
    </ClientLayout>
  );
}

async function fetchData() {
  const response = await fetch("http://localhost:3000/api/articleHandler"); // Replace with your API endpoint
  if (response.ok) {
    const data = await response.json();
    return data.articles;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function getStaticProps(context) {
  try {
    const articles = await fetchData();
    const singleArticle = articles.filter(
      (article) => article.title === context.params.index
    );

    return {
      props: { singleArticle },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: { error: error.message },
    };
  }
}

export async function getStaticPaths() {
  const articles = await fetchData();

  const paths = articles.map((article) => ({
    params: { index: article.title },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Index;