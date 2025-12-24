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
        //decrypt
        if(req.body.age < 18){
          req.body.isUserCanVote = false
        }else{
          req.body.isUserCanVote = true

        }
        req.body.user = decoded;
        req.body.message = 'this is verified user from auth';
        next();  // forword to next function

      } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token'});
      }
}

module.exports = authMiddleware;