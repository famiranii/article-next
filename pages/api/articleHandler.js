import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://ff:v7DAr3pjsDtbNOj0@cluster0.bcrceqb.mongodb.net/backendHandler?retryWrites=true&w=majority";
const DATABASE_NAME = "backendHandler";

const connectDatabase = async () => {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true, // This option is deprecated in recent versions of the MongoDB driver, but it should work with the current version you are using.
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

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
      const comments = (
        await db.collection("articles").find().toArray()
      ).reverse();

      res.status(200).json({ message: "GET", comments });
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
