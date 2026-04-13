import { Request, Response } from "express";
import { Ritucharya } from "../models/Ritucharya";

export const getAllRitucharya = async (req: Request, res: Response) => {
  try {
    const ritucharyas = await Ritucharya.find().sort({ id: 1 });

    res.json({ ritucharyas });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ritucharya" });
  }
};

export const getRitucharyaBySeason = async (req: Request, res: Response) => {
  try {
    const ritucharya = await Ritucharya.findOne({ id: req.params.season });

    if (!ritucharya) {
      return res.status(404).json({ error: "Ritucharya not found" });
    }

    res.json({ ritucharya });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ritucharya" });
  }
};
