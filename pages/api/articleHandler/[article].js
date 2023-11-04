import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";

const insertDocument = async (client, document) => {
  const db = client.db(DATABASE_NAME);
  const collection = db.collection("articles");
  const result = await collection.insertOne(document);
  return result;
};

export default async function article(req, res) {
  let client = null;
  try {
    if (req.method === "GET") {
      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);
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
