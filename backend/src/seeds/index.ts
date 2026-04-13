import { connectDB, disconnectDB } from "../config/database";
import { Spice } from "../models/Spice";
import { Dosha } from "../models/Dosha";
import { Ritucharya } from "../models/Ritucharya";
import spicesData from "./data/spices";
import doshasData from "./data/doshas";
import ritucharayData from "./data/ritucharya";

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    // Clear existing data
    await Spice.deleteMany({});
    await Dosha.deleteMany({});
    await Ritucharya.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Seed data
    await Spice.insertMany(spicesData);
    console.log(`✅ Seeded ${spicesData.length} spices`);

    await Dosha.insertMany(doshasData);
    console.log(`✅ Seeded ${doshasData.length} doshas`);

    await Ritucharya.insertMany(ritucharayData);
    console.log(`✅ Seeded ${ritucharayData.length} ritucharya`);

    await disconnectDB();
    console.log("✅ Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();
