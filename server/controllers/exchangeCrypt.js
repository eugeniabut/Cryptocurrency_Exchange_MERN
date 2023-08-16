import bankModel from "../models/bankModel.js";
import coinsModel from "../models/coinsModel.js";
import OfferCoin from "../models/coinsOfferModel.js";
import userModel from "../models/userModel.js";

export const buyCryptos = async (req, res, next) => {
  const { bankID, total } = req.body;
  console.log(req.body);
  try {
    const userBank = await bankModel.findOne({ _id: bankID });
    if (!userBank) {
      const err = new Error("You need to add you bank Data...!");
      err.statusCode = 400;
      throw err;
    }
    console.log(userBank);
    if (userBank.balance < total) {
      const err = new Error(
        "Sorry your Balance is not enough to complete the operation..!"
      );
      err.statusCode = 400;
      throw err;
    }
    const totalInt = parseInt(total);
    const rest = userBank.balance - totalInt;
    const bankStatementUpdate = await bankModel.findOneAndUpdate(
      { _id: bankID },
      { balance: rest, transferAmount: totalInt }
    );
    res.status(200).json({
      message: "exchange done successfully",
      bankStat: bankStatementUpdate,
    });
  } catch (err) {
    next(err);
  }
};
export const addCoin = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      cryptos,
      current_price,
      price_change_24h,
      price_change_percentage_24h,
      total_volume,
      quantity,
    } = req.body;
    const coinData = await coinsModel.findOne({ cryptos });
    if (coinData) {
      const newcon = await coinsModel.findOneAndUpdate(
        { cryptos: cryptos },
        { quantity: quantity }
      );
      console.log(newcon);
    } else {
      await coinsModel.create(req.body);
    }
    res.status(200).json({
      message: "coin add successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const getAllCoins = async (req, res, next) => {
  try {
    const coinsList = await coinsModel.find();
    res.status(200).json(coinsList);
  } catch (err) {
    next(err);
  }
};
export const deleteCoin = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const findCoin = await coinsModel.findById({ _id: req.params.id });
    console.log(findCoin);
    if (findCoin.quantity > 1) {
      const newQuantity = req.params.quantity;
      await coinsModel.findOneAndUpdate(
        { _id: req.params.id },
        { quantity: newQuantity }
      );
    } else {
      await coinsModel.findByIdAndDelete({ _id: req.params.id });
    }
    res.status(200).json({ msg: "coin deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
export const addCoinOffer = async (req, res, next) => {
  try {
    console.log(req.body);
    const { cryptos, current_price, price_change_percentage_24h, quantity } =
      req.body;

      const coinToOffer = new OfferCoin({
        cryptos:cryptos,
        new_price: +current_price+(current_price* price_change_percentage_24h),
          quantity:quantity 
        
      })
      await coinToOffer.save()
          res.status(200).json({
      message: " Offer coin add successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const getOfferCoins=async(req,res,next)=>{
  try {
    const offerCoinsList = await OfferCoin.find();
    res.status(200).json(offerCoinsList);
  } catch (err) {
    next(err);
  }
}
export const deleteAllCoins =async (req, res,next) => {
  try {
    // Delete all documents from the collection
    const result = await coinsModel.deleteMany({});
    res.json({ message: 'All documents deleted' });
  } catch (err) {
    console.error('Error deleting documents:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};