import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";
import { ObjectId } from "mongodb";

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

  // Perform the update
  const result = await db.collection("articles").updateOne(filter, update);

  return result;
};

export default async function handler(req, res) {
  let client = null;
  try {
    if (req.method === "POST") {
      // ... (unchanged)
    } else if (req.method === "GET") {
      // ... (unchanged)
    } else if (req.method === "PUT") {
      const { id, ...updatedArticleData } = req.body;

      if (!id || !updatedArticleData) {
        res.status(400).json({
          error: "Bad Request. Please provide article id and update data.",
        });
        return;
      }

      let client = null;

      try {
        // Check if the provided id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          res.status(400).json({ error: "Invalid article id provided" });
          return;
        }

        const objectId = new ObjectId(id);
        client = await connectDatabase();

        const result = await updateDocument(client, objectId, updatedArticleData);

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Article updated successfully" });
        } else {
          res.status(404).json({ error: "Article not found" });
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
