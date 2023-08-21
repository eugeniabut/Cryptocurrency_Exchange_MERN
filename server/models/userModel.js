import mongoose from "mongoose";
import {addressSchema} from "./addressModel.js";
import {coinSchema} from "./coinsModel.js";

const userSchema = new mongoose.Schema({

  firstName: {
      type: String, required: true
  },
  lastName: {
      type: String, required: true
  },
  email: {
      type: String, required: true,unique: true
  },
  password: {
      type: String, required: true
  },
address: {
      type: addressSchema,
      required: true
  },
  coine:[{ type: coinSchema,
    required: true}],
verified:{
  type: Boolean,
  default : false
},
avatar:String,
phone:String,
aboutMe:String,

}) 

export default mongoose.model("User", userSchema);