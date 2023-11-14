import connectDatabase from "@/components/connectMongodb/connectMongodb";
const DATABASE_NAME = "backendHandler";

export default async function loginHandler(req, res) {
  let client = null;
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      client = await connectDatabase();
      const db = client.db(DATABASE_NAME);

      // Check if the user exists
      const user = await db.collection("clients").findOne({ email });

      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({
            error: "Invalid email or password. Please check your credentials.",
          });
      }

      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "we had error to connect mongodb " });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
