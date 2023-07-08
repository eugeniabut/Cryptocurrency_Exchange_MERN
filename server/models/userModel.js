import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  userName:{ type: String, required:true },
  lastName: { type: String, required:true },
  password: { type: String, required:true },
  address: { type: String, required:true },
  email:{ type: String, required:true, unique: true },
  userType:{type:String, default:"user"},
  country:{ type: String, required:true,},
  ZIP:{ type: String, required:true, unique: true },

});
export default mongoose.model("user", userSchema);
