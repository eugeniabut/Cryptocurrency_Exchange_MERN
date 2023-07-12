import Bank from "../models/bankModel.js"
export const addBankData=async(req,res,next)=>{
 try {
    await Bank.create(req.body)
    res.status(200).send("Thank you for trusting us..!")
}
catch(err){
next()
console.log(err);}
}
export const getData =async(req,res)=>{
res.send("test")
}
