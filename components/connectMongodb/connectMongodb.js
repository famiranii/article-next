import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://ff:v7DAr3pjsDtbNOj0@cluster0.bcrceqb.mongodb.net/backendHandler?retryWrites=true&w=majority";

const connectDatabase = async () => {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
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
export default connectDatabase;
