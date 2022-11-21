import { Router } from "express";
import { createEntry, findEntry } from "../controllers/entries.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/entries", createEntry);
router.get("/entries", findEntry);

export default router;
