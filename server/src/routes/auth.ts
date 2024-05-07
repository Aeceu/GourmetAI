import express from "express";
import { getUser, login, signup, verifyOTP } from "../controllers/auth";

const router = express.Router();

router.post("/user", getUser);
router.post("/login", login);
router.post("/signup", signup);
router.post("/verify", verifyOTP);

export default router;
