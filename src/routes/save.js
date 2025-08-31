import express from "express";
import Place from "../models/Place.js";
const router = express.Router();

// POST /upload
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { image, filename, title, description, lat, lng } = req.body;

    if (!image) return res.status(400).json({ error: "No image provided" });

    const newPlace = new Place({
      image,
      filename,
      title,
      description,
      lat,
      lng,
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
