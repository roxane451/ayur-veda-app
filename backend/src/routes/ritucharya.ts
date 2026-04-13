import { Router } from "express";
import {
  getAllRitucharya,
  getRitucharyaBySeason,
} from "../controllers/ritucharyaController";

const router = Router();

router.get("/", getAllRitucharya);
router.get("/:season", getRitucharyaBySeason);

export default router;
