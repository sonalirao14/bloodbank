const userModel = require("../models/userModel");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({Email:req.body.Email})
        //validation
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User already exist'
            })
        }
        //Hashed Password
    
    //    const Password = req.body.password;
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.Password,salt);
        req.body.Password=hashedPassword;
        //rest data
        const user=new userModel(req.body)
        await user.save()
        return  res.status(201).send({
            success:true,
            message:'User registered successfully',
            user,

        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        })

    }
};
//login callback
const loginController=async(req,res)=>{
    try{
     const existingUser=await userModel.findOne({Email:req.body.Email})
     if(!existingUser){
        return res.status(404).send({
            success:false,
            message:'Invalid Credentials'
        })
     }
     //check role
     if(existingUser.Role!==req.body.Role){
        return res.status(500).send({
            success:false,
            message:"role doesn't match",
        });
     }
     //compare password
     const comparePassword= await bcrypt.compare(req.body.Password,existingUser.Password);
     if(!comparePassword){
        return res.status(500).send({
            success:false,
            message:"Invalid Credentials"
        })
     }
     const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})
     return res.status(200).send({
        success:true,
        message:"Login Successfully",
        token,
        existingUser
     })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login API",
            error 
        })
    }
};

//Get CUrrent user
const currentUserController=async(req,res)=>{
     try{
     const user=await userModel.findOne({_id:req.body.userId})
     return res.status(200).send({
        success:true,
        message:"user fetched successfully",
        user
     })
     }
     catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"unable to get current user",
            error
        })
     }
}
module.exports={registerController,loginController,currentUserController};