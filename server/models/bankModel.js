import mongoose from "mongoose"
const sum=Math.floor(Math.random() * 200000)
const bankSchema = new mongoose.Schema({

  accountNumber: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true
  },
 
  transferAmount: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    required: false,
    default: sum
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,     //Referenced(Eu)
    ref: "user",
    required: true

  }
  
});

export default  mongoose.model('Bank', bankSchema);


