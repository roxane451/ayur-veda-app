import { Router } from "express";
import { getAllDoshas, getDoshaById } from "../controllers/doshasController";

const router = Router();

router.get("/", getAllDoshas);
router.get("/:id", getDoshaById);

export default router;
