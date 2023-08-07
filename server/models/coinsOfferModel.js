import mongoose from "mongoose"
export const coinOffer = new mongoose.Schema({

    cryptos: {
    type: String,
    
  },
 new_price: {
    type: Number,
    
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,     //Referenced(Eu)
    ref: "user"
  },
  
  image:{    type:String,
  }
});

export default  mongoose.model('CoinOffer', coinOffer);


