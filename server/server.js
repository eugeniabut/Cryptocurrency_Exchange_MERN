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


app.post("/uploads", upload.single("imageFile"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(
      req.file.path,
      { public_id: Date.now() + req.file.originalname }
    );

    // Update the user's document with the new avatar URL
    const userId = req.body.userId; // Make sure you provide the correct field name for user ID
    await User.findOneAndUpdate(
      { _id: userId }, // Use the correct query to find the user
      { avatar: result.secure_url } // Update the avatar field with the new URL
    );

    fs.unlinkSync(req.file.path);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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