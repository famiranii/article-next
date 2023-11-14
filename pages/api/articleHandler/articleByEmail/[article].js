import connectDatabase from "@/components/connectMongodb/connectMongodb";

const DATABASE_NAME = "backendHandler";

export default async function article(req, res) {
  let client = null;

  try {
    client = await connectDatabase();
    const db = client.db(DATABASE_NAME);

    if (req.method === "GET") {
      const articles = await db.collection("articles").find().toArray();
      const articlesByEmail = articles.filter(
        (article) => article.email === req.query.article
      );
      res.status(200).json({ message: "GET", articlesByEmail });

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
