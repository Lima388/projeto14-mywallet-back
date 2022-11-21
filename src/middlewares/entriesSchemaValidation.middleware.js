import { entriesSchema } from "../models/entries.model";

export async function entriesSchemaValidation(req, res, next) {
  const user = req.body;
  const { error } = entriesSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
