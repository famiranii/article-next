import connectDatabase from "@/components/connectMongodb/connectMongodb";

const DATABASE_NAME = "backendHandler";

export default async function article(req, res) {
  let client = null;

  try {
    client = await connectDatabase();
    const db = client.db(DATABASE_NAME);

    if (req.method === "GET") {
      const articles = await db.collection("articles").find().toArray();
      const singleArticle = articles.filter(
        (article) => article.title === req.query.article
      );
      res.status(200).json({ message: "GET", singleArticle });
    } else if (req.method === "PUT") {
      const articleTitleToUpdate = req.query.article;
      const updatedArticleData = req.body;

      if (!articleTitleToUpdate || !updatedArticleData) {
        res.status(400).json({
          error: "Bad Request. Please provide article title and update data.",
        });
      } else {
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
    } else if (req.method === "DELETE") {
      const articleTitleToDelete = req.query.article;

      if (!articleTitleToDelete) {
        res
          .status(400)
          .json({ error: "Bad Request. Please provide article title to delete." });
      } else {
        const result = await db
          .collection("articles")
          .deleteOne({ title: articleTitleToDelete });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Article deleted successfully" });
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
