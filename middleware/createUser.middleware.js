const Joi = require('joi')

//joi schema for user registration

const createUserSchema = Joi.object({
    name: Joi.string().pattern(/[a-zA-Z]/).min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profileId: Joi.forbidden()
})

const createValidationMiddleware = (req, res, next)=>{
    // req.body
    const {error} = createUserSchema.validate(req.body,{
        abortEarly: false
    })

    if(error){
        return res.status(400).json({
            message:'validation failed',
            error: error.details.map((e)=>{
                return e.message
            })
        })
    }

    next();
}


module.exports = createValidationMiddleware;