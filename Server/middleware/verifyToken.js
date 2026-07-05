const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'No token provided'})
    }

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decode.id
        next()
    }catch(err){
        return res.status(401).json({message: 'Invalid token'})
    }
}
module.exports=verifyToken;