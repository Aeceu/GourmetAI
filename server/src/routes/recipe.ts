import express from "express";
import {
  completeRecipe,
  createRecipe,
  createRecipeByName,
  deleteRecipe,
  favRecipe,
  saveRecipe,
  userRecipes,
} from "../controllers/recipe";

const router = express.Router();

router.get("/recipe/:userId", userRecipes);
router.post("/recipe", createRecipe);
router.get("/recipeByName/:recipeName", createRecipeByName);
router.delete("/:recipeId", deleteRecipe);

router.post("/save/recipe/:userId", saveRecipe);
router.get("/recipe/favorite/:recipeId", favRecipe);
router.get("/recipe/complete/:recipeId", completeRecipe);

export default router;
