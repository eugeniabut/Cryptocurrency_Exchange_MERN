import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true
},
cityName: {
    type: String,
    required: true
},
houseNumber: {
    type: Number,
    required: true
},
postalCode: {
    type: Number,
    required: true
}

});
