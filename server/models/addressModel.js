import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  postalCode: {
    type: Number,
  },
  cityName: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    enum: ["Germany", "USA", "Canada", "India", "Australia"]
  }
});

export default mongoose.model('Address', addressSchema);