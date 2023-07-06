import  express  from "express";
import { generateJwtToken, User } from "../Models/users.js";
import bcrypt from 'bcrypt';

const router = express.Router()

router.post("/signup", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email}) 
        console.log(user)
        if(user!==null){
           return res.status(400).json({message:"Email Id Already exists"})
        }
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(req.body.password,salt)
     user = await new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: hashedpassword
     }).save()
        res.status(202).json({data:user,message:"Signup Successully Done"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in signup"})
    }
})


router.post("/login", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(user===null){
           return res.status(400).json({message:"User Not found"})
        }
        const validatePassword = await bcrypt.compare(
            req.body.password,user.password
        )     
        if(!validatePassword){
           return  res.status(404).json({message:"Invalid credentials"})
        } 
        const token = generateJwtToken(user._id)
        res.status(202).json({data:user,message:"Logged in successfully",token})  
    } catch (error) {
        console.log(error)
       return res.status(500).json({message:"While login Error"})
    }
})



export const userRouter = router;