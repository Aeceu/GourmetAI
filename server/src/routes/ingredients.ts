import express from "express";
import {
  addNewIngredient,
  deleteIngredient,
  getUserIngredients,
} from "../controllers/ingredients";

const router = express.Router();

router.get("/ingredients/:userId", getUserIngredients);
router.post("/ingredients/:userId", addNewIngredient);
router.delete("/ingredients/:ingredientId", deleteIngredient);

export default router;
