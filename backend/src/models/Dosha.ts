import mongoose, { Schema, Document } from "mongoose";

export interface IDosha extends Document {
  id: string;
  name: string;
  sanskrit: string;
  elements: string;
  qualities: string[];
  physical: Array<{ label: string; value: string }>;
  psychological: Array<{ label: string; value: string }>;
  imbalanceSigns: string[];
  balanceTips: string[];
  plants: string[];
  color: string;
  icon: string;
}

const doshaSchema = new Schema<IDosha>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      enum: ["vata", "pitta", "kapha"],
    },
    name: {
      type: String,
      required: true,
    },
    sanskrit: {
      type: String,
      required: true,
    },
    elements: {
      type: String,
      required: true,
    },
    qualities: [String],
    physical: [
      {
        label: String,
        value: String,
      },
    ],
    psychological: [
      {
        label: String,
        value: String,
      },
    ],
    imbalanceSigns: [String],
    balanceTips: [String],
    plants: [String],
    color: String,
    icon: String,
  },
  { timestamps: true },
);

export const Dosha = mongoose.model<IDosha>("Dosha", doshaSchema);
