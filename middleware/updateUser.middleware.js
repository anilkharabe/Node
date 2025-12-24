const Joi = require('joi')

//joi schema for user registration

const updateUserSchema = Joi.object({
    name: Joi.string().pattern(/[a-zA-Z]/).min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    profileId: Joi.forbidden()
})

const updateValidationMiddleware = (req, res, next)=>{
    // req.body
    const {error} = updateUserSchema.validate(req.body,{
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


module.exports = updateValidationMiddleware;