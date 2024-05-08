import express from "express";
import { deleteUser, updateUser } from "../controllers/user";

const router = express.Router();

router.patch("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
