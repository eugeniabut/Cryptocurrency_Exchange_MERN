import mongoose from "mongoose"
const sum=Math.floor(Math.random() * 200000)
const bankSchema = new mongoose.Schema({

  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  accountHolder: {
    type: String,
    required: true
  },
 
  transferAmount: {
    type: Number,
    default: sum
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
    ref: "user"
  }
  
});

export default  mongoose.model('Bank', bankSchema);


