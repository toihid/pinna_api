import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

// GET /photos
router.get("/", async (req, res) => {
  try {
    //const photos = await Photo.find().sort({ createdAt: -1 });
    const photos = await Place.find({}, "_id title description lat lng")
      .sort({ createdAt: -1 }) // newest first
      .limit(4) // last 4 images
      .allowDiskUse(true); // required for large documents in Atlas

    // Map to rename fields
    const formatted = photos.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      url: p.url,
      latitude: p.lat, // rename lat -> latitude
      longitude: p.lng, // rename lng -> longitude
      createdAt: p.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

export default router;
