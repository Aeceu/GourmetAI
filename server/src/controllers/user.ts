import { Request, Response } from "express";
import prisma from "../utils/prisma";
import exclude from "../utils/exclude";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(400).json("User does not exists!");

    const newUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });

    const userWithoutPass = exclude(newUser, ["password"]);
    res.status(200).json(userWithoutPass);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    await prisma.user.delete({
      where: { id: userId },
      include: { ingredients: true, recipes: true },
    });
    res.status(200).json("User account deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
