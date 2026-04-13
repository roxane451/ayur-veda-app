import { Router } from "express";
import {
  getAllSpices,
  getSpiceById,
  searchSpices,
} from "../controllers/spicesController";
import {
  validateQuery,
  spicesQuerySchema,
  searchQuerySchema,
} from "../middleware/validation";

const router = Router();

// FIX : validation des query params avant injection dans $regex
router.get("/", validateQuery(spicesQuerySchema), getAllSpices);
router.get("/search", validateQuery(searchQuerySchema), searchSpices);
router.get("/:id", getSpiceById);

export default router;
