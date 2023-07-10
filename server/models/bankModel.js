import mongoose from "mongoose";

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
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  transferAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;