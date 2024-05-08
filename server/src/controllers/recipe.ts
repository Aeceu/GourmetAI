import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../utils/prisma";
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { chat } = req.body;
    if (!chat)
      return res.status(400).json("Please put up the ingredients needed!");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Imagine you're a student's chef tasked with creating a recipe using a specific set of ingredients. Your challenge is to come up with a recipe name, along with a list of ingredients and instructions that the student can easily follow. You're only allowed to use the following ingredients: ${chat}. Get creative and craft a recipe that's both delicious and simple to prepare!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json(text);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const saveRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { name, ingredients, description } = req.body;
    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        description,
        ingredients,
        userId,
      },
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.recipeId;

    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
    res.status(200).json("Recipe deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const favRecipe = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.recipeId;

    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
      },
    });

    if (recipe?.isFavorite) {
      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          isFavorite: false,
        },
      });
      return res.status(200).json("Recipe removed from favorite");
    }

    if (!recipe?.isFavorite) {
      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          isFavorite: true,
        },
      });
      return res.status(200).json("Recipe added from favorite");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const completeRecipe = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.recipeId;

    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
      },
    });

    if (recipe?.isComplete) {
      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          isComplete: false,
        },
      });
      return res.status(200).json("Recipe removed from completed recipe");
    }

    if (!recipe?.isComplete) {
      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          isComplete: true,
        },
      });
      return res.status(200).json("Recipe added from completed recipe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const userRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const recipes = await prisma.recipe.findMany({
      where: {
        userId,
      },
      include: {
        ingredients: true,
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
