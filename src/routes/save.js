import express from "express";
import multer from "multer";
import path from "path";
import Place from "../models/Place.js";

const router = express.Router();

// Set storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save images
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s/g, "-"); // replace spaces
    const finalName = `${Date.now()}-${sanitized}`; // append timestamp
    cb(null, finalName);
  },
});

const upload = multer({ storage });

// POST /save
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, lat, lng } = req.body;

    if (!req.file || !title || !description || !lat || !lng) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPlace = new Place({
      filename: req.file.filename,
      image: req.file.path.replace(/\\/g, "/"),
      title,
      description,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });

    const savedPlace = await newPlace.save();

    res.json({
      title: savedPlace.title,
      message: "Place saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save place" });
  }
});

export default router;
