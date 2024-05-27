import express from "express";
import { submitProblemReport } from "../controllers/problem.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/submitProblem/:userId", verifyToken, submitProblemReport);

export default router;