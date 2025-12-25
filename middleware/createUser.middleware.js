const Joi = require('joi')

//joi schema for user registration

const createUserSchema = Joi.object({
    name: Joi.string().pattern(/[a-zA-Z]/).min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').required(),
    profileId: Joi.forbidden()
})

module.exports = { createUserSchema };