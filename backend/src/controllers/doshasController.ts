import { Request, Response } from "express";
import { Dosha } from "../models/Dosha";

export const getAllDoshas = async (req: Request, res: Response) => {
  try {
    const doshas = await Dosha.find().sort({ id: 1 });

    res.json({ doshas });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doshas" });
  }
};

export const getDoshaById = async (req: Request, res: Response) => {
  try {
    const dosha = await Dosha.findOne({ id: req.params.id });

    if (!dosha) {
      return res.status(404).json({ error: "Dosha not found" });
    }

    res.json({ dosha });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dosha" });
  }
};
