import express from "express";
import { checkToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users/current", checkToken, (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
