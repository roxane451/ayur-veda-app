import { connectDB, disconnectDB } from "../config/database";
import { Spice } from "../models/Spice";
import { spicesData } from "./data/spices";

const seedSpices = async () => {
  try {
    await connectDB();

    await Spice.deleteMany({});
    console.log("Cleared existing spices");

    await Spice.insertMany(spicesData);
    console.log(`✅ Seeded ${spicesData.length} spices`);

    await disconnectDB();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedSpices();
