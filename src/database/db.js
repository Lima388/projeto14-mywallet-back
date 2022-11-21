import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log("MongoDB conectado com sucesso!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db(process.env.DATABASE_NAME);
export const usersCollection = db.collection("users");
export const entriesCollection = db.collection("entries");
export const sessionsCollection = db.collection("sessions");
