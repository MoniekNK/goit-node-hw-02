import express from "express";
import { signup, login, logout } from "../controllers/userController";
import { checkToken } from "../middleware/authMiddleware";

const router = express.Router();

// rejestracja
router.post("/signup", signup);

// logowania
router.post("/login", login);

// wylogowanie
router.get("/logout", checkToken, logout);

export default router;
