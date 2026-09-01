const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")

async function registerUser(req,res){
    const {username,email,password,role="user"}=req.body;

    const isuserexists=await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })
    if(isuserexists){
        return res.status(409).json({
            message:"user Already exists"
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user =await userModel.create({
        username,
        email,
        password:hash,
        role
    });
    const token=jwt.sign({id:user._id,role:user.role},process.env.jwt_secret)
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered Successfully",
        user,
        token
        
    })
}

async function loginUser(req,res){
    const {username,email,password}=req.body;
    const isuserexists=await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })
    if(!isuserexists){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }

    const ispassword=await bcrypt.compare(password,isuserexists.password);
    if(!ispassword){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    const token=jwt.sign({id:isuserexists._id,role:isuserexists.role},process.env.jwt_secret)
    res.cookie("token",token)
    res.status(201).json({
        message:"User logined Successfully",
        user:{
            id:isuserexists._id,
            username:isuserexists.username,
            email:isuserexists.email,
            role:isuserexists.role
        }
        
    })


}

module.exports={registerUser,loginUser};