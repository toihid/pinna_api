import express from "express";
import Photo from "../models/Photo.js";

const router = express.Router();

// GET /photos
router.get("/", async (req, res) => {
  try {
    //const photos = await Photo.find().sort({ createdAt: -1 });
    const photos = await Photo.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(4) // last 4 images
      .allowDiskUse(true); // required for large documents in Atlas

    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

export default router;
