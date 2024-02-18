import express from "express";
import { signup, login, logout } from "../controllers/userController";
import { checkToken } from "../middleware/authMiddleware";
import currentUserRoutes from "./currentUserRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

// rejestracja
router.post("/signup", signup);

// logowania
router.post("/login", login);

// wylogowanie
router.get("/logout", checkToken, logout);

router.use("/api", currentUserRoutes);
router.use("/users", userRoutes);

export default router;
