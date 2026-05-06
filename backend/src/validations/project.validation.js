import Joi from "joi";

const objectId = /^[0-9a-fA-F]{24}$/;

export const createProjectValidation = Joi.object({
  projectName: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(5).max(500).required(),
  memberId: Joi.array()
    .items(Joi.string().trim().pattern(objectId))
    .min(1)
    .required(),

  tasks:Joi.array()
    .items(Joi.string().trim().pattern(objectId))
    .optional(),
  dueDate: Joi.date().iso().required(),
});

export const updateProjectValidation = Joi.object({
  projectName: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim().min(5).max(500),
  memberId: Joi.array()
    .items(Joi.string().trim().pattern(objectId))
    .min(1)
    .optional(),
  dueDate: Joi.date().iso().optional(),
});