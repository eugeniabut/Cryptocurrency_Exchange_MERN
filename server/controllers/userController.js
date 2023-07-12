import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import { emailSender } from "../utils/emailSender.js"
import jwt from "jsonwebtoken"


export const createUser =async(req,res,next) => {
    try{
        // const { userName,
        // lastName,
        // password,
        // address.postalCode,
        // address.cityName,
        // email,
        // country
        // ZIP}=req.body

        const userName = req.body.userName;
        const lastName= req.body.lastName;
        const password = req.body.password;
        const postalCode = req.body.address.postalCode;
        const cityName = req.body.address.cityName;
        const streetName = req.body.address.streetName;
        const houseNumber = req.body.address.houseNumber;
        const country = req.body.address.country;
        const email = req.body.email;
        const userType = req.body.userType
        const verified = req.body.verified


        
        const checkUser= await User.findOne({email})
        console.log(checkUser);
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
        userName,
        lastName,
        address:{postalCode,
        cityName,
        streetName,
        houseNumber,
        country},
        email,
        password:hashedPassword,
         
          confirmationToken:token, //token is to include into email
          verified // this verification state will be updated by emailConfirmationHandler
          
        })
        console.log(user);
        const newUser = await user.save()
res.status(200).send("user successfully added ..!")

 // Email content and send function

 const subject = "Confirmation Email";
 const plainText = "Registration at Cryptos!";
 const htmlText = `<h2>Dear ${user.firstName},</h2>
 <p>Thank you for registering at Cryptos.</p>
 <p>Please click on the following link to verify your email:</p>
 <a href="${process.env.BASE_URL}/emailConfirmation/${user.confirmationToken}">Verify Email</a>`;
   

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

export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };