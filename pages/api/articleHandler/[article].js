import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";

export default async function article(req, res) {
  let client = null;
  try {
    if (req.method === "GET") {
      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);
      const articles = await db.collection("articles").find().toArray();
      const singleArticle = articles.filter(
        article => article.title === req.query.article
        );
      res.status(200).json({ message: "GET", singleArticle });

    } else if (req.method === "PUT") {
      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);

      // Assuming you want to update an article with a specific title
      const articleTitleToUpdate = req.query.article;

      // You should also provide data to update the article in the request body
      const updatedArticleData = req.body;

      // Check if the article title to update and update data are provided
      if (!articleTitleToUpdate || !updatedArticleData) {
        res
          .status(400)
          .json({
            error: "Bad Request. Please provide article title and update data.",
          });
      } else {
        // Find the article by its title and update it with the new data
        const result = await db
          .collection("articles")
          .updateOne(
            { title: articleTitleToUpdate },
            { $set: updatedArticleData }
          );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Article updated successfully" });
        } else {
          res.status(404).json({ error: "Article not found" });
        }
      }
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
