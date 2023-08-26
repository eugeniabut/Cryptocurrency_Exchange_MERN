import Bank from "../models/bankModel.js"
import userModel from "../models/userModel.js";
export const addBankData=async(req,res,next)=>{
 try {
    const { accountNumber, accountHolder} = req.body;
    const userBank= await userModel.findById({_id:req.params.id}) 
    if(!userBank){
      const err= new Error("Sorry you can not have More then One Bank account")
    } 
    const bankData = new Bank({
      accountNumber,
      accountHolder,

     owner:req.params.id
    });

    const newbank=(await bankData.save())
console.log(newbank);
    res.status(200).send("Thank you for trusting us..!");
  } catch (err) {
    next();
    console.log(err);
  }
}


export const getData =async(req,res)=>{
    try {
        const bankData = await Bank.find() // Populate the "owner" field with the "name" property from the "user" collection
    
        res.status(200).json(bankData);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }

}
export const getUserBank =async(req,res)=>{
  try {
    console.log(req.params);
      const bankData = await Bank.findOne({owner:req.params.id })// Populate the "owner" field with the "name" property from the "user" collection
  console.log("THIS MY USER BANK",bankData);
      res.status(200).json(bankData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }

}
