import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    filename: { type: String, default: "photo" },
    image: { type: String, required: true }, // base64 string
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
