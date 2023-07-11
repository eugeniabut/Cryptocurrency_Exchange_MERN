import mongoose from "mongoose";
import {addressSchema} from "./addressModel.js";


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true }, // embedded (EU)
  email: { type: String, required: true, unique: true },
  userType: { type: String, default: "user" },
 
});

export default mongoose.model("User", userSchema);