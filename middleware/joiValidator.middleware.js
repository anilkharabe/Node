
function joiValidator(schema){
    const validationMiddleware = (req, res, next)=>{
        const {error} = schema.validate(req.body,{
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
    return validationMiddleware;

}

module.exports = joiValidator
