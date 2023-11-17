import ClientLayout from "@/components/layout/ClientsLayout";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Index({ singleArticle }) {
  const article = singleArticle[0];
  const topics = article.topics.join(", ");
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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articleHandler`);
    
    if (response.ok) {
      const data = await response.json();
      return data.articles;
    } else {
      console.error("Failed to fetch data:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


export async function getStaticProps(context) {
  try {
    const articles = await fetchData();
    const singleArticle = articles.filter(
      (article) => article.title === context.params.index
    );

    if (singleArticle.length === 0) {
      return {
        notFound: true,
      };
    }

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
    fallback: "blocking",
  };
}

export default Index;
