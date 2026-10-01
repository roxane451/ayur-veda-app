import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Un bilan du quiz en deux parties :
 *  - "nature" : la constitution (prakriti), faite une fois ;
 *  - "etat"   : l'état du moment (vikriti), refait à chaque saison.
 * On garde les scores bruts ; les pourcentages et le profil se recalculent côté site.
 */
export type TypeBilan = "nature" | "etat";

export interface IBilan extends Document {
  userId: Types.ObjectId;
  type: TypeBilan;
  scores: { vata: number; pitta: number; kapha: number };
  /** Date à laquelle le quiz a été fait (peut précéder la création du compte). */
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const scoreField = { type: Number, required: true, min: 0, max: 200 };

const bilanSchema = new Schema<IBilan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["nature", "etat"], required: true },
    scores: {
      vata: scoreField,
      pitta: scoreField,
      kapha: scoreField,
    },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
);

bilanSchema.index({ userId: 1, type: 1, date: -1 });

export const Bilan = mongoose.model<IBilan>("Bilan", bilanSchema);
