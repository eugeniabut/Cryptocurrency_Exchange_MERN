import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  accountOwner: {
    type: String,
    required: true
  },
  EBAN: {
    type: String,
    required: true
  },
  sum: {
    type: Number,
    default: 0
  }
});

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;