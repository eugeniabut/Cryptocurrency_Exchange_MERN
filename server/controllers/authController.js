import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { emailSender } from "../utils/emailSender.js"
export const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const checkUser = await User.findOne({ email })
        if (checkUser == null) {
            const err = new Error("Invalid Credentials!")
            err.statusCode = 400
            throw err
        }
        
        const hashedPass = checkUser.password
        const validation = await bcrypt.compare(password, hashedPass)
        if (!validation){
            const err = new Error("Invalid Credentials!")
            err.statusCode = 400
            throw err
        }
         else{
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
            const payload = {
                email: email,
                firstName: checkUser.firstName,
                lastName:checkUser.lastName,
                userId: checkUser._id,
                avatar:checkUser.avatar
            }
            const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 })
            res.status(201).json({ message: "logged in successfully", token,  firstName: checkUser.firstName,lastName:checkUser.lastName, userId:checkUser._id,email,avatar:checkUser.avatar,aboutMe:checkUser.aboutMe
        })
}
}
catch(err){
next(err)
}
}
export const passwordChangeHandler=async(req,res,next)=>{

    try{
        const userId =req.params.id
    const {email,currentPassword, confirmPassword, newPassword} = req.body
    
    if(confirmPassword !== newPassword) return res.status(400).send("Invalid Credentials")

    const userRecord = await User.findById(userId)
    if(userRecord === null) return res.status(401).send("Invalid Credentials, Record not found")

    const isValid = await bcrypt.compare(currentPassword, userRecord.password)

    if(!isValid) return res.status(401).send("Invalid Credentials")

    const salt = await bcrypt.genSalt(11)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)

    const result = await User.findByIdAndUpdate(userId, {password:newHashedPassword})
  
    res.status(202).send("Password Changed Successfully")
    }
    catch(err){
        res.status(401).send("Something went wrong...! ")
    }

}
export const emailConfirmationHandler = async (req, res) => {
    try {
      const { token } = req.params;
      console.log(token);
      const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const result = await User.findByIdAndUpdate(decodedData.userId, {
        verified: true,
      });
      res.status(200).send(`Email verified successfully =>  <a href="${process.env.FE_URL}/login">Login</a>`);
    } catch (err) {
      res.status(401).send("Invalid Credentials");
    }
};
export const authorizeUser = async (req, res, next) => {
  console.log(req);
    try {
      const userId = req.userId;
      console.log(userId);
      const user = await User.findById(userId);
  
      res.status(201).json({ firstName: user.firstName, userId: user._id , avatar: user.avatar});
  
    } catch (err) {
      next(err)
    }
  };
