import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env";

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiry as any,
  };
  return jwt.sign({ userId }, config.jwtSecret, options);
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as { userId: string };
  } catch (error) {
    return null;
  }
};
