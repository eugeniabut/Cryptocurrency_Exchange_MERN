import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import userProfile from "./routes/profileRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import exchange from "./routes/exchange.js";
import cloudinary from "cloudinary";
import multer from "multer";
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cloudName = process.env.CLOUDINARY_NAME;
const cloudKey = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;

app.get("/", async (req, res) => {
  res.send("Welcome User");
});

const upload = multer({ dest: "uploads/" });

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

app.use("/users", userRoutes);
app.use("/profile", userProfile);
app.use("/exchange", exchange);
app.use("/review", reviewRoutes);

app.post("/uploads", upload.single("imageFile"), (req, res) => {
  cloudinary.v2.uploader.upload(
    req.file.path,
    { public_id: Date.now() + req.file.originalname },
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        fs.unlinkSync(req.file.path);
        res.json(result);
      }
    }
  );
});

connectDB();

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});