import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";

const insertDocument = async (client, document) => {
  const db = client.db(DATABASE_NAME);
  await db.collection("clients").insertOne(document);
};

export default async function clientsHandler(req, res) {
  let client = null;
  try {
    if (req.method === "POST") {
      const { name, email, number, password } = req.body;
      const newData = {
        name,
        email,
        number,
        password,
      };

      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);

      // Check if the user exists
      const user = await db.collection("clients").findOne({ email });

      if (user) {
        return res.status(401).json({
          error: "This email alredy exists.",
        });
      }

      await insertDocument(client, newData);

      res.status(201).json({ message: "Added successfully", newData });
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
