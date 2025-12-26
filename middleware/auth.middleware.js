const jwt = require('jsonwebtoken');
const logger = require("../config/logger");

const authMiddleware = (req, res, next)=>{
     const authHeader = req.headers.authorization;

      if(!authHeader){
        return res.status(401).json({message:'Token missing'});
      }
    
      const token = authHeader.split(' ')[1]
    
      //verify token
      try {
        const decoded = jwt.verify(token, 'secret_key')
        logger.info('decoded', decoded)
        //decrypt
       
        if(!req.body){
          req.body = {}
        }

        req.body.user = decoded;
        
        next();  // forword to next function

      } catch (error) {
        
        return res.status(401).json({message: 'Invalid logger.error("error", error)or expired token'});
      }
}

module.exports = authMiddleware;