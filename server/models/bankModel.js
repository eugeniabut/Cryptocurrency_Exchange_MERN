import mongoose from "mongoose"

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
    required: false,
    default: 0
  },
  transferAmount: {
    type: Number,
    required: false
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


