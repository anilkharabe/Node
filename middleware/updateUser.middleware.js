const Joi = require('joi')

//joi schema for user registration

const updateUserSchema = Joi.object({
    name: Joi.string().pattern(/[a-zA-Z]/).min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    profileId: Joi.forbidden()
})

module.exports = { updateUserSchema };