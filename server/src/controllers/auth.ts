import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import textflow from "textflow.js";

textflow.use;

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // const
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    // const {phonenumbe}
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
