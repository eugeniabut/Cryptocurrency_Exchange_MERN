import express from "express"
import {buyCryptos,addCoin,getAllCoins,addCoinOffer, deleteCoin, getOfferCoins, deleteAllCoins} from "../controllers/exchangeCrypt.js"
import { authorization } from "../middleware/authorization.js"
const router=express.Router()

router.put("/buy-cryptos",authorization,buyCryptos)

router.post("/add-coin",authorization,addCoin)
router.get("/get-allCoins",authorization,getAllCoins)
router.delete("/delete-coin/:id/:quantity",authorization,deleteCoin)
router.post("/coin-offer",authorization,addCoinOffer)
router.get("/offer-coins",authorization,getOfferCoins)
router.delete('/delete-all',authorization,deleteAllCoins)
export default router
