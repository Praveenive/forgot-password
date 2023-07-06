import nodemailer from 'nodemailer';
import express from'express'
import bcrypt from 'bcrypt';
import { User } from '../Models/users.js';

const router = express.Router()

router.post("/forgot",async(req,res)=>{
    try {
const user = await User.findOne({email:req.body.email})
console.log(user)
if(user){
    console.log(user)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:user.email,
    //   pass: 'your-password'
    }
  });
  const mailOptions = {
    from: 'zenclass@gmail.com',
    to: user.email,
    subject: user.password,
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the following link to reset it:</p>
      <a href="https://your-app.com/reset-password">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Thank you</p>
    `
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:');
      console.log(error.message);
    } else {
      console.log('Password reset email sent successfully!');
      console.log('Response:', info);
    }
  });
  
}
else{
    return res.status(400).json({message:"User Not found"})
}
    }
 catch (error) {
       console.log(error)
       res.status(500).json({message:"Server issues"}) 
}
})
export const forgotpasswordrouter =router