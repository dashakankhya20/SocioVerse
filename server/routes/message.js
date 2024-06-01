import express from "express";
import { addMessage, getAllMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/add-msg", addMessage);
router.post("/get-msg", getAllMessage);

export default router;