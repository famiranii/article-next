import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";

const insertDocument = async (client, document) => {
  const db = client.db(DATABASE_NAME);
  await db.collection("articles").insertOne(document);
};

export default async function handler(req, res) {
  let client = null;
  try {
    if (req.method === "POST") {
      const { email, title, description, text, topics } = req.body;
      const newData = {
        email,
        title,
        description,
        text,
        topics,
      };

      client = await connectDatabase();
      await insertDocument(client, newData);

      res.status(201).json({ message: "Added successfully", newData });
    } else if (req.method === "GET") {
      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);
      const articles = (
        await db.collection("articles").find().toArray()
      ).reverse();

      res.status(200).json({ message: "GET", articles });
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
