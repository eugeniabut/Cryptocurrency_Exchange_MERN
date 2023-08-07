import mongoose from "mongoose"
export const coinSchema = new mongoose.Schema({

    cryptos: {
    type: String,
    required: true,
  },
  current_price: {
    type: String,
    required: true
  },
 
  price_change_24h: {
    type: Number,   
     required: true

  },
  price_change_percentage_24h: {
    type: Number,
    required: true
  },
  total_volume: {
    type: Number,
    required: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,     //Referenced(Eu)
    ref: "user"
  },
  quantity:{
    type:Number,
    default:0

  },
  image:{    type:String,
  }
});

export default  mongoose.model('Coin', coinSchema);


