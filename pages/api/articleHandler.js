import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://farhad:farhad40@cluster0.bcrceqb.mongodb.net/backendHandler?retryWrites=true&w=majority"
  );
  return client;
};
const insertDocument = async (client, ducument) => {
  const db = client.db();
  await db.collection("articles").insertOne(ducument);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const [email, title, text, slugs, username, describtion] = req.body;
    const newData = {
      email,
      title,
      slugs,
      describtion,
      text,
      username,
    };

    const client = await connectDatabase();
    await insertDocument(client, newData);
    res.status(201).json({ message: "added seccessfuly ", newData });
  } else if (req.method === "GET") {
    try {
      const client = await connectDatabase();

      const db = client.db();
      const comments = (
        await db.collection("articles").find().toArray()
      ).reverse();

      res.status(200).json({ message: "get", comments });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).end();
  }
}
