const jwt=require("jsonwebtoken");

async function authArtist(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decode=jwt.verify(token,process.env.jwt_secret);
        if(decode.role!=="artist"){
            return res.staus(403).json({
                message:"Forbidden"
            })
        }
        req.user=decode;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}
async function authUser(req,res,next){
    const token=req.cookie.token;
    if(!token){
        return res.staus(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decode=jwt.verify(token,process.env.jwt_secret);
        if(decode.role!=="artist" && decode.role!=="user"){
            return res.staus(403).json({
                message:"Forbidden"
            })
        }
        req.user=decode;
        next();
    }catch(err){
        console.log(err);
        return res.staus(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports={authArtist, authUser};