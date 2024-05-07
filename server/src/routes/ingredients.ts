import express from "express";
import {
  addNewIngredient,
  getUserIngredients,
} from "../controllers/ingredients";

const router = express.Router();

router.get("/ingredients/:userId", getUserIngredients);
router.post("/ingredients/:userId", addNewIngredient);
router.delete("/ingredients/:ingredientId", addNewIngredient);

export default router;
