import connectDatabase from "@/components/connectMongodb/connectMongodb";
import { ObjectId } from "mongodb";

const DATABASE_NAME = "backendHandler";

const insertDocument = async (client, document) => {
  const db = client.db(DATABASE_NAME);
  await db.collection("articles").insertOne(document);
};

const updateDocument = async (client, objectId, updatedData) => {
  const db = client.db(DATABASE_NAME);

  const filter = { _id: objectId };
  const update = {
    $set: updatedData,
  };

  return db.collection("articles").updateOne(filter, update);
};

const handleErrors = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({ error: errorMessage });
};

export default async function handler(req, res) {
  let client = null;

  try {
    client = await connectDatabase();

    if (req.method === "POST") {
      const { email, title, description, text, topics } = req.body;
      const newData = { email, title, description, text, topics };

      await insertDocument(client, newData);
      res.status(201).json({ message: "Added successfully", newData });
    } else if (req.method === "GET") {
      const articles = (await client.db(DATABASE_NAME).collection("articles").find().toArray()).reverse();
      res.status(200).json({ message: "GET", articles });
    } else if (req.method === "PATCH") {
      const { articleId, text, email,createdAt } = req.body;

      if (!articleId || !text || !email) {
        handleErrors(res, 400, "Bad Request. Please provide articleId, comment, and email in the request body.");
      } else {
        const result = await client.db(DATABASE_NAME).collection("articles").updateOne(
          { _id: new ObjectId(articleId) },
          {
            $push: {
              comments: {
                text,
                email,
                createdAt,
              },
            },
          }
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Comment added successfully" });
        } else {
          res.status(404).json({ error: "Article not found" });
        }
      }
    } else if (req.method === "PUT") {
      const { id, ...updatedArticleData } = req.body;

      if (!id || !updatedArticleData) {
        handleErrors(res, 400, "Bad Request. Please provide article id and update data.");
        return;
      }

      if (!ObjectId.isValid(id)) {
        handleErrors(res, 400, "Invalid article id provided");
        return;
      }

      const objectId = new ObjectId(id);
      const result = await updateDocument(client, objectId, updatedArticleData);

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Article updated successfully" });
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
