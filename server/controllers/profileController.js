import Bank from "../models/bankModel.js"
export const addBankData=async(req,res,next)=>{
 try {
    const { accountNumber, accountHolder, balance, transferAmount, createdAt, owner } = req.body;

    const bankData = new Bank({
      accountNumber,
      accountHolder,
      balance,
      transferAmount,
      createdAt,
      owner
    });

    await bankData.save();

    res.status(200).send("Thank you for trusting us..!");
  } catch (err) {
    next();
    console.log(err);
  }
}


export const getData =async(req,res)=>{
    try {
        const bankData = await Bank.find().populate("owner", "name"); // Populate the "owner" field with the "name" property from the "user" collection
    
        res.status(200).json(bankData);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }

res.send("test")
}