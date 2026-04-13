import mongoose, { Schema, Document } from "mongoose";

export interface ISpice extends Document {
  id: string;
  name: string;
  sanskrit: string;
  image: string;
  type: "épice" | "plante";
  nature: "réchauffante" | "rafraîchissante" | "neutre";
  taste: string[];
  doshaEffect: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  benefits: string[];
  uses: string[];
  contraindications: string[];
  category: string[];
  description?: string;
}

const spiceSchema = new Schema<ISpice>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    sanskrit: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["épice", "plante"],
      required: true,
    },
    nature: {
      type: String,
      enum: ["réchauffante", "rafraîchissante", "neutre"],
      required: true,
    },
    taste: [String],
    doshaEffect: {
      vata: String,
      pitta: String,
      kapha: String,
    },
    benefits: [String],
    uses: [String],
    contraindications: [String],
    category: [String],
    description: String,
  },
  { timestamps: true },
);

export const Spice = mongoose.model<ISpice>("Spice", spiceSchema);
