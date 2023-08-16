import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import { emailSender } from "../utils/emailSender.js"
import jwt from "jsonwebtoken"


export const createUser =async(req,res,next) => {
    try{        const {firstName, lastName, password, email,address} = req.body

const verified=req.body.verified
        const confirmationToken=req.body.confirmationToken
        const checkUser= await User.findOne({email})
    if (checkUser){
        const err = new Error("user already existing..! please try to login")
        err.statusCode=400
        throw err
    }
        const saltRounds = 11
        const salt = await bcrypt.genSalt(saltRounds)
        
        const hashedPassword = await bcrypt.hash(password, salt) 

 // Generate a token for email confirmation ->Eu
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d', 
    });
 //store user in db      
        const user = new User({
          firstName,
          lastName,
          email,
          address,
        password:hashedPassword,
         confirmationToken:token, //token is to include into email
          verified // this verification state will be updated by emailConfirmationHandler
          
        })
        const newUser = await user.save()
 // Email content and send function
console.log(newUser);
 const subject = "Confirmation Email";
 const plainText = "Registration at Cryptos!";
 const htmlText = `<h2>Dear ${user.firstName},</h2>
 <p>Thank you for registering at Cryptos.</p>
 <p>This is Your ID : <h2>${newUser._id} </h2>  Pleas use it to identify your self</p>
 <p>Please click on the following link to verify your email:</p>
 <a href="${process.env.BASE_URL}/confirm-email/${token}">Verify Email</a>`;
   

 const emailSent = await emailSender(email, subject, plainText, htmlText);
 if (emailSent) {
  res.status(200).json({ message: "User created. Confirmation email sent." });
} else {
  const err = new Error("Error sending confirmation email.");
  err.statusCode = 500;
  throw err;
}

}
catch(err){

next(err)
}

}
// update user , delete  user, get allUsers

export const getAllUsers = async (req,res,next)=>{
    try {
        const userList = await User.find(req.body)
       res.status(200).json(userList)
    } catch (err) {
        next(err)
    }
}
export const getUser = async (req,res,next)=>{
  try {
      const user = await User.findById(req.params.id)
     res.status(200).json(user)
  } catch (err) {
      next(err)
  }
}

export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };

 export const updateUserProfile=async(req,res,next)=>{
    try{    
      console.log(req.body);
        const result = await User.findOneAndUpdate({_id:req.params.id}, req.body)
        // console.log(result);
        res.status(201).send("User updated successfully")
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Something went wrong while updating the post")
    }
}