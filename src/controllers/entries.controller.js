import {
  sessionsCollection,
  usersCollection,
  entriesCollection,
} from "../database/db.js";
import { entriesSchema } from "../models/entries.model.js";
import dayjs from "dayjs";

export async function createEntry(req, res) {
  const { value, description } = req.body;
  const user = req.user;

  try {
    const newEntry = {
      value,
      description,
      user: user._id,
      date: dayjs().format("DD/MM"),
    };
    console.log(newEntry);
    const { error } = entriesSchema.validate(newEntry, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    await entriesCollection.insertOne(newEntry);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findEntry(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    if (!user) {
      return res.sendStatus(401);
    }

    const entries = await entriesCollection
      .find({ user: session.userId })
      .toArray();
    res.send(entries);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
