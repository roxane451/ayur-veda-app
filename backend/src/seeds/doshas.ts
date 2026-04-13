import { connectDB, disconnectDB } from "../config/database";
import { Dosha } from "../models/Dosha";
import { doshasData } from "./data/doshas";

const seedDoshas = async () => {
  try {
    await connectDB();

    await Dosha.deleteMany({});
    console.log("Cleared existing doshas");

    await Dosha.insertMany(doshasData);
    console.log(`✅ Seeded ${doshasData.length} doshas`);

    await disconnectDB();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDoshas();
