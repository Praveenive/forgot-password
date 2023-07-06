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

router.put("/resetpassword/:id", async(req,res)=>{
    try {
           const salt = await bcrypt.genSalt(10);
         const hashedpassword = await bcrypt.hash(req.body.password,salt)
        const update = await User.findOneAndUpdate(
            {_id:req.params.id},{$set:{password:hashedpassword}},{new:true}
        )
        console.log(update)
        if(!update){
            return res.status(400).json({message:"Kindly enter new Password"})
        }
        res.status(200).json({data:update,message:"Updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})



export const userRouter = router;