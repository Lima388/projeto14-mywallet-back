import joi from "joi";

export const entriesSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  user: joi.object().required(),
  date: joi.string().required(),
});
