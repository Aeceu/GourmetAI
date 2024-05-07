import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getUserIngredients = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const ingredients = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        ingredients: true,
      },
    });
    res.status(200).json(ingredients?.ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const addNewIngredient = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const ingredient = req.body;

    const newIngredient = await prisma.ingredient.create({
      data: {
        userId,
        name: ingredient,
      },
    });
    res.status(200).json(newIngredient);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const ingredientId = req.params.ingredientId;

    await prisma.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });
    res.status(200).json("Ingredient deleted successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
