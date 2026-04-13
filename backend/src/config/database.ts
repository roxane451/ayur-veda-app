import { logger } from "../utils/logger";
import mongoose from "mongoose";
import { config } from "./env";

// Options de connexion robustes pour la prod
// - serverSelectionTimeoutMS : temps max pour trouver un primaire (défaut 30s — trop long)
// - connectTimeoutMS         : timeout d'établissement du socket TCP
// - socketTimeoutMS          : timeout d'inactivité sur un socket ouvert
// - wtimeoutMS               : timeout d'acquittement des writes
const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 10_000,
  socketTimeoutMS: 45_000,
};

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri, MONGOOSE_OPTIONS);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.fatal({ err: error }, "MongoDB connection error");
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected");
  } catch (error) {
    logger.error({ err: error }, "MongoDB disconnect error");
  }
};
