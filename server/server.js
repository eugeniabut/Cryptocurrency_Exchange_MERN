import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import axios from "axios";
import userProfile from "./routes/profileRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (eq, res) => {
  // const options = {
  //   method: 'GET',
  // //   url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  //     url:"https://newsdata.io/api/1/crypto?apikey=pub_260065beaa4df95c2f842200733d53e9f2c3b"
  // };

  // try {
  // 	const response = await axios.request(options);
  // 	console.log(response.data);
  // } catch (error) {
  // 	console.error(error);
  // }

  // const options = {
  //   method: 'GET',
  //   url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=333ad23a145a4832b2ca734696e3b06b',
  // };

  // try {
  // 	const response = await axios.request(options);
  // 	console.log(response.data);
  // } catch (error) {
  // 	console.error(error);
  // }
  res.send("Welcome User ");
});

app.use("/users", userRoutes);
app.use("/profile", userProfile);
connectDB();
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Something went wrong";
  res.status(error.statusCode).send(error.message);
});
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
