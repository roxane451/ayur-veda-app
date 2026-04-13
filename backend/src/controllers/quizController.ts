import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { QuizResult } from "../models/QuizResult";

export const saveQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const { answers, scores, percentages, profile } = req.body;

    const quizResult = new QuizResult({
      userId: req.userId,
      answers,
      scores,
      percentages,
      profile,
    });

    await quizResult.save();

    res.status(201).json({
      message: "Quiz result saved successfully",
      result: quizResult,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save quiz result" });
  }
};

export const getUserQuizResults = async (req: AuthRequest, res: Response) => {
  try {
    const results = await QuizResult.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz results" });
  }
};

export const getQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const result = await QuizResult.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Quiz result not found" });
    }

    if (result.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz result" });
  }
};

export const deleteQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const result = await QuizResult.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Quiz result not found" });
    }

    if (result.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await QuizResult.findByIdAndDelete(req.params.id);

    res.json({ message: "Quiz result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz result" });
  }
};
