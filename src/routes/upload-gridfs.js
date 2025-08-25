import express from 'express';
import mongoose from 'mongoose';
import { Readable } from 'stream';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { image, filename = `photo-${Date.now()}.jpg` } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const buffer = Buffer.from(image, 'base64');

    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'photos' });

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: 'image/jpeg',
    });

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    readable.pipe(uploadStream)
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
      })
      .on('finish', () => {
        res.json({ fileId: uploadStream.id });
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
