import mongoose from "mongoose";

const motivationSchema = new mongoose.Schema({
  motivationText: {
    type: String,
  }
});

const Motivation = mongoose.model("Motivation", motivationSchema);

export default Motivation;