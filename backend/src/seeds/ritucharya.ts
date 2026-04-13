import { connectDB, disconnectDB } from "../config/database";
import { Ritucharya } from "../models/Ritucharya";
import { ritucharayData } from "./data/ritucharya";

const seedRitucharya = async () => {
  try {
    await connectDB();

    await Ritucharya.deleteMany({});
    console.log("Cleared existing ritucharya");

    await Ritucharya.insertMany(ritucharayData);
    console.log(`✅ Seeded ${ritucharayData.length} ritucharya`);

    await disconnectDB();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedRitucharya();
