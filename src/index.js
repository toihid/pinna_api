import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import saveRouter from "./routes/save.js";
import uploadGridFsRouter from "./routes/upload-gridfs.js";
import placesRouter from "./routes/places.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });

app.use("/save", saveRouter);
app.use("/upload-gridfs", uploadGridFsRouter);
app.use("/places", placesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
