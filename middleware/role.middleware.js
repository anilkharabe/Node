
function authorizeRoles(allowedRoles){ // admin
    return(req, res, next)=>{
        console.log("req.user", req.body)
        const userRole = req.body.user.role;
        
        if(!userRole){
            return res.status(403).json({message: 'Role is not found'})
        }
        
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({message: 'Access Denied'})
        }

        next();
    }
}

module.exports = authorizeRoles
