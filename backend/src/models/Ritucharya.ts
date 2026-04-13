import mongoose, { Schema, Document } from "mongoose";

export interface IRitucharya extends Document {
  id: string;
  name: string;
  period: string;
  dosha: string;
  elements: string;
  qualities: string;
  challenges: string;
  foodsGood: string[];
  foodsBad: string[];
  rituals: {
    morning: string[];
    day: string[];
    evening: string[];
  };
  plants: Array<{ name: string; benefit: string }>;
}

const ritucharaySchema = new Schema<IRitucharya>(
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
    period: {
      type: String,
      required: true,
    },
    dosha: {
      type: String,
      required: true,
    },
    elements: {
      type: String,
      required: true,
    },
    qualities: {
      type: String,
      required: true,
    },
    challenges: {
      type: String,
      required: true,
    },
    foodsGood: [String],
    foodsBad: [String],
    rituals: {
      morning: [String],
      day: [String],
      evening: [String],
    },
    plants: [
      {
        name: String,
        benefit: String,
      },
    ],
  },
  { timestamps: true },
);

export const Ritucharya = mongoose.model<IRitucharya>(
  "Ritucharya",
  ritucharaySchema,
);
