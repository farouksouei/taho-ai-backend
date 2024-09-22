import Joi from "joi";

export const createSpendingSchema = Joi.object({
  userid: Joi.number().integer().required(),
  count: Joi.number().integer().min(1).required(),
  type: Joi.string().min(1).required(),
  model: Joi.string().min(1).required(),
});

export const updateSpendingSchema = Joi.object({
  userid: Joi.number().integer().required(),
  count: Joi.number().integer().min(1).required(),
  type: Joi.string().min(1).required(),
  model: Joi.string().min(1).required(),
});
