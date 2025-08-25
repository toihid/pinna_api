import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    filename: { type: String, default: 'photo' },
    image: { type: String, required: true }, // base64 string
  },
  { timestamps: true }
);

export default mongoose.model('Photo', PhotoSchema);
