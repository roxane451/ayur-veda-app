import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuizResult extends Document {
  userId: Types.ObjectId;
  answers: Array<{
    question: string;
    selectedOption: string;
    vataScore: number;
    pittaScore: number;
    kaphaScore: number;
  }>;
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  percentages: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  profile: {
    type: "mono" | "bi" | "tri" | "dominant";
    primary?: string;
    secondary?: string;
    label: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const quizResultSchema = new Schema<IQuizResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        question: String,
        selectedOption: String,
        vataScore: Number,
        pittaScore: Number,
        kaphaScore: Number,
      },
    ],
    scores: {
      vata: Number,
      pitta: Number,
      kapha: Number,
    },
    percentages: {
      vata: String,
      pitta: String,
      kapha: String,
    },
    profile: {
      type: {
        type: String,
        enum: ["mono", "bi", "tri", "dominant"],
      },
      primary: String,
      secondary: String,
      label: String,
    },
  },
  { timestamps: true },
);

export const QuizResult = mongoose.model<IQuizResult>(
  "QuizResult",
  quizResultSchema,
);
