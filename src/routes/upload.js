import express from 'express';
import Photo from '../models/Photo.js';

const router = express.Router();

// POST /upload
router.post('/', async (req, res) => {
  try {
    const { image, filename } = req.body;

    if (!image) return res.status(400).json({ error: 'No image provided' });

    const newPhoto = new Photo({ image, filename });
    const savedPhoto = await newPhoto.save();

    res.json({ photoId: savedPhoto._id, message: 'Photo uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

export default router;
