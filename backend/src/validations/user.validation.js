import Joi from "joi";

export const signupValidation=Joi.object({
    name:Joi.string().min(3).max(50).trim().required(),
    email:Joi.string().email().trim().required(),
    password:Joi.string().min(3).trim().required(),
    role: Joi.string()
    .lowercase() 
    .valid('member', 'admin')
    .required()
    .messages({
      'any.only': 'Role must be "member" or "admin"',
      'string.empty': 'Role is required'
    })
})

export const loginValidation=Joi.object({
    email:Joi.string().email().trim().required(),
    password:Joi.string().min(3).trim().required(),
})

