const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
     const authHeader = req.headers.authorization;

      if(!authHeader){
        return res.status(401).json({message:'Token missing'});
      }
    
      const token = authHeader.split(' ')[1]
    
      //verify token
      try {
        const decoded = jwt.verify(token, 'secret_key')
        console.log('decoded', decoded)
        //decrypt
       
        if(!req.body){
          req.body = {}
        }

        req.body.user = decoded;
        
        next();  // forword to next function

      } catch (error) {
        console.log("error", error)
        return res.status(401).json({message: 'Invalid or expired token'});
      }
}

module.exports = authMiddleware;