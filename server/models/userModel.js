import mongoose from "mongoose";
import {addressSchema} from "./addressModel.js";

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

  // This one for one To Many relation
verified:{
  type: Boolean,
  default : false
}
  /* 
Used for One to One relation
{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Post'

} */
}) 

export default mongoose.model("User", userSchema);
